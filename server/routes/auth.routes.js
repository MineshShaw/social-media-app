import express from 'express'
import { signup, signin } from '../controllers/auth.controllers.js'

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.get('/signin', signin);

export default authRouter;