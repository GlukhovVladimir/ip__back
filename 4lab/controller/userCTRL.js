const database = require('../databaseconnect')
const jwt = require('jsonwebtoken')

const findUser = async (name) => {
    const nowUser = await database.query('SELECT * FROM users WHERE name = $1', [name]);
    if (!nowUser.rows[0]) {
        return {};
    }
    return nowUser.rows[0];
}

class userController {

    async register(req, res) {
        const { name, password } = req.body;
        if (name == "" || password == "") {
            return res.status(400).json({ status: 'error', error: 'Invalid data' });
        }
        const currentUser = await findUser(name);
        if (name === currentUser.name) {
            return res.status(400).json({ status: 'error', error: 'User with login already exist' });
        }
        const result = await database.query('INSERT INTO users(name, password) VALUES ($1, $2) RETURNING *', [name, password]);
        res.json(result.rows[0]);
    }

    async login(req, res) {
        const { name, password } = req.body;
        if (name == "" || password == "") {
            return res.json({ status: 'error', error: 'Invalid data' });
        }
        const currentUser = await findUser(name);
        if (!currentUser || password !== currentUser.password) {
            return res.status(400).json({ status: 'error', error: 'User not found or Invalid password' });
        }
        const token = jwt.sign({ id: currentUser.id, name }, 'secret', { expiresIn: "7d" })
        return res.json({
            token,
            currentUser: {
                id: currentUser.id,
                name: name
            }
        });
    }
}

module.exports = new userController();