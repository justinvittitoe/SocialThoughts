import { Router } from 'express';
import { userRouter } from './userRouter.js';
import { thoughtsRouter } from './thoughtsRouter.js';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtsRouter);

export default router;