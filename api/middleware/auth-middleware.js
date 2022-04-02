const Users = require('../users/users-model')

const  checkLoginPayload = (req, res, next) => {
try {
  const { username, password } = req.body
    if (!username || !password) {
        res.status(404).json({message: 'username and password is required'})
} else {
    req.username = username
    req.password = password
    next()
}
} catch (err) {
     next(err)
}} 


const usernameUnique = async (req, res, next) => {
  try {
    const existing = await Users.findByUser(req.body.username)
    if (!existing.length) {
     next()
} else {
     next({ status: 401, message: 'username in use' })
}
} catch (err) {
     next(err)
}}


const validateCredentials= async (req, res, next) => {
try {
const user = await Users.findByUser(req.body.username)
    const password = await Users.validate(req.body.password)
    if (!user || !password) {
    next({ status: 400, message: 'invalid credentials' })
} else {
    next()
}
} catch (err) {
     next(err)
}}

module.exports = { 
    checkLoginPayload,
    usernameUnique,
    validateCredentials,
};