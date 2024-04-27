import { auth } from "@clerk/nextjs";

export const getSession = () => {
  const { sessionClaims } = auth();
  //@ts-ignore
  const userId = sessionClaims?.metadata?.userId;
  return { userId };
};
