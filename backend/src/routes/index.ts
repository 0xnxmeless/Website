import { Router, Request, Response, NextFunction } from "express";
import AuthRouter from "./AuthRouter";
import SkillsRouter from "./SkillsRouter";
import ContactsRouter from "./ContactsRouter";
import ProjectsRouter from "./ProjectsRouter";

const router = Router();
router.use("/auth", AuthRouter);
router.use("/skills", SkillsRouter);
router.use("/contacts", ContactsRouter);
router.use("/projects", ProjectsRouter);

router.use((_req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        errors: [ResponseMessage.RouteNotFound],
    });
    return next();
});

export default router;
