export interface HashCompare {
  compare: (plaintext: string, hash: string) => Promise<boolean>;
}
