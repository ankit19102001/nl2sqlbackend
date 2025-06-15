import { Router } from 'express';
const router = Router();
import handleQuery from '../controllers/query-controller.js';

router.post('/', handleQuery);

export default router;
