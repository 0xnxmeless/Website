import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.use((_req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        errors: [ResponseMessage.RouteNotFound],
    });
    return next();
});

export default router;
