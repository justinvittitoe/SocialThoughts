import { Router } from 'express';
const router = Router();
import {
    getAllThoughts,
    getThoughtById
} from '../../controllers/thoughtsController.js';

router.route('/').get(getAllThoughts);

router.route('/:thoughtId')
.get(getThoughtById)

export { router as thoughtsRouter };