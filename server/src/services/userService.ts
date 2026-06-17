import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerUser(userData: any) {
    const { email, password, firstName, lastName } = userData;

    const existingUser = await UserModel.getByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await UserModel.createUser({ email, passwordHash, firstName, lastName });

    const token = jwt.sign(
        newUser,
        process.env.JWT_SECRET || 'SECRET_KEY',
        { expiresIn: '24h' }
    )

    return { user: newUser, token };
}

export async function loginUser(userData: any) {
    const { email, password } = userData;

    const user = await UserModel.getByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password')
    }

    if (!await bcrypt.compare(password, user.password_hash)) {
        throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'SECRET_KEY',
        { expiresIn: '24h'}
    );

    const { password_hash, ...userWithoutPassword } = user;

    return {user: userWithoutPassword, token}
}
