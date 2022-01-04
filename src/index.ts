import express from 'express';
import { engine } from 'express-handlebars';
const app = express();
import AuthRouter from './routes/auth.router';
import { initDb } from './services/db/initDb';

app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    layoutsDir: `${__dirname}/views/layouts`,
  })
);
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

app.use(AuthRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
  initDb();
});

export const jwtSecret = 'secret';
