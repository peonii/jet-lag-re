import { db } from "./db";
import { userRouter } from "./routers/user";
import t from "./trpc"

export const appRouter = t.router({
    user: userRouter
});

export type AppRouter = typeof appRouter;