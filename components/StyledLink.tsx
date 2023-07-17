import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type Props = LinkProps & {
  children: ReactNode;
};

const StyledLink = (props: Props) => {
  return (
    <Link className="bg-teal-800/90 hover:bg-teal-950/90 text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg text-2xl"
      {...props}
    >
      {props.children}
    </Link>
  );
};

export default StyledLink;

