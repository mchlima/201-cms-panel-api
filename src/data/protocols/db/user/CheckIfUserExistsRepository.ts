export type CheckIfUserExistsDTO = {
  email: string;
};

export interface CheckIfUserExistsRepository {
  checkIfExists(data: CheckIfUserExistsDTO): Promise<boolean>;
}
