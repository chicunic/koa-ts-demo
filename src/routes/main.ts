import Router from '@koa/router';
import { RegisterRoutes } from '../../tsoa/routes/routes';

const router: Router = new Router({
  prefix: '/api/v1',
});

RegisterRoutes(router);

export default router;
