const db = require('../databaseconnect')

class hotelRoomController {
    async createhotelRoom(req, res) {
        const {id, countrooms, typeroom, price, reservation, hotelid, clientid} = req.body;
        const result = await db.query('INSERT INTO hotelRoom(id, countrooms, typeroom, price, reservation, hotelid, clientid) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *', [id, countrooms, typeroom, price, reservation, hotelid, clientid]);
        res.json(result.rows[0]);
    }

    async geAllhotelRooms(req, res) {
        const result = await db.query('SELECT * FROM hotelRoom ');
        res.json(result.rows);
    }

    async gethotelRoom(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM hotelRoom WHERE id = $1', [id]);
        res.json(result.rows[0]);
    }

    async updatehotelRoom(req, res) {
        const {id, countrooms, typeroom, price, reservation, hotelid, clientid} = req.body;
        const result = await db.query('UPDATE hotelRoom SET countrooms = $2, typeroom = $3, price = $4, reservation = $5, hotelid = $6, clientid = $7 WHERE id = $1 RETURNING *', [id, countrooms, typeroom, price, reservation, hotelid, clientid]);
        res.json(result.rows[0]);
    }

    async deletehotelRoom(req, res) {
        const id = req.params.id;
        await db.query('DELETE from hotelRoom WHERE id = $1  RETURNING *', [id]);
        res.json('hotelRoom with id: ' + id + ' was deleted');
    }
}

module.exports = new hotelRoomController();