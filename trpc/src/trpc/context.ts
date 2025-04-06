import { getSessionWithUser } from "@/lib/auth-utils";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import { NextRequest } from "next/server";

export type TrpcContext = {
  session: Session | null;
  user: User | null;
  req: NextRequest;
};

export const createTrpcContext = async (opts: {
  req: NextRequest;
}): Promise<TrpcContext> => {
  const { req } = opts;

  const { session, user } = await getSessionWithUser();

  if (!session || !user) {
    return {
      session: null,
      user: null,
      req,
    };
  }
  return {
    session,
    user,
    req,
  };
};
