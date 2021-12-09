const database = require('../databaseconnect')
class ClientController {
    async createClient(req, res) {
        const {id,fioname, passport, hotelid} = req.body
        const newclient = await database.query(`INSERT INTO client (id, fioname, passport, hotelid) values ($1, $2, $3, $4) RETURNING * `, [id, fioname, passport, hotelid])
        newclient.rows.length > 0 ? res.json(newclient.rows[0]) : res.status(400).json("Error");

    }
    async getClient(req, res) {
        const id = req.params.id;
        const client = await database.query(`SELECT * FROM client where id = $1 `, [id])
        client.rows.length > 0 ? res.json(client.rows[0]) : res.status(400).json("client doesn't exist");
    }

    async getClients(req, res) {
        const clients = await database.query(`SELECT * FROM client`)
        clients.rows.length > 0 ? res.json(clients.rows) : res.status(400).json("clients doesn't exist");
    }

    async updateClient(req, res) {
        const {id, fioname, passport, hotelid} = req.body;
        const client = await database.query(`UPDATE client set fioname = $2, passport = $3, hotelid = $4 
        where id = $1 RETURNING *`, [id, fioname, passport, hotelid])
        client.rows.length > 0 ? res.json(client.rows[0]) : res.status(400).json("client doesn't exist");
    }

    async deleteClient(req, res) {
        const id = req.params.id;
        const client = await database.query(`DELETE from client where id = $1  RETURNING *`, [id])
        client.rows.length > 0 ? res.json(client.rows[0]) : res.status(400).json("client doesn't exist or already deleted");
    }
}

module.exports = new ClientController()