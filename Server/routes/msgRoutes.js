import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import { getMsgs, sendMsg } from '../controllers/msgController.js';


const msgRouter = express.Router();

msgRouter.post('/send-msg/:receiver', isAuth, upload.single('image'), sendMsg);
msgRouter.get('/get-msgs/:receiver', isAuth, getMsgs);

export default msgRouter;