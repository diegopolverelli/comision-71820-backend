import { Router } from 'express';
import { createJuguetes, getJugueteById, getJuguetes } from '../controllers/juguetes.controller.js';
export const router=Router()

router.get('/', getJuguetes)
router.post("/", createJuguetes)
router.get("/:id", getJugueteById )