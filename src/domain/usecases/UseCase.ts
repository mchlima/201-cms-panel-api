export interface UseCase<Input = any, Output = any> {
  execute(data?: Input): Promise<Output>;
}
