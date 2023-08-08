import Link from "next/link";

type GridProps = {
  inserttext: string
  inserttext2?: string
}
type DefaultProps = {
  inserttext: string
  link:string
}

type StyledProps = {
  inserttext: string
  link:string
  colour:string
  hover:string
  textsize:string
}

export const GridButton = ({inserttext, inserttext2}:GridProps) => {
  return (
    <button className={`text-white text-2xl bg-slate-800 focus:bg-slate-500 rounded-lg hover:bg-slate-700 shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8`}>
      <div className="mb-2">{inserttext}</div>
      <div>{inserttext2}</div>
    </button>
  );
};


export const DefaultButton = ({inserttext, link}:DefaultProps) => {
  return (
    <Link className={`bg-teal-500 hover:bg-teal-700 text-2xl inline-block text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`} href={link}>
      {inserttext}
    </Link>
  );
};


export const StyledButton = ({ inserttext, link, colour, hover, textsize }: StyledProps) => {
  return (
    <Link className={`${colour} ${hover} ${textsize} whitespace-nowrap inline-block text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`} href={link}>
      {inserttext}
    </Link>
  );
};



export default StyledButton

