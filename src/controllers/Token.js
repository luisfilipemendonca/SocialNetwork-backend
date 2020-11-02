import jwt from 'jsonwebtoken';

import User from '../models/User';

class TokenController {
    async createUserToken(req, res) {
        try {

            const { email, password } = req.body;

            if (!email) {
                return res.status(400).json({ field: 'email', msg: 'Your email cannot be empty.' });
            }

            if (!password) {
                return res.status(400).json({ field: 'password', msg: 'Your password cannot be empty.' });
            }

            const user = await User.findOne({ where: { email } });

            if(!await user.isPasswordValid(password)) {
                return res.status(400).json({ field: 'password', msg: 'Your password is invalid.' });
            }

            const token = jwt.sign({ email }, 'jshadhskdahdkhskhkasd');

            return res.status(200).json({user, token});

        }
        catch (e) {
            console.log(e);
        }
    }
}

export default new TokenController();