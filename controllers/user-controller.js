const userService =require('../service/user-service');
class UserController {
    async registration(req, resp, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            resp.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return resp.json(userData);
        } catch (error) {
            console.log(error);
        }
    }
    async login(req, resp, next) {
        try {

        } catch (error) {

        }
    }
    async logout(req, resp, next) {
        try {

        } catch (error) {

        }
    }
    async activate(req, resp, next) {
        try {

        } catch (error) {

        }
    }
    async refresh(req, resp, next) {
        try {

        } catch (error) {

        }
    }
    async getUsers(req, resp, next) {
        try {
            resp.json(['123', '1354'])
        } catch (error) {

        }
    }
}
module.exports = new UserController();