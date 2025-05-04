import { Router } from 'express';
const router = Router();
import { getAllThoughts, getThoughtById, createNewThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtsController.js';
router.route('/').get(getAllThoughts).post(createNewThought);
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
router.route('/:thoughtId/reaction')
    .post(createReaction);
router.route('/:thoughtId/reaction/:reactionId')
    .delete(deleteReaction);
export { router as thoughtsRouter };
