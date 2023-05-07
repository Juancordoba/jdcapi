import {Request,Response} from 'express'
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

export async function findMany(req:Request, res:Response) {
    const prisma = new PrismaClient()
    const articulos = await prisma.articulos.findMany({  
        skip: 0,
        take: 15
    })
    res.json(articulos)
}
