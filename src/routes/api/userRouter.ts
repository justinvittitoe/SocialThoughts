import { Router } from 'express';
const router = Router();
import {
    getAllUsers,
    getUserById
} from '../../controllers/userController.js';

router.route('/').get(getAllUsers);

router
.route('/:userId')
.get(getUserById);

export { router as userRouter };