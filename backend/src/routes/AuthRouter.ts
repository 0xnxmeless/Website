import { Router, Request, Response } from "express";
import prisma from "../db";
import argon2, { argon2id } from "argon2";
import { ExplicitStrings, User } from "../middleware";
import { daysFromNow, generateSessionToken } from "../utils";

const router = Router();
router.use(ExplicitStrings);

router.post("/login", async (req: Request, res: Response) => {
    if (!req.body)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidRequestBody],
        });

    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.MissingRequiredFields],
        });

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!user)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidCredentials],
        });

    const matches = await argon2.verify(user.password, password, {
        type: argon2id,
    });

    if (!matches)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidCredentials],
        });

    const session = await prisma.session.create({
        data: {
            uuid: user.uuid,
            token: generateSessionToken(),
            expiresAt: daysFromNow(1),
        },
    });

    res.cookie("session", session.token, {
        expires: session.expiresAt,
    });

    return res.json({
        success: true,
        code: ResponseMessage.LoginSuccess,
    });
});

router.get("/logout", User, async (req: Request, res: Response) => {
    await prisma.session.delete({
        where: {
            token: req.session.token,
        },
    });

    res.clearCookie("session");

    return res.json({
        success: true,
        code: ResponseMessage.LogoutSuccess,
    });
});

export default router;
