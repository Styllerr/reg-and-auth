const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid')

class UserService {
    async registration(email, password) {
        const candidat = await UserModel.findOne({email});
        if(candidat) {
            throw new Error(`Адрес ${email} уже зарегистрирован`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink})
    }
}

module.exports = new UserService();