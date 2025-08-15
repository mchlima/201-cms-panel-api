export interface IService<Input = any, Output = any> {
  execute(data?: Input): Promise<Output>;
}
