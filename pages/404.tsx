import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-32">
        <Image
          src="/brokenhorse.png"
          alt="Broken Horse"
          width={400}
          height={400}
        />
      </div>

      <div className="text-center text-white mt-16 mb-16">
        Oops you hit a dead end :( perhaps you meant to go to the{" "}
        <Link href="/" passHref>
          <span className="text-purple-400 hover:text-purple-700 underline">
            Homepage
          </span>
        </Link>
        {""} instead?
      </div>
    </div>
  );
};

export default NotFound;
