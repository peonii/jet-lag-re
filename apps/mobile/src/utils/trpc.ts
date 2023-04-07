import { createTRPCReact } from "@trpc/react-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "api";

export const trpc = createTRPCReact<AppRouter>();
export const trpcProxy = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://192.168.0.242:5678/trpc',
        }),
    ]
});