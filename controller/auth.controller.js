const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const key = '';

class AuthController {
    async signUp(req,res) {
        const {username, email, password} = req.body
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // console.log(hash, typeof hash)
                await db.query(`INSERT INTO person(username, email, password, createddate, lastlogindate, userstatus) VALUES ( '${username}', '${email}', '${hash}', '${new Date()}', '', 'active')`)
                });
          });
        res.json()
    }

    async signIn(req,res) {
        const {email, password} = req.body
        const hash = await db.query(`SELECT password FROM person WHERE email = '${email}'`)
        if (hash.rows.length) {
        const dbpass = hash.rows[0].password
        // console.log(hash.rows[0].password, typeof hash.rows[0].password)
        bcrypt.compare(password, dbpass, async function(err, result) {
            console.log(password, dbpass)
            if (result) {
                const users = await db.query(`SELECT * FROM person WHERE email = '${email}' AND password='${dbpass}'`)
                await db.query(`UPDATE person set lastlogindate = '${new Date()}' WHERE email = '${email}' RETURNING *`)
                res.json(users.rows[0])
            } else {
                console.log('invalid data')
            }
        });
        // console.log(req.body,email,password, users.rows)
        } else {
            console.log('invalid email')
        }
    }
}

module.exports = new AuthController();