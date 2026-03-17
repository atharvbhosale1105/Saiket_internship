const express = require('express')
const cryptojs = require('crypto-js')
const router = express.Router()
const pool = require('../db/pool')
const result = require('../utils/result')
const {checkAdminAuthorization } = require('../utils/auth')

router.get('/get-users',checkAdminAuthorization,(req, res) => {
    const sql = `SELECT u.user_id, u.name, u.email, u.phone, u.bio ,u.is_active
    FROM users u INNER JOIN roles r ON u.role_id = r.role_id
    WHERE role_name = 'USER' `
    pool.query(sql, (error, data) => {
      if (error)
        res.send(result.createResult(error))
      else
        res.send(result.createResult(null, data))
    })
  }
)

router.get('/get-user/:userId',checkAdminAuthorization,(req, res) => {
    const userId = req.params.userId
    const sql = `SELECT u.user_id, u.name, u.email, u.phone, u.bio,u.is_active
    FROM users u INNER JOIN roles r ON u.role_id = r.role_id
    WHERE u.user_id = ? `

    pool.query(sql, [userId], (error, data) => {
      if (error)
        res.send(result.createResult(error))
      else if (data.length === 0)
        res.send(result.createResult('User not found'))
      else
        res.send(result.createResult(null, data[0]))
    })
  }
)


router.put('/update-user-address/:userId',checkAdminAuthorization,(req, res) => {

    const userId  = req.params.userId
    const { street, city, state, country } = req.body
    const sql = `UPDATE addresses SET street = ?, city = ?, state = ?, country = ? WHERE user_id = ?`

    pool.query(sql,[street, city, state, country || 'India', userId],(error) => {
        if (error)
          res.send(result.createResult(error))
        else
          res.send(result.createResult(null, 'Address updated successfully'))
      }
    )
  }
)


router.put('/update-user/:userId',checkAdminAuthorization,(req, res) => {
    const userId = req.params.userId
    const { name, phone, bio, is_active } = req.body
    const sql = `UPDATE users SET name = ?, phone = ?, bio = ?, is_active = ? WHERE user_id = ?` 

    pool.query(sql,[name, phone, bio, is_active, userId],(error) => {
        if (error)
          res.send(result.createResult(error))
        else
          res.send(result.createResult(null, 'User updated successfully'))
      }
    )
  }
)

router.delete('/delete-user/:userId',checkAdminAuthorization,(req, res) => {
    const userId = req.params.userId
    const sql = `DELETE FROM users WHERE user_id = ?`

    pool.query(sql, [userId], (error) => {
      if (error)
        res.send(result.createResult(error))
      else
        res.send(result.createResult(null, 'User deleted successfully'))
    })
  }
)

// ================= GET USER ADDRESS =================
router.get('/get-user-address/:userId', checkAdminAuthorization, (req, res) => {

  const userId = req.params.userId

  const sql = `
    SELECT street, city, state, country
    FROM addresses
    WHERE user_id = ?
  `

  pool.query(sql, [userId], (error, data) => {

    if (error)
      return res.send(result.createResult(error))

    if (data.length === 0)
      return res.send(result.createResult(null, null))

    res.send(result.createResult(null, data[0]))

  })
})

router.post('/create-user', checkAdminAuthorization, (req, res) => {

  const roleId = 2;
  const { name, email, password, phone, bio, address } = req.body;

  const hashedPassword = cryptojs.SHA256(password).toString();

  const userSql =
    `INSERT INTO users (role_id, name, email, password, phone, bio)
     VALUES (?, ?, ?, ?, ?, ?)`;

  pool.query(
    userSql,
    [roleId, name, email, hashedPassword, phone, bio],
    (error, userResult) => {

      if (error)
        return res.send(result.createResult(error));

      const userId = userResult.insertId;

      if (!address)
        return res.send(result.createResult(null, { userId }));

      const addressSql =
        `INSERT INTO addresses (user_id, street, city, state, country)
         VALUES (?, ?, ?, ?, ?)`;

      pool.query(
        addressSql,
        [
          userId,
          address.street,
          address.city,
          address.state,
          address.country || 'India'
        ],
        (addrError) => {

          if (addrError)
            return res.send(result.createResult(addrError));

          res.send(result.createResult(null, { userId }));
        }
      );
    }
  );
});


module.exports = router
