import { getUseById } from "@/lib/server-only/user/get-user-by";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  findUserBySession: publicProcedure.query(async ({ ctx }) => {
    const id = ctx.user?.id;
    if (!id) {
      throw new Error("Unauthorized: No user session found");
    }
    return await getUseById({ id });
  }),
});
