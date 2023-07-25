import Link from "next/link";

type BasicProps = {
  inserttext: string
  link:string
}

type Props = {
  inserttext: string
  link:string
  colour:string
  hover:string
  textsize:string
}


export const DefaultButton = ({inserttext, link}:BasicProps) => {
  return (
    <Link className={`bg-teal-500 hover:bg-teal-700 hover:rounded-xl transition-all duration-100 ease-linear cursor-pointer text-2xl inline-block text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`} href={link}>
      {inserttext}
    </Link>
  );
};


export const StyledButton = ({ inserttext, link, colour, hover, textsize }: Props) => {
  return (
    <Link className={`${colour} ${hover} ${textsize} whitespace-nowrap inline-block text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`} href={link}>
      {inserttext}
    </Link>
  );
};


export default StyledButton

