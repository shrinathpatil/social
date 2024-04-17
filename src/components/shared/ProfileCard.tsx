import Image from "next/image";
import Link from "next/link";
import ProfileLinks from "./ProfileLinks";

const ProfileCard = () => {
  return (
    <div className="  w-full max-sm:hidden max-lg:max-w-[100px] max-w-[290px] h-[500px] bg-white rounded-md overflow-hidden border border-gray-200">
      <div className="bg-coverImage bg-cover bg-no-repeat bg-center  h-[72px] relative">
        <Link
          href="/profile"
          className="bg-white rounded-full absolute -bottom-[25px] left-8 cursor-pointer z-[3] p-0.5"
        >
          <Image
            src="/assets/icons/Avatar.png"
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full "
          />
        </Link>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <div className="p-2 flex flex-col gap-y-1 max-lg:hidden">
          <h2 className="text-neutral-700 font-bold ">shdgjdfdgjgdhgjghjg</h2>
          <p className="text-gray-400 text-ellipsis">Bio</p>
        </div>
        <ProfileLinks />
      </div>
    </div>
  );
};

export default ProfileCard;
