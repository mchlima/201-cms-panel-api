import { IPaymentProvider } from '@/providers/payments';
import { IManagePaymentWebhookMPService, ManagePaymentWebhookMPDTO } from '.';
import { ISubscriptionRepository } from '@/repositories/subscription';
import { ISubscription } from '@/models';
import { IPaymentRepository } from '@/repositories/payment';

export class ManagePaymentWebhookMPService
  implements IManagePaymentWebhookMPService
{
  constructor(
    private readonly mercadoPagoPaymentProvider: IPaymentProvider,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly paymentRepository: IPaymentRepository
  ) {}

  async execute(data: ManagePaymentWebhookMPDTO): Promise<void> {
    const paymentId = data.data.id;
    let payment;

    try {
      payment = await this.mercadoPagoPaymentProvider.getPaymentById(paymentId);
    } catch (error: any) {
      return;
    }

    if (!payment) return;

    const subscriptions = await this.subscriptionRepository.searchSubscriptions(
      {
        _id: payment.externalReference || '687a9034f09fa1fe108b4968',
      }
    );

    if (!subscriptions || subscriptions.length === 0) return;

    const subscription = subscriptions[0];

    let newData: Partial<ISubscription> = {
      external: {
        data: {
          preApproval: subscription.external?.data?.preApproval,
          payment,
        },
        provider: 'mercadopago',
      },
    };

    await this.paymentRepository.updateOrCreate({
      subscriptionId: subscription._id!,
      userId: subscription.userId!,
      status: payment.status,
      statusDetail: payment.statusDetail,
      transactionAmount: payment.transactionAmount,
      currencyId: payment.currencyId as 'BRL' | 'CLP',
      countryCode: 'BR' as 'BR' | 'CL',
      authorizationCode: payment.authorizationCode || null,
      acquirer: 'mercadopago',
      acquirerPaymentId: payment.id!,
      acquirerApprovedAt: payment.dateApproved,
      acquirerCreatedAt: payment.dateCreated,
      acquirerUpdatedAt: payment.dateLastUpdated,
      acquirerExpireAt: payment.dateOfExpiration,
    });

    // Check if the payment is approved
    if (payment.status === 'approved' && payment.transactionAmount > 0) {
      const now = new Date();
      const endGraceAt = new Date(
        Date.now() + subscription.gracePeriodDays! * 24 * 60 * 60 * 1000 // Calculate end of grace period
      );
      // If the grace period has ended, set status to 'active'
      const status: 'active' | 'in_grace' =
        endGraceAt && endGraceAt <= now ? 'active' : 'in_grace';

      newData.status = status;
      newData.startedAt = now;
      newData.endGraceAt = endGraceAt;
      newData.statusDetails = payment.statusDetail;
    }

    // Check if the payment was rejected
    else if (payment.status === 'rejected') {
      newData.status = 'error';
      newData.statusDetails = payment.statusDetail;
    }

    // Check if the payment was cancelled
    else if (payment.status === 'cancelled') {
      newData.status = 'cancelled';
      newData.statusDetails = payment.statusDetail;
    }

    // Check if the payment was refunded
    else if (payment.status === 'refunded') {
      newData.status = 'cancelled';
      newData.statusDetails = payment.statusDetail;
    }

    // Check if the payment was charged back
    else if (payment.status === 'charged_back') {
      newData.status = 'cancelled';
      newData.statusDetails = payment.statusDetail;
    }

    await this.subscriptionRepository.updateSubscription(
      subscription!._id!,
      newData
    );

    return;
  }
}
