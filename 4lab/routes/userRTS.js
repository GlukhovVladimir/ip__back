const Router = require('express')
const router = new Router();
const controller = require('../controller/userCTRL')

router.post('/register', controller.register)
router.post('/login', controller.login)

module.exports = router;