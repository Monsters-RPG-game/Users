import bcrypt from 'bcrypt';
import * as errors from '../../errors/index.js';

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const compare = async (password: string, hashed: string): Promise<void> => {
  const auth = await bcrypt.compare(password, hashed);

  if (!auth) throw new errors.IncorrectCredentialsError();
};
