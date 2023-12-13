import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const checkAuth = async (req, res, next) => {
    let token;

    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await prisma.users.findUnique({
                where: {
                    id: decoded.userId
                }
            });

            return next();


        } else {
            return res.status(401).json({ error: 'Not authorized' });
        }

    } catch (error) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    next();

}

export default checkAuth
