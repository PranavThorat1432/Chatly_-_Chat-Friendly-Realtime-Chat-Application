import express from 'express';
import { editProfile, getCurrentUser, getOtherUsers, search } from '../controllers/userController.js';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';


const userRouter = express.Router();

userRouter.get('/current-user',isAuth, getCurrentUser);
userRouter.put('/edit-profile',isAuth, upload.single('image'), editProfile);
userRouter.get('/other-user',isAuth, getOtherUsers);
userRouter.get('/search-user',isAuth, search);

export default userRouter;