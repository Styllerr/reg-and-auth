const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

const jwtAccess = process.env.JWT_ACCESS_KEY || 'anything'
const jwtRefresh = process.env.JWT_REFRESH_KEY || 'nobody'
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, jwtAccess, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, jwtRefresh, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken});
        return token;
    }
}

module.exports = new TokenService();