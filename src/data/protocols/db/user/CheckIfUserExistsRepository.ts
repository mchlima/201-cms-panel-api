export interface CheckIfUserExistsByEmailRepository {
  checkIfExistsByEmail(email: string): Promise<boolean>;
}
