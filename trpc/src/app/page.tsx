"use client"

import { trpc } from "@/lib/utils/trpc";

export default function TrpcDemo() {
  const { data, isLoading } = trpc.user.findUserBySession.useQuery()

  if (isLoading) return <div>Loading...</div>;
  return <div>Message: {data}</div>;
}

