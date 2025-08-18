import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { notFound, ok } from '../../helpers/httpResponses';
import { UpdateUserAvatarById, UpdateUserById } from '@/domain/usecases/user';
import { BadRequestError } from '@/presentation/errors';

export class UploadCurrentUserAvatarController implements Controller {
  constructor(private readonly updateUserAvatarById: UpdateUserAvatarById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.payload!;

    const { file } = request;

    if (!file) throw new BadRequestError('AVATAR_FILE_IS_REQUIRED');

    const { buffer, originalName, mimetype } = file;

    const result = await this.updateUserAvatarById.execute({
      userId,
      file: buffer!,
      originalName: originalName!,
      mimetype: mimetype!,
    });
    return ok(result);
  }
}
