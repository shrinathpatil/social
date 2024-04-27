import { getUser } from "@/actions/user.action";
import { getSession } from "@/hooks/getSession";
import { IUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ProfileLinks from "./ProfileLinks";

const ProfileCard = async () => {
  const { userId } = getSession();
  const user: IUser = await getUser(userId);

  return (
    <div className="shadow-md  w-full max-sm:hidden max-lg:max-w-[100px] max-w-[290px] h-[500px] bg-white rounded-md overflow-hidden border border-gray-100">
      <div
        style={{
          backgroundImage: `url(${
            user?.coverImage || "/assets/icons/Cover.png"
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "72px",
          position: "relative",
        }}
      >
        <Link
          href="/profile"
          className="bg-white rounded-full flex h-[50px] w-[50px] absolute -bottom-[25px] left-8 cursor-pointer z-[3] p-0.5"
        >
          <Image
            src={user?.image!}
            fill
            alt="avatar"
            className="rounded-full object-cover"
          />
        </Link>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <div className="p-2 flex flex-col gap-y-1 max-lg:hidden">
          <h2 className="text-neutral-700 font-bold capitalize">
            {user?.username}
          </h2>
          {user?.profession && (
            <p className="text-gray-400 text-ellipsis capitalize">
              {user.profession}
            </p>
          )}
        </div>
        <ProfileLinks user={user} />
      </div>
    </div>
  );
};

export default ProfileCard;
