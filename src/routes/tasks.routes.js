import { Router } from "express";
import {authRequired} from "../middlewares/validateToken.js"
import { getTask,getTasks,createTask,updateTask,deleteTask } from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemes/task.schema.js";
const router = Router();

router.get("/tasks",authRequired, getTasks)
router.post("/tasks",authRequired,validateSchema(createTaskSchema))
router.delete("/tasks/:id",authRequired,deleteTask)
router.put("/tasks/:id",authRequired,updateTask)
router.get("/tasks/:id",authRequired, getTask)

export default router;