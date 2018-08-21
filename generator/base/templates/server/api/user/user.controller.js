const User = require('./user.model')

// // // //

// GET /api/users/profile
exports.profile = (req, res) => {
    return User.findOne({ username: req.user.username }, '-password -__v').exec()
    .then( (user) => { res.json(user) })
}

// // // //

// GET /users
exports.list = (req, res) => {
    return User.find({}, '-password -__v').exec()
    .then( (users) => {
        res.json(users)
    })
}

// // // //

// // POST /users/:username/assign-admin
// exports.assignAdmin = (req, res) => {
//     // refuse if not an admin
//     if(!req.user.admin) {
//         return res.status(403).json({
//             message: 'you are not an admin'
//         })
//     }

//     User.findOneByUsername(req.params.username)
//     .then(
//         user => {
//             if(!user) throw new Error('user not found')
//             user.assignAdmin()
//         }
//     ).then(
//         res.json({
//             success: true
//         })
//     ).catch(
//         (err) => { res.status(404).json({message: err.message})}
//     )
// }
