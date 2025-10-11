import express from 'express'
import {registerUser, loginUser} from '../controllers/authController'
import {verifyToken} from '../middleware/authMiddleware'
import {allowRoles} from '../middleware/roleMiddleware'

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser)

router.get('/profile', verifyToken, (req,res)=>{
  res.json({message: `Welcome ${req.user.id}`, role: req.user.role});
})