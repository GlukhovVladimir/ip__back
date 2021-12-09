const passport = require('passport-yandex')

const yandex = module.exports = {
    CLIENT_ID: "b97c5dfae0db447ebf65a2d9529e9014",
    CLIENT_SECRET: "50d18ca11c2645898b9045db276ace50",
    CALLBACK_URL : "http://localhost:3000/auth"
}; 

var yandexStrategy = new passport.Strategy(
    {
        clientID: yandex.CLIENT_ID,
        clientSecret: yandex.CLIENT_SECRET,
        callbackURL: yandex.CALLBACK_URL
    },

    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
);

module.exports = passport => {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(yandexStrategy);
} 