const express = require('express')
const router = express.Router()
const pool = require('../db/pool')
const result = require('../utils/result')

//add users
router.post('/add-users',(req,res) => {
    const {name,email,age} = req.body
    const sql = `INSERT INTO users (name,email,age) VALUES (?,?,?)`
    pool.query(sql,[name,email,age],(error,data) => {
        res.send(result.createResult(error,data))
    })
})

//all users
router.get('/user-details',(req,res) => {
    const sql = `SELECT * FROM users`
    pool.query(sql,(error,data) => {
        res.send(result.createResult(error,data))
    })
})

//user by id
router.get('/get-user/:userId',(req,res) => {
    const userId = req.params.userId
    const sql = `SELECT * FROM users WHERE user_id = ?`
    pool.query(sql,[userId],(error,data) => {
        res.send(result.createResult(error,data))
    })
})

//update users
router.put('/update/:userId',(req,res) => {
    const userId = req.params.userId
    const {name,email,age} = req.body
    const sql = `UPDATE users SET name = ?,email = ?,age = ? WHERE user_id = ?`
    pool.query(sql,[name,email,age,userId],(error,data) => {
        res.send(result.createResult(error,data))
    })
})

//delete users
router.delete('/delete/:userId',(req,res) => {
    const userId = req.params.userId
    const sql = `DELETE FROM users WHERE user_id = ?`
    pool.query(sql,[userId],(error,data) => {
        res.send(result.createResult(null,'user deleted successfully'))
    })
})

module.exports = router