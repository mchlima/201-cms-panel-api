import { Test } from '@/domain/models/test';
import { Schema, model } from 'mongoose';

const testSchema = new Schema({
  numberOne: { type: Number, required: true },
  numberTwo: { type: Number, required: true },
});

export const TestModel = model<Test>('Test', testSchema);
