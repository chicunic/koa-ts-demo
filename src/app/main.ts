import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from '../router/main';

const app: Koa = new Koa();
const port: number = Number(process.env.PORT) || 8080;

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
