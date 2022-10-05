import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: '/' });
});

routes.get('/test', (req, res) => {
  return res.json({ message: 'Test' });
});

export default routes;
