import Pusher from "pusher";

const pusherKey = process.env.NEXT_PUSHER_KEY!;
const cluster = process.env.NEXT_PUSHER_CLUSTER!;
const pusherSecret = process.env.NEXT_PUSHER_SECRET!;
const pusherAppId = process.env.NEXT_PUSHER_APP_ID!;

export const pusher = new Pusher({
  appId: pusherAppId,
  key: pusherKey,
  secret: pusherSecret,
  cluster,
  useTLS: true,
});
