import Link from "next/link";

type DefaultProps = {
  inserttext: string;
  link: string;
};

type StyledProps = {
  inserttext: string;
  link: string;
  colour: string;
  hover: string;
  textsize: string;
};

export const DefaultButton = ({ inserttext, link }: DefaultProps) => {
  return (
    <Link
      className={`bg-teal-500 hover:bg-teal-700 text-2xl inline-block text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`}
      href={link}
    >
      {inserttext}
    </Link>
  );
};

export const StyledButton = ({
  inserttext,
  link,
  colour,
  hover,
  textsize,
}: StyledProps) => {
  return (
    <Link
      className={`${colour} ${hover} ${textsize} whitespace-nowrap inline-block text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`}
      href={link}
    >
      {inserttext}
    </Link>
  );
};

export default StyledButton;
