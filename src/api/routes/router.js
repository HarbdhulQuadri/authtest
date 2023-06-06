const express = require("express");
const router = express.Router()



const authController = require("../controllers/authController")
const authMiddleware = require("../middleware/auth")


// Users
router.post("/auth/register",authMiddleware.register,  authController.Register)
router.post("/auth/login", authMiddleware.login, authController.Login)
router.patch("/auth/resetpassword",authMiddleware.resetPassword,  authController.resetPassword)
router.post('/auth/verifyUser', authMiddleware.verifyUser, authController.verifyUser)
router.post('/auth/refresh_token', authMiddleware.refreshToken, authController.refreshToken)

// MonitorsTransactions
module.exports = router