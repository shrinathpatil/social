import { getSuggestionFriends, getUser } from "@/actions/user.action";
import SuggestedFriends from "./SuggestedFriends";

interface Props {
  userId: string;
}
const SuggestedFriendsCard = async ({ userId }: Props) => {
  const user = await getUser(userId);
  const suggestions = await getSuggestionFriends(userId);

  return <SuggestedFriends suggestions={suggestions} currentUser={user!} />;
};

export default SuggestedFriendsCard;
