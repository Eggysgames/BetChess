import Link, { LinkProps } from "next/link";

type Props = {
  inserttext: string
  link:string
}

const StyledButton = ({ inserttext, link }: Props) => {
  return (
    <Link className="bg-teal-800/90 hover:bg-teal-950/90 text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg text-2xl" href={link}>
      {inserttext}
    </Link>
  );
};

export default StyledButton;

