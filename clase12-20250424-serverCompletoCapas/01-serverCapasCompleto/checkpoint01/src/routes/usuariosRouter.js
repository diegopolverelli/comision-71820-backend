import { Router } from 'express';
// import { procesaErrores } from '../utils.js';
import { createUser, getUsuarioById, getUsuarios } from '../controllers/usuariosController.js';
export const router=Router()

router.get('/', getUsuarios)
router.get('/:uid', getUsuarioById)
router.post("/", createUser)