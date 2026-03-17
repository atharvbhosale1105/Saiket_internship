const express = require('express')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')
const router = express.Router()
const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')


router.post('/auth/login',(req,res) => {
    const {email,password} = req.body
    const hashedPassword = cryptojs.SHA256(password).toString()
    const sql = `SELECT * FROM users u INNER JOIN roles r ON u.role_id = r.role_id WHERE u.email = ? AND u.password = ?`
    pool.query(sql,[email,hashedPassword],(error,data) => {
        if(error)
            res.send(result.createResult(error))
        else if(data.length == 0)
            res.send(result.createResult('Invalid Email OR Password'))
        else{
            const user = data[0]

            const payload = {
                userId: user.user_id,
                roleId:user.role_id,
                email:user.email,
                role:user.role_name
            }
            const token = jwt.sign(payload,config.SECRET)
            const userData = {
                token
            }
            res.send(result.createResult(null,userData))
        }
    })
})

router.post('/auth/register', (req, res) => {

    const {name,email,phone,bio,street,city,state} = req.body

    const role_id = 2

    // Step 1: insert user
    const userSql = `
        INSERT INTO users (role_id, name, email, password, phone, bio)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    pool.query(userSql,[role_id, name, email, config.DEFAULT_PASSWORD, phone, bio],(error, userResult) => {

            if (error)
                return res.send(result.createResult(error))
            const userId = userResult.insertId

            // Step 2: insert address
            const addressSql = `INSERT INTO addresses (user_id, street, city, state) VALUES (?, ?, ?, ?) `
            pool.query(addressSql,[userId, street, city, state],(error) => {
                    if (error)
                        res.send(result.createResult(error))
                    else
                        res.send(result.createResult(null,'User registered successfully'))
                }
            )
        }
    )
})




module.exports = router