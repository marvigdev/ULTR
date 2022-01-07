import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '.env') });

import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import AuthRouter from './routes/auth.router';
import AppRouter from './routes/app.router';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './services/Database.service';

const app = express();
const PORT = process.env.PORT;

app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    layoutsDir: join(__dirname, 'views', 'layouts'),
  })
);
app.set('view engine', 'hbs');
app.set('views', join(__dirname, '..', 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(AuthRouter);
app.use(AppRouter);
app.all('*', (_: Request, res: Response) => res.redirect('/app'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
  connectToDatabase();
});
