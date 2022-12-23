const User = require("../model/userModel");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Nome de usuário já cadastrado.", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "E-mail já cadastrado.", status: false });
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            email, 
            username,
            password: hashedPassword, 
        });
        delete user.password;
        return res.json({ status: true, user })
    } catch(ex) {
        next(ex);
    }
};