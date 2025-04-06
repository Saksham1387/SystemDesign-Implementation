import { router } from "./trpc";
import { userRouter } from "./user-rotuer/router";

export const appRouter = router({
    user:userRouter
})

export type AppRouter = typeof appRouter;