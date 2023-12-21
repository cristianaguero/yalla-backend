import jwt from "jsonwebtoken";

const jwtGenerator = (userId) => {
    const payload = {
      user: {
        id: userId,
      },
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });
  };

export default jwtGenerator;