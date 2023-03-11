import { z } from 'zod';
import { db } from '../db';
import t from '../trpc';
import crypto from 'node:crypto';
import argon2 from 'argon2';

export const userRouter = t.router({
    getAll: t.procedure
        .query(async req => {
            const users = await db.user.findMany();

            return users;
        }
    ),
    login: t.procedure
        .input(
            z.object({
                name: z.string(),
                password: z.string(),
            })
        )
        .mutation(async req => {
            console.log('hit')
            const sessionId = crypto.randomBytes(48).toString('base64url');

            //const hashedPassword = await argon2.hash(req.input.password);
            const hashedPassword = req.input.password;

            const user = await db.user.findFirst({
                where: {
                    name: req.input.name,
                    password: hashedPassword
                }
            });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    sids: {
                        push: sessionId
                    }
                }
            })

            return sessionId;
        }),
    self: t.procedure
        .input(
            z.object({
                sid: z.string()
            })
        )
        .query(async req => {
            const user = await db.user.findFirst({
                where: {
                    sids: {
                        has: req.input.sid
                    }
                }
            });

            if (!user) {
                throw new Error('Invalid session');
            }

            return user;
        })
});