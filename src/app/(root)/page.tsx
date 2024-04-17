import { getUser } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const HomePage = async () => {
  const cUser = await currentUser();
  console.log(cUser);
  const user = await getUser(cUser?.id!);
  console.log(user);
  return <div className="">Home</div>;
};

export default HomePage;
