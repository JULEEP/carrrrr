
import express from 'express';
import { 
     deleteAccount,
     confirmDeleteAccount,
     deleteUser,
    } from '../Controllers/userController.js'; // Import UserController

const router = express.Router();


router.post('/deleteaccount', deleteAccount)
router.get('/confirm-delete-account/:token', confirmDeleteAccount);
router.delete('/delete-user/:userId', deleteUser);


export default router;
