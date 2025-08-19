import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { ok } from '../../helpers/httpResponses';
import { BadRequestError } from '@/presentation/errors';
import { UpdateTenantAvatarById } from '@/domain/usecases/tenant';

export class UploadCurrentTenantAvatarController implements Controller {
  constructor(
    private readonly updateTenantAvatarById: UpdateTenantAvatarById
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { tenantId } = request.payload!;

    const { file } = request;

    if (!file) throw new BadRequestError('AVATAR_FILE_IS_REQUIRED');

    const { buffer, originalName, mimetype } = file;

    const result = await this.updateTenantAvatarById.execute({
      tenantId,
      file: buffer!,
      originalName: originalName!,
      mimetype: mimetype!,
    });

    console.log({
      tenantId,
      originalName,
      mimetype,
    });

    return ok(result);
  }
}
