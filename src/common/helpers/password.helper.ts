import * as bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12


export const passwordToHash = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS)
};

export const checkPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};