const {sign, JsonWebTokenError} = require('jsonwebtoken');
const jwt = require('jsonwebtoken')
const Admin = require('../../model/admin.model')

module.exports = {
    login: async(req, res) => {
        const data = req.body;
        let results;
        try {
            results = await Admin.findAll()
        }catch(err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }
        results = results[0];

        if(data.password === results.password && data.admin_name === results.admin_name) {
            // results.password = undefined;
            const jsontoken = sign({result:results}, 'qwe1234',{
                expiresIn: "1h"
            })

            return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken
            });

        }
        else{
            return res.json({
                success: 0,
                message: "invalid account or password"
            });
        }
    }
}