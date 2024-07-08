const express = require("express");
const { registerUser, loginUser, allUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router()

router.route('/register').post(registerUser).get( (req , res)=> res.json({login : "login get"}))
router.route('/login').post(loginUser)
router.route("/allusers").get(protect, allUsers );


module.exports = router;
















