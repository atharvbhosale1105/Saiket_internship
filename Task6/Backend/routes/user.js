const express = require('express')
const cryptojs = require('crypto-js')
const router = express.Router()

const pool = require('../db/pool')
const result = require('../utils/result')

const {checkUserAuthorization } = require('../utils/auth')


router.get('/my-profile',checkUserAuthorization,(req, res) => {
    const userId = req.headers.payload.userId

    const sql = `SELECT u.user_id, u.name, u.email, u.phone, u.bio,a.street, a.city, a.state, a.country
      FROM users u INNER JOIN roles r ON u.role_id = r.role_id
      LEFT JOIN addresses a ON u.user_id = a.user_id
      WHERE u.user_id = ?
    `
    pool.query(sql, [userId], (error, data) => {
      if (error)
        res.send(result.createResult(error))
      else
        res.send(result.createResult(null, data[0]))
    })
  }
)

router.put('/change-password', checkUserAuthorization, (req, res) => {
  const { newPassword, confirmPassword } = req.body
  if (newPassword !== confirmPassword) {
    return res.send(result.createResult('Passwords do not match'))
  }
  const email = req.headers.payload.email
  const hashedPassword = cryptojs.SHA256(newPassword).toString()
  const sql = `UPDATE users SET password = ? WHERE email = ?`
  pool.query(sql, [hashedPassword, email], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

module.exports = router
