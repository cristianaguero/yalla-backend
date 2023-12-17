import jwt from 'jsonwebtoken';

const jwtGenerator = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "5d" });
}

export default jwtGenerator;