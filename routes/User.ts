import express from 'express';
import { Register, Login } from '../Controller/UserController';

const UserRouter = express.Router();


UserRouter.post('/user-login', Login);

UserRouter.post('/user-register', Register);

export default UserRouter;
