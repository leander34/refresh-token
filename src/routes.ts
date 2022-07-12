import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticate";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserUseController } from "./useCases/refreshTokenUserUseCase/RefreshTokenUserController";
const router = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserUseController()


router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/refresh-token', refreshTokenUserController.handle)

router.get('/courses', ensureAuthenticated, (req, res) => {
  return res.json([
    {id: 1, course: 'Curso 1'},
    {id: 2, course: 'Curso 2'},
    {id: 3, course: 'Curso 3'},
    {id: 4, course: 'Curso 4'},
    {id: 5, course: 'Curso 5'},
    {id: 6, course: 'Curso 6'},
    {id: 7, course: 'Curso 7'},
  ])
})


export { router }