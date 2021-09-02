const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

const activateUri = process.env.API_URL + '/api/activate/'

class UserService {
    async registration(email, password) {
        const candidat = await UserModel.findOne({ email });
        if (candidat) {
            throw new Error(`Адрес ${email} уже зарегистрирован`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink })
        console.log(`Send link at: ${activateUri}${activationLink}`, email)
        await mailService.sendActivationMail(email, `${activateUri}${activationLink}`)

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();