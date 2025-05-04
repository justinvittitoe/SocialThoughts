import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getFriends, addFriend, deleteFriend } from '../../controllers/userController.js';
router.route('/').get(getAllUsers).post(createUser);
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router
    .route('/:userId/friends').get(getFriends);
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);
export { router as userRouter };
