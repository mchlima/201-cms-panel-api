import { ISubscription } from '@/models';
import { CreateSubscriptionDTO, ICreateSubscriptionService } from '.';
import { IUserRepository } from '@/repositories/user';
import { IPlanRepository } from '@/repositories/plans';
import { ISubscriptionRepository } from '@/repositories/subscription';
import {
  BadRequestError,
  ConflictError,
  DependencyError,
  NotFoundError,
} from '@/errors';
import { getPaymentProvider, IPaymentProvider } from '@/providers/payments';
import { IMailService } from '@/providers/mail';
import Logger from '@/utils/Logger';

export class CreateSubscriptionService implements ICreateSubscriptionService {
  constructor(
    private userRepository: IUserRepository,
    private planRepository: IPlanRepository,
    private subscriptionRepository: ISubscriptionRepository,
    private mailer: IMailService
  ) {}

  async execute(data: CreateSubscriptionDTO): Promise<ISubscription> {
    const user = await this.userRepository.findUserById(data.userId);
    if (!user) {
      throw new NotFoundError('USER_NOT_FOUND', 'User not found', 404);
    }

    const existingSubscription =
      await this.subscriptionRepository.findActiveSubscriptionByUserId(
        data.userId
      );

    if (existingSubscription) {
      throw new ConflictError(
        'SUBSCRIPTION_ALREADY_EXISTS',
        'User already has an active subscription',
        409
      );
    }

    const plan = await this.planRepository.findPlanById(data.planId);
    if (!plan || plan.status !== 'active') {
      throw new NotFoundError(
        'PLAN_NOT_FOUND',
        'Plan not found or inactive',
        404
      );
    }

    const subscription = await this.subscriptionRepository.createSubscription({
      userId: user._id!,
      planId: plan._id!,
      status: 'waiting_payment',
    });

    const provider: IPaymentProvider = getPaymentProvider(plan.countryCode);

    let preApproval;

    try {
      preApproval = await provider.preApprovalCreate({
        planName: plan.name,
        payerEmail: user.email,
        externalReference: subscription._id,
        cardToken: data.card!.token,
        frequency: plan.frequencyValue,
        frequencyType: plan.frequencyType,
        transactionAmount: plan.price,
        currencyId: plan.currency,
        startDate: new Date(Date.now() + 1 * 60 * 1000),
      });
    } catch (error: any) {
      await this.subscriptionRepository.updateSubscription(subscription._id!, {
        status: 'error',
        errorDetails: { ...error, provider: provider.name },
        card: data.card,
      });

      if (error.statusCode > 400) {
        const dependencyError = new DependencyError(
          'Payment provider error',
          'PAYMENT_PROVIDER_ERROR',
          500,
          { userId: user._id, subscriptionId: subscription._id, error }
        );
        Logger.error(error, 'Error creating pre-approval');
        throw dependencyError;
      } else {
        throw new BadRequestError(
          'PAYMENT_PROVIDER_BAD_REQUEST',
          'Bad request to payment provider',
          400,
          error
        );
      }
    }

    const payment = await provider.getLastPaymentByPayerId(preApproval.payerId);

    const updatedSubscription =
      await this.subscriptionRepository.updateSubscription(subscription._id!, {
        gracePeriodDays: plan.gracePeriodDays,
        external: {
          provider: 'mercadopago',
          data: {
            preApproval,
            payment,
          },
        },
        card: data.card,
        permanencePeriodMonths: plan.permanencePeriodMonths,
        permanencePeriodEndDate: new Date(
          Date.now() + plan.permanencePeriodMonths * 30 * 24 * 60 * 60 * 1000
        ),
      });

    try {
      await this.mailer.send({
        to: [user.email],
        subject: `Parabéns ${user.firstName}, estamos com você a partir de agora!`,
        html: `Olá ${user.firstName},<p>você assinou o plano ${plan.name} no valor de R$ ${plan.price}.</p>`,
      });
    } catch (error) {
      const dependencyError = new DependencyError(
        'Error sending email after subscription creation',
        'EMAIL_ERROR',
        500,
        { userId: user._id, subscriptionId: subscription._id }
      );

      Logger.error(
        dependencyError,
        'Error sending email to user after subscription creation'
      );
    }

    return updatedSubscription!;
  }
}
