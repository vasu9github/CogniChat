import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMyChats, getChatById, generateChatResponse, deleteChat } from '../controllers/chatController.js';

const router = express.Router();


router.use(protect);

router.route('/')
    .get(getMyChats);

router.route('/generate')
    .post(generateChatResponse);
    
router.route('/:id')
    .get(getChatById)
    .delete(deleteChat);

export default router;
