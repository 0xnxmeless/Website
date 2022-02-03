import { Router, Request, Response } from "express";
import prisma from "../db";
import { User, ExplicitStrings } from "../middleware";

const router = Router();
const badgeColorValidation = /^#(?:[0-9a-f]{3}){1,2}$/i;
router.use(ExplicitStrings);

router.post("/", User, async (req: Request, res: Response) => {
    if (!req.body)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidRequestBody],
        });

    const { name, type, link, imageUrl, badgeColor } = req.body;

    if (!name || !type || !link || !imageUrl || !badgeColor)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.MissingRequiredFields],
        });

    // Validation rules
    const errors = [];
    if (name.length > 100) errors.push(ResponseMessage.SkillNameTooLong);
    if (type.length > 75) errors.push(ResponseMessage.SkillTypeTooLong);
    if (link.length > 100) errors.push(ResponseMessage.SkillLinkTooLong);

    if (imageUrl.length > 300)
        errors.push(ResponseMessage.SkillImageUrlTooLong);

    if (badgeColor.length > 7)
        errors.push(ResponseMessage.SkillBadgeColorTooLong);

    if (!badgeColorValidation.test(badgeColor))
        errors.push(ResponseMessage.InvalidSkillBadgeColor);

    if (errors.length > 0)
        return res.status(400).json({
            success: false,
            errors,
        });

    const skill = await prisma.skill.create({
        data: {
            name,
            type,
            link,
            imageUrl,
            badgeColor,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.SkillCreateSuccess,
        data: skill,
    });
});

router.get("/", async (req: Request, res: Response) => {
    const skills = await prisma.skill.findMany();

    return res.json({
        success: true,
        code: ResponseMessage.SkillRetrieveSuccess,
        data: skills,
    });
});

router.delete("/:uuid", User, async (req: Request, res: Response) => {
    const { uuid } = req.params;

    await prisma.skill.delete({
        where: {
            uuid,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.SkillDeleteSuccess,
    });
});

export default router;
