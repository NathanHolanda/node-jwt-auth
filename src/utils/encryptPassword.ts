import bcrypt from "bcrypt"

async function encryptPassword(password: string){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
}

export default encryptPassword