import { connect } from 'mongoose';

const uri = `mongodb+srv://vinicius:vinicius@ultr.uqnnd.mongodb.net/ultr?retryWrites=true&w=majority`;

const initDb = () => {
  connect(uri).then(() => {
    console.log('Connected to database.');
  });
};

export { initDb };
