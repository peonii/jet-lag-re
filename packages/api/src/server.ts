import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter } from "./router";

const createContext = ({
    req, res
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const app = express();

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
        onError: console.log
    }),
);

app.listen(5678, () => {
    console.log('Listening on http://localhost:5678');
}) 