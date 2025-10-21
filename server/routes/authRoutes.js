const express = require('express')
const {registerUser, loginUser, profileController} = require('../controllers/authController')
const {verifyToken} =require('../middleware/authMiddleware')
const {allowRoles} = require('../middleware/roleMiddleware')

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser)

router.get('/profile', verifyToken,profileController)

router.get('/admin-only', verifyToken, allowRoles('admin'),(req,res)=>{
  res.json({message: 'Welcome Admin!'});
})

router.post('/logout',(req,res)=>{
  res.clearCookie("token");
  res.json({message: "Logged out successfully"})
})

module.exports = router;
