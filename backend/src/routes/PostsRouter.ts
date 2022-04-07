import { Router, Request, Response } from "express";
import prisma from "../db";
import { ExplicitStrings, User } from "../middleware";

const router = Router();
router.use(ExplicitStrings);

router.post("/", User, async (req: Request, res: Response) => {
    if (!req.body)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidRequestBody],
        });

    const { title, content, thumbnail } = req.body;

    if (!title || !content)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.MissingRequiredFields],
        });

    const errors = [];

    if (title.length > 150) errors.push(ResponseMessage.PostTitleTooLong);
    if (content.length > 5000) errors.push(ResponseMessage.PostContentTooLong);

    if (thumbnail && thumbnail.length > 200)
        errors.push(ResponseMessage.PostThumbnailTooLong);

    if (errors.length > 0)
        return res.status(400).json({
            success: false,
            errors,
        });

    const post = await prisma.post.create({
        data: {
            title,
            author: req.user.uuid,
            content,
            thumbnail: thumbnail ?? null,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.PostCreateSuccess,
        data: post,
    });
});

router.get("/:uuid", async (req: Request, res: Response) => {
    const { uuid } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            uuid,
        },
    });

    if (!post)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.PostNotFound],
        });

    return res.json({
        success: true,
        code: ResponseMessage.PostRetrieveSuccess,
        data: post,
    });
});

router.delete("/:uuid", User, async (req: Request, res: Response) => {
    const { uuid } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            uuid,
        },
    });

    if (!post)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.PostDeleteSuccess],
        });

    if (post.author !== req.user.uuid)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.NoPermission],
        });

    await prisma.post.delete({
        where: {
            uuid,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.PostDeleteSuccess,
    });
});

router.put("/:uuid", User, async (req: Request, res: Response) => {
    if (!req.body)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.InvalidRequestBody],
        });

    const { uuid } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            uuid,
        },
    });

    if (!post)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.PostNotFound],
        });

    if (post.author !== req.user.uuid)
        return res.status(400).json({
            success: false,
            errors: [ResponseMessage.NoPermission],
        });

    const { title, content, thumbnail } = req.body;

    if (!title && !content && !thumbnail)
        return res.status(400).json({
            success: false,
            errors: ResponseMessage.NoFieldsToUpdate,
        });

    const errors = [];
    if (title && title.length > 150)
        errors.push(ResponseMessage.PostTitleTooLong);
    if (content && content.length > 5000)
        errors.push(ResponseMessage.PostContentTooLong);
    if (thumbnail && thumbnail.length > 200)
        errors.push(ResponseMessage.PostThumbnailTooLong);

    if (errors.length > 0)
        return res.status(400).json({
            success: false,
            errors,
        });

    const updatedPost = await prisma.post.update({
        where: {
            uuid,
        },
        data: {
            title: title ?? post.title,
            content: content ?? post.content,
            thumbnail: thumbnail ?? post.thumbnail,
        },
    });

    return res.json({
        success: true,
        code: ResponseMessage.PostUpdateSuccess,
        data: updatedPost,
    });
});

router.get("/", async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany();

    return res.json({
        success: true,
        data: posts,
    });
});

export default router;
