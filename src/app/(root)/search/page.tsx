import { getUser } from "@/actions/user.action";
import { SearchBarMobile } from "@/components/shared";
import { getSession } from "@/hooks/getSession";

const SearchPage = async () => {
  const { userId } = getSession();
  const user = await getUser(userId);

  return (
    <div className="wrapper flex flex-col bg-white rounded-md shadow-md p-2">
      <SearchBarMobile currentUser={user} />
    </div>
  );
};

export default SearchPage;
