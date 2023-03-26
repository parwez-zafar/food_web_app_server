const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRETKEY;


router.post('/createUser',
    body('email', 'email is incorrect').isEmail(),
    body('password', 'password too short').isLength({ min: 5 }),
    body('c_password', 'c_password too short').isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        try {

            const { name, email, location, password, c_password } = req.body;


            const userExist = await User.findOne({ email: email })
            if (userExist) {
                return res.json({ success: false, status: 409 });
            }
            if (password !== c_password) {
                return res.json({ success: false, status: 401 });
            }

            let sec_password = await bcrypt.hash(password, salt);
            let sec_c_password = await bcrypt.hash(c_password, salt);
            await User.create({
                name, email, location, password: sec_password, c_password: sec_c_password
            })

            res.json({ success: true, status: 201 });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, status: 400 });
        }
    })








router.post('/loginUser', async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(400).json({ errors: "invalid credentials" });
        }
        const password_compare = await bcrypt.compare(password, data.password);
        if (password_compare) {

            const uData = {
                user: {
                    id: data.id
                }
            }
            const auth_token = jwt.sign(uData, jwt_secret)
            res.json({ success: true, email: email, auth_token: auth_token })
        }
        else
            return res.status(400).json({ errors: "invalid credentials" });

    }
    catch (err) {
        console.log(err);
        res.json({ success: false })
    }
})


module.exports = router;