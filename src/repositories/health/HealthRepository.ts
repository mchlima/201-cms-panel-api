import { Test, TestModel } from '@/models';
import { IHealthRepository } from './IHealthRepository';

export class HealthRepository implements IHealthRepository {
  async check(numberOne: number, numberTwo: number): Promise<Test> {
    console.log(`Checking health with numbers: ${numberOne}, ${numberTwo}`);

    await TestModel.create({ numberOne, numberTwo });

    const result = await TestModel.aggregate([
      {
        $project: {
          sum: { $add: ['$numberOne', '$numberTwo'] },
        },
      },
    ]);
    console.log(`Health check result: ${JSON.stringify(result)}`);

    await TestModel.findOneAndDelete({ numberOne, numberTwo });

    return result[0]?.sum ?? 0;
  }
}
