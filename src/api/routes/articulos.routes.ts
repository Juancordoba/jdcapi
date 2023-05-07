const {Router} = require('express');
const router = Router();

import { NextFunction } from 'express';
import { findMany } from '../controllers/Articulos.controller';

// import { findAndCountAll, findOne /*, create, update */ } from '../controllers/articulos.controller'


router.route('/')
.get(autorize, findMany)

function autorize(req:any,res:any,next: any){
   // res.status(500).json('error');
   next();
}

export default router