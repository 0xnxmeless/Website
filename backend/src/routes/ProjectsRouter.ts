import { Router, Request, Response } from "express";
import prisma from "../db";
import { User, ExplicitTypesOnFields } from "../middleware";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const projects = await prisma.project.findMany({
        select: {
            uuid: true,
            name: true,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.ProjectRetrieveSuccess,
        data: projects,
    });
});

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

        if (!name || !summary || !description || !repository || !skills)
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

        let skillsArray: object[] = [];
        skills.forEach((skillId: string) =>
            skillsArray.push({ uuid: skillId })
        );

        const project = await prisma.project.create({
            data: {
                name,
                summary,
                description,
                repository,
                skills: {
                    connect: skillsArray,
                },
            },
        });

        return res.json({
            success: true,
            code: ResponseMessage.ProjectCreateSuccess,
            data: project,
        });
    }
);

router.put(
    "/:uuid",
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

        if (!name || !summary || !description || !repository || !skills)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.MissingRequiredFields],
            });

        const projectLookup = await prisma.project.findUnique({
            where: {
                uuid: req.params.uuid,
            },
        });

        if (!projectLookup)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.ProjectNotFound],
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

        let skillsArray: object[] = [];
        skills.forEach((skillId: string) =>
            skillsArray.push({ uuid: skillId })
        );

        const project = await prisma.project.update({
            where: {
                uuid: req.params.uuid,
            },
            data: {
                name,
                summary,
                description,
                repository,
                updatedAt: new Date(),
                skills: {
                    connect: skillsArray,
                },
            },
        });

        return res.json({
            success: true,
            code: ResponseMessage.ProjectUpdateSuccess,
            data: project,
        });
    }
);

router.delete("/:uuid", User, async (req: Request, res: Response) => {
    const projectLookup = await prisma.project.findUnique({
        where: {
            uuid: req.params.uuid,
        },
    });

    if (!projectLookup)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.ProjectNotFound],
        });

    await prisma.project.delete({
        where: {
            uuid: req.params.uuid,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.ProjectDeleteSuccess,
    });
});

router.get("/:uuid", (req: Request, res: Response) => {
    const projectLookup = prisma.project.findUnique({
        where: {
            uuid: req.params.uuid,
        },
    });

    if (!projectLookup)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.ProjectNotFound],
        });

    return res.json({
        success: true,
        code: ResponseMessage.ProjectRetrieveSuccess,
        data: projectLookup,
    });
});

export default router;
