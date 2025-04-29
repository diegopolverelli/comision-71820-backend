import { Router } from 'express';
import { OrdenesController } from '../controllers/ordenesController.js';
export const router=Router()

router.get('/', OrdenesController.getOrdenes)
router.post("/", OrdenesController.createOrder)