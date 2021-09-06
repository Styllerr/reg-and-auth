const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

const jwtAccess = process.env.JWT_ACCESS_KEY || 'anything'
const jwtRefresh = process.env.JWT_REFRESH_KEY || 'nobody'
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, jwtAccess, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, jwtRefresh, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, jwtAccess);
            return userData
        } catch (error) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, jwtRefresh);
            return userData
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();