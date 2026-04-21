const router = require("express").Router();
const { sendMessage } = require("../controllers/chatController");

router.post("/", sendMessage);

module.exports = router;