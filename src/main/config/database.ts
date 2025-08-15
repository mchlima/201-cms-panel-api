import mongoose from 'mongoose';

export async function connectToDatabase(uri: string) {
  if (!uri) throw new Error('MONGODB_URI não definida.');
  await mongoose.connect(uri);
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

export async function testConnection() {
  return await mongoose.connection.db!.admin().ping();
}

export async function isDatabaseConnected() {
  return mongoose.connection.readyState === mongoose.ConnectionStates.connected;
}
