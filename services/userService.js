import bcrypt from 'bcrypt'

export const comparePassword = async (passwordDb, passwordForm) => {
    return await bcrypt.compare(passwordForm, passwordDb)
}