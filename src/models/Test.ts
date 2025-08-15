import { Schema, model } from 'mongoose';

export type Test = {
  sum: number;
};

const testSchema = new Schema({
  numberOne: { type: Number, required: true },
  numberTwo: { type: Number, required: true },
});

export const TestModel = model<Test>('Test', testSchema);
