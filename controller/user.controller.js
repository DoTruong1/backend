const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');



let saltRounds = 10;


//hash password
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}
// compare password
function comparePassword(plaintext, hashed) {
    return bcrypt.compareSync(plaintext, hashed)
}

//  using sequelize
let RegisterUser = async (req, res) => {
    let { userName, email, phone, password, address, isAdmin } = req.body;
    // return res.json({data: req.body});
    if (!isIdUnique) {
        return res.status(404).json({ message: "Email đã được sử dụng" })
    }
    try {
        let existUser = await User.findOne({
            where: { email: email }
        })
        if (existUser) {
            return res.json("Existed Email")
        } else {
            let hashUserPassword = await hashPassword(password)
            // create user
            let newUser = await User.create({
                userName: userName,
                email: email,
                phone: phone,
                password: hashUserPassword,
                address: address,
                isAdmin: isAdmin
            })
            // save to db
            await newUser.save();
            return res.status(200).json({
                message: "ok",
                data: newUser
            })
        }


    } catch (err) {
        return res.status(400).json(err)
    }
}

const LoginUser = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password
        let user = await User.findOne({
            where: { email: email }
        })
        if (user != null) {
            const results = comparePassword(password, user.password)
            if (results == 1) {
                const accessToken = jwt.sign({
                    id: user.id,
                }, "secretKey", { expiresIn: '1d' });

                return res.status(200).json({
                    message: 'okk',
                    user,
                    accessToken
                })
            } else {
                return res.status(400).json("wrong password");
            }
        } else {
            return res.status(400).json("wrong email")
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}



const changePassword = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({
        where: { email: email }
    })
    if (user) {
        let hashNewPassword = await hashPassword(password);
        user.password = hashNewPassword;
        await user.save();
        return res.status(200).json({
            message: 'ook'
        })
    } else {
        res.status(400).json({
            message: 'error'
        })
    }
}

const viewUser = async (req, res) => {
    const requestId = req.params.id;
    const user = await User.findOne({
        where: {
            id: requestId
        }
    })
    if (!user)
        return res.status(404).json("The user with the given ID was not found.");
    res.json(user);
}

const isIdUnique = async email => {
    await User.findOne({
        where: {
            email: email
        },
        attribue: ['email']
    })
        .then(token => token !== null)
        .then(isIdUnique => isIdUnique)

}
module.exports = {
    RegisterUser, LoginUser, changePassword, viewUser
}