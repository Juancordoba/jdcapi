const {Router} = require('express');
const router = Router();

import { NextFunction } from 'express';
import { findMany } from '../controllers/articulos.controller';

router.route('/')
.get(autorize, findMany)

function autorize(req:any,res:any,next: any){
   next();
}

export default router