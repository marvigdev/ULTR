import { connect } from 'mongoose';

const { MONGO_URI } = process.env;

/**
 * Connects to database
 */
function connectToDatabase() {
  if (!MONGO_URI) throw new Error('No mongodb uri provided');

  connect(MONGO_URI)
    .then(() => {
      console.log('Connected to database.');
    })
    .catch((err: unknown) => {
      throw err;
    });
}

export { connectToDatabase };
