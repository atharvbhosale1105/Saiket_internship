const jwt = require('jsonwebtoken')
const config = require('./config')
const result = require('./result')

function authUser(req, res, next) {

  const allAllowedUrls = [
    '/auth/login',
    '/auth/register',
    '/auth/admin/register'
  ]

  if (allAllowedUrls.includes(req.url)) {
    return next()
  }

  // ✅ Correct header
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.send(result.createResult('Token is missing'))
  }

  try {

    // ✅ Extract token from "Bearer TOKEN"
    const token = authHeader.split(' ')[1]

    if (!token)
      return res.send(result.createResult('Token is missing'))

    // ✅ Verify token
    const payload = jwt.verify(token, config.SECRET)

    // ✅ Attach payload
    req.headers.payload = payload

    next()

  } catch (err) {
    return res.send(result.createResult('Token is Invalid'))
  }
}


// ================= USER AUTH =================
function checkUserAuthorization(req, res, next) {

  if (req.headers.payload.role === 'USER')
    return next()

  return res.send(result.createResult("UnAuthorized access"))
}


// ================= ADMIN AUTH =================
function checkAdminAuthorization(req, res, next) {

  if (req.headers.payload.role === 'ADMIN')
    return next()

  return res.send(result.createResult("UnAuthorized access"))
}

module.exports = {
  authUser,
  checkUserAuthorization,
  checkAdminAuthorization
}
