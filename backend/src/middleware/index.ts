import prisma from "../db";
import { Request, Response, NextFunction } from "express";
import { daysFromNow } from "../utils";

const ExplicitStrings = (req: Request, _res: Response, next: NextFunction) => {
    if (!req.body) return next();

    for (const index in req.body) {
        const field = req.body[index];
        if (typeof field !== "string") delete req.body[index];
    }
    return next();
};

type FieldWithType = {
    name: string;
    type:
        | "bigint"
        | "boolean"
        | "function"
        | "number"
        | "object"
        | "string"
        | "symbol"
        | "undefined";
};

const ExplicitTypesOnFields = (fields: FieldWithType[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body) return next();

        for (const field in fields) {
            const fieldName = fields[field].name;
            const fieldType = fields[field].type;

            if (typeof req.body[fieldName] !== fieldType)
                delete req.body[fieldName];
        }
    };
};

const User = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.session;

    if (!token)
        return res.status(401).json({
            success: false,
            errors: [ResponseMessage.InvalidSession],
        });

    const session = await prisma.session.findUnique({
        where: {
            token,
        },
    });

    if (!session)
        return res.status(401).json({
            success: false,
            errors: [ResponseMessage.InvalidSession],
        });

    if (new Date(session.expiresAt) < new Date()) {
        await prisma.session.delete({
            where: {
                token,
            },
        });

        return res.status(401).json({
            success: false,
            errors: [ResponseMessage.ExpiredSession],
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            uuid: session.uuid,
        },
    });

    if (!user) {
        await prisma.session.delete({
            where: {
                token,
            },
        });

        return res.status(401).json({
            success: false,
            errors: [ResponseMessage.SessionUserNotFound],
        });
    }

    const newSession = await prisma.session.update({
        where: {
            token,
        },
        data: {
            expiresAt: daysFromNow(1),
        },
    });

    res.cookie("session", token, {
        expires: newSession.expiresAt,
    });

    req.user = user;
    req.session = session;

    return next();
};

export { ExplicitStrings, ExplicitTypesOnFields, User };
