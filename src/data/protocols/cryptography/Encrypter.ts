export interface Encrypter {
  encrypt: (payload: object, expiresIn?: string | number) => Promise<string>;
}
