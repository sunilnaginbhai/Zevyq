import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { sendMessageValidator } from '../validators/conversation.validator';

const ConversationRouter = Router();

/**
 * @POST 
 * @route /api/v1/conversation
 * @desc handle the user message
 * req.body should contain the user message and conversation ID (conversationId is optional)
 */

ConversationRouter.use("/conversation", requireAuth, sendMessageValidator, validate);

export default ConversationRouter;