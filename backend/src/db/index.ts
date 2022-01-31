import { PrismaClient, StudyLevel } from "@prisma/client";
const prisma = new PrismaClient();

declare global {
    namespace Express {
        interface Request {
            user?: {
                uuid: string;
                username: string;
                password: string;
            };
            session?: {
                id: number;
                token: string;
                uuid: string;
                expiresAt: Date;
            };
        }
    }
}

export default prisma;
