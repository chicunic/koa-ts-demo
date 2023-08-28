import Router from '@koa/router';

const router: Router = new Router();

router.get('/', async (ctx) => {
  ctx.body = `succeed at ${new Date().toISOString()}`;
});

export default router;
