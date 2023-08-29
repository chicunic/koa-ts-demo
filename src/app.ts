import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { koaSwagger } from 'koa2-swagger-ui';
import mount from 'koa-mount';
import path from 'path';
import serve from 'koa-static';
import session from 'koa-session';
import router from './routes/main';
import { sessionConfig } from './session/config';

const app: Koa = new Koa();
app.keys = ['some secret hurr'];
const port: number = Number(process.env.PORT) || 8080;
const routePrefix: string = process.env.ROUTE_PREFIX || '/';

app
  .use(bodyParser())
  .use(cors())
  .use(mount(routePrefix, serve('tsoa/swagger')))
  .use(
    koaSwagger({
      routePrefix: routePrefix,
      swaggerOptions: {
        url: path.join(routePrefix, 'swagger.json'),
      },
    }),
  )
  .use(session(sessionConfig, app))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
