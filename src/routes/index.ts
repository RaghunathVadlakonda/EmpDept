import { Router } from 'express';
import employee from './employee-routes';
import department from './department-routes';
const routes = Router();

routes.use('/user', employee);
routes.use('/', department)

export default routes;
