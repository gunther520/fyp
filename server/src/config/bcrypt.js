import bcrypt from "bcrypt";

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const checkHashPassword = (hashPassword, password) => {
  return bcrypt.compareSync(hashPassword, password);
};

export { hashPassword, checkHashPassword };
