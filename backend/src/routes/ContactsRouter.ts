import { Router, Request, Response } from "express";
import prisma from "../db";
import { User, ExplicitStrings } from "../middleware";

const router = Router();
const iconColorValidation = /^#(?:[0-9a-f]{3}){1,2}$/i;
router.use(ExplicitStrings);

router.post("/", User, async (req: Request, res: Response) => {
    if (!req.body)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidRequestBody],
        });

    const { title, text, link, icon, iconColor } = req.body;

    if (!title || !text || !icon)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.MissingRequiredFields],
        });

    const errors = [];

    if (title.length > 50) errors.push(ResponseMessage.ContactTitleTooLong);
    if (text.length > 100) errors.push(ResponseMessage.ContactTextTooLong);
    if (icon.length > 300) errors.push(ResponseMessage.ContactIconTooLong);

    if (link && link.length > 200)
        errors.push(ResponseMessage.ContactLinkTooLong);

    if (!iconColorValidation.test(iconColor))
        errors.push(ResponseMessage.ContactIconColorInvalid);

    if (errors.length > 0)
        return res.status(400).json({
            success: false,
            errors,
        });

    const contact = await prisma.contact.create({
        data: {
            title,
            text,
            link,
            icon: icon ?? "",
            iconColor: iconColor ?? "",
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.ContactCreateSuccess,
        data: contact,
    });
});

router.get("/", async (req: Request, res: Response) => {
    const contacts = await prisma.contact.findMany();

    return res.json({
        success: true,
        code: ResponseMessage.ContactRetrieveSuccess,
        data: contacts,
    });
});

router.put("/:id", User, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req.body)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidRequestBody],
        });

    const { title, text, link, icon, iconColor } = req.body;

    if (!title && !text && !link && !icon && !iconColor)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.NoFieldsToUpdate],
        });

    const contact = await prisma.contact.findUnique({
        where: {
            id: parseInt(id) ?? 0,
        },
    });

    if (!contact)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.ContactNotFound],
        });

    if (title) {
        if (title.length > 50)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.ContactTitleTooLong],
            });
    }

    if (text) {
        if (text.length > 100)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.ContactTextTooLong],
            });
    }

    if (link) {
        if (link.length > 200)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.ContactLinkTooLong],
            });
    }

    if (icon) {
        if (icon.length > 300)
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.ContactIconTooLong],
            });
    }

    if (iconColor) {
        if (!iconColorValidation.test(iconColor))
            return res.status(400).json({
                success: false,
                errors: [ResponseMessage.ContactIconColorInvalid],
            });
    }

    const updatedContact = await prisma.contact.update({
        where: { id: parseInt(id) ?? 0 },
        data: {
            title: title ?? contact.title,
            text: text ?? contact.text,
            link: link ?? contact.link,
            icon: icon ?? contact.icon,
            iconColor: iconColor ?? contact.iconColor,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.ContactUpdateSuccess,
        data: updatedContact,
    });
});

router.delete("/:id", User, async (req: Request, res: Response) => {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
        where: {
            id: parseInt(id) ?? 0,
        },
    });

    if (!contact)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.ContactNotFound],
        });

    await prisma.contact.delete({
        where: {
            id: parseInt(id) ?? 0,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.ContactDeleteSuccess,
    });
});

export default router;
