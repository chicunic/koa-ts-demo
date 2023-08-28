import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mount from 'koa-mount';
import serve from 'koa-static';
import { koaSwagger } from 'koa2-swagger-ui';
import router from './routes/main';

const app: Koa = new Koa();
const port: number = Number(process.env.PORT) || 8080;

app
  .use(bodyParser())
  .use(cors())
  .use(mount('/api/v1', serve('tsoa/swagger')))
  .use(
    koaSwagger({
      routePrefix: '/api/v1',
      swaggerOptions: {
        url: '/api/v1/swagger.json',
      },
    }),
  )
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
