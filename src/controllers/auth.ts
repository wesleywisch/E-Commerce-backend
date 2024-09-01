import { FastifyRequest, FastifyReply, } from 'fastify'
import { fastifyJwt } from '@fastify/jwt'
import { prisma } from '../lib/prisma'
import { hashSync, compareSync } from 'bcrypt'
import { z } from 'zod'

export async function signup(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
    })
    
    const {email, password, name} = bodySchema.parse(req.body)

    let user = await prisma.user.findFirst({
        where: {email}
    })

    if (user) {
        throw Error("User already exists!")
    }

    user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10),
        }
    })

    return res.send(user)
}

export async function login(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        email: z.string(),
        password: z.string(),
    })
    
    const {email, password} = bodySchema.parse(req.body)

    let user = await prisma.user.findFirst({
        where: {email}
    })

    if (!user) {
        throw Error("User does not exists!")
    }

    if (!compareSync(password, user.password)) {
        throw Error("Email or Password incorrect!")
    }

    const token = await res.jwtSign({
        userId: user.id,
      }, {
        expiresIn: '10 days',
      })
  
    return res.send({user, token})
}