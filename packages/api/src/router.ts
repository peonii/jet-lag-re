import { db } from "./db";
import { teamRouter } from "./routers/team";
import { userRouter } from "./routers/user";
import t from "./trpc"

export const appRouter = t.router({
    user: userRouter,
    team: teamRouter
});

export type AppRouter = typeof appRouter;