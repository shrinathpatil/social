import Image from "next/image";

const Loader = () => {
  return (
    <div className="w-full h-[250px] flex flex-col items-center justify-center">
      <Image
        src="/assets/icons/Logomark.svg"
        alt="loading"
        width={100}
        height={100}
        className="animate-pulse"
      />
    </div>
  );
};

export default Loader;
