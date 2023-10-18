import koa from 'koa';
import Router from '@koa/router';
import { RegisterRoutes } from './_routes_tsoa';

const router: Router = new Router({
  prefix: process.env.ROUTE_PREFIX || '/api/v1',
});

router.use(async (ctx: koa.Context, next: koa.Next) => {
  try {
    await next();
  } catch (err) {
    console.log('err:', err);
    ctx.response.status = err.status || 500;
    ctx.body = err.message;
  }
});
RegisterRoutes(router);

export default router;
