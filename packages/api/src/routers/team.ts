import { z } from "zod";
import { db } from "../db";
import t from '../trpc';

export const teamRouter = t.router({
    get: t.procedure
        .input(
            z.object({
                id: z.string(),
                sid: z.string()
            })
        )
        .query(async req => {
            const team = await db.team.findFirst({
                where: {
                    id: req.input.id,
                    users: {
                        some: {
                            sids: {
                                has: req.input.sid
                            }
                        }
                    }
                }
            });

            if (!team) {
                throw new Error('Team not found');
            }

            return team;
        }),
    getAll: t.procedure
        .input(
            z.object({
                sid: z.string()
            })
        )
        .query(async req => {
            const teams = await db.team.findMany({
                where: {
                    users: {
                        some: {
                            sids: {
                                has: req.input.sid
                            }
                        }
                    }
                }
            });

            return teams;
        }
    ),
})