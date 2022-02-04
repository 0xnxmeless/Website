import { Router, Request, Response } from "express";
import prisma from "../db";
import { Skill } from "@prisma/client";
import { User, ExplicitTypesOnFields } from "../middleware";

const router = Router();

router.post(
    "/",
    User,
    ExplicitTypesOnFields([
        {
            name: "name",
            type: "string",
        },
        {
            name: "summary",
            type: "string",
        },
        {
            name: "description",
            type: "string",
        },
        {
            name: "repository",
            type: "string",
        },
        {
            name: "skills",
            type: "object",
        },
    ]),
    async (req: Request, res: Response) => {
        if (!req.body)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.InvalidRequestBody],
            });

        const { name, summary, description, repository, skills } = req.body;

        if (!name || !summary || !description || !repository)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.MissingRequiredFields],
            });
        
        const errors = [];

        if (name.length > 50) errors.push(ResponseMessage.ProjectNameTooLong);

        if (summary.length > 500)
            errors.push(ResponseMessage.ProjectSummaryTooLong);

        if (description.length > 15000)
            errors.push(ResponseMessage.ProjectDescriptionTooLong);

        if (repository.length > 500)
            errors.push(ResponseMessage.ProjectRepositoryTooLong);

        if (errors.length > 0)
            return res.status(400).json({
                success: false,
                errors,
            });

        let skillsArray: Skill[] = [];

        skills.forEach(async (skillId: string) => {
            const skill = await prisma.skill.findUnique({
                where: {
                    uuid: skillId,
                },
            });

            if (skill) skillsArray.push(skill);
        });

        
    }
);

export default router;
