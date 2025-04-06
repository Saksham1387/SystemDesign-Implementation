import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db/db";
import { getServerSession } from "next-auth";

export const getSessionWithUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No Session found");
    throw new Error("The user is not logged in, can't find the session");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email!,
    },
  });
  return { session, user };
};
