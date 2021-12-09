const Router = require('express');
const router = new Router();
const passport = require("passport");
const oauthRouter = require('../Controllers/Oauth');
require('../Middleware/passport')(passport);

router.get('/main', oauthRouter.main);
router.get('/enter', passport.authenticate('yandex'));
router.get('/logout', oauthRouter.logout);
router.get('/auth', oauthRouter.auth)
router.get('/token', oauthRouter.token);
router.get('/updateToken', oauthRouter.updateToken);

module.exports = router; 