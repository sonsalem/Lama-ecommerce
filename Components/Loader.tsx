import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader h-52 flex items-center justify-center flex-col gap-4">
      <Image
        src="/loader.svg"
        alt="loader"
        width={60}
        height={60}
        className="animate-spin"
      />
      Loading...
    </div>
  );
};

export default Loader;
