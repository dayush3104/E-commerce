import bcrypt from 'bcrypt';

export const encryptPassword = async (password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(`<<< ERROR (encryptPassword) : ${error} >>>`);
    }
}

export const comparePassword = async (password, hashedPassword)=>{
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log(`<<< ERROR (comparePassword) : ${error} >>>`);
    }
}