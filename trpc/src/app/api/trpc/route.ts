import { createTrpcContext } from "@/trpc/context";
import { appRouter } from "@/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTrpcContext({ req }),
  });

export { handler as GET, handler as POST };
