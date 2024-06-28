import dotenv from 'dotenv';
dotenv.config();

const Env = {
  PORT: process.env.PORT || 3000,
  MongoDB_URL: process.env.MongoDB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  
};

export default Env;