const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const database = require('./databaseconnect')

module.exports = passport => {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';

    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = (await database.query('select * from users where id = $1', [payload.id])).rows[0];
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                done(err, false);
            }
        })
    );
}