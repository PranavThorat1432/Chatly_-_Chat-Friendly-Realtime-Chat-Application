import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/ConversationModel.js";
import Message from "../models/MsgModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMsg = async (req, res) => {
    try {
        const sender = req.userId;
        const {receiver} = req.params;
        const {message} = req.body;

        let image;
        if(req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        let conversation = await Conversation.findOne({
            participants: {$all: [sender, receiver]}
        });

        let newMsg = await Message.create({
            sender, receiver, message, image
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: [newMsg._id]
            });

        } else {
            conversation.messages.push(newMsg._id);
            await conversation.save();
        }
        
        const receiverSocketId = getReceiverSocketId(receiver);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('newMsg', newMsg)
        }

        return res.status(201).json(newMsg);
        
    } catch (error) {
        return res.status(500).json({
            message: `Send Msg Error: ${error}`
        });
    }
};


export const getMsgs = async (req, res) => {
    try {
        const sender = req.userId;
        const {receiver} = req.params;

        // Validate receiver ID
        if (!receiver || receiver === 'undefined') {
            return res.status(400).json({
                message: 'Invalid receiver ID'
            });
        }

        let conversation = await Conversation.findOne({
            participants: {$all: [sender, receiver]}
        }).populate('messages');

        if(!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation?.messages || []);

    } catch (error) {
        return res.status(500).json({
            message: `Get Msg Error: ${error}`
        });
    }
};