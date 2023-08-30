import Router from '@koa/router';
import { RegisterRoutes } from '../../tsoa/routes/routes';

const router: Router = new Router({
  prefix: process.env.ROUTE_PREFIX || '/api/v1',
});

RegisterRoutes(router);

export default router;
