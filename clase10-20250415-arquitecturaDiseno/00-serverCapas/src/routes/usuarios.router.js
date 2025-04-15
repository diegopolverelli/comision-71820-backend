import { Router } from 'express';
import UsuariosController from '../controllers/usuarios.controller.js';
export const router=Router()

router.get('/', UsuariosController.getUsuarios)
router.post("/", UsuariosController.createUsuario)
router.get("/:id", UsuariosController.getUserById)