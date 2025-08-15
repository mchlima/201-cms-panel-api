import { Test } from '@/domain/models/test';
import { TestModel } from './models';
import { HealthRepository as HealthProtocol } from '@/data/protocols/db/health';

export class HealthRepository implements HealthProtocol {
  async check(numberOne: number, numberTwo: number): Promise<Test> {
    await TestModel.create({ numberOne, numberTwo });

    const result = await TestModel.aggregate([
      {
        $project: {
          sum: { $add: ['$numberOne', '$numberTwo'] },
        },
      },
    ]);

    await TestModel.findOneAndDelete({ numberOne, numberTwo });

    return result[0]?.sum ?? 0;
  }
}
