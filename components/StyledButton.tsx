import Link, { LinkProps } from "next/link";

type Props = {
  inserttext: string
  link:string
  colour:string
  hover:string
  textsize:string
}

const StyledButton = ({ inserttext, link, colour, hover, textsize }: Props) => {
  return (
    <Link className={`${colour} ${hover} ${textsize} text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`} href={link}>
      {inserttext}
    </Link>
  );
};



export default StyledButton;

