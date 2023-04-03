const db = require('../db')

class UserController {
    async getUsers(req,res) {
        const users = await db.query('SELECT * FROM person')
        res.json(users.rows)
    }
    async updateUserStatus(req,res) {
        const id = req.params.id
        const userstatus = req.body.userstatus
        const user = await db.query(`UPDATE person set userstatus = '${userstatus}' WHERE id = ${id} RETURNING *`)
        res.json(user.rows[0])
    }
    async deleteUser(req,res) {
        const id = req.params.id
        const user = await db.query(`DELETE FROM person WHERE id = ${id}`)
        res.json(user.rows[0])  
    }
}

module.exports = new UserController();