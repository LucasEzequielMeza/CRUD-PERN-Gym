import  Router  from "express-promise-router";
import { profile, signin, signout, signup } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const router = Router();

router.post('/signin', validateSchema(signinSchema) ,signin)

router.post('/signup', validateSchema(signupSchema), signup)

router.post('/signout', signout)

router.get('/profile', isAuth(['admin', 'client']), profile)

export default router;