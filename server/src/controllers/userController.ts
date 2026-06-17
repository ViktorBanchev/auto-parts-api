import { Router, type Request, type Response } from "express";
import { loginUser, registerUser } from "../services/userService.js";

const userController = Router();

userController.post('/register', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const { user, token } = await registerUser(data);

        res.cookie('token', token, {
            sameSite: 'lax',
            secure: false,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: 'Successful register',
            user
        })
    } catch (error: any) {
        if (error.message === 'User already exist') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({
            message: "Server error during register"
        });
    }
});

userController.post('/login', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const { user, token } = await loginUser(data);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Successful login',
            user
        })
    } catch (error: any) {
        if (error.message === 'Invalid email or password') {
            return res.status(401).json({ message: error.message }); // 401 Unauthorized
        }

        res.status(500).json({ message: "Server error during login" });
    }
});

userController.post('/logout', async (req: Request, res: Response): Promise<any> => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    res.status(200).json({ message: "Successful logout" });
});

export default userController;