import Link from "next/link";

type GridProps = {
  inserttext: string
  inserttext2?: string
  highlighted:boolean
  onClick:(text:string) => void
}
type DefaultProps = {
  inserttext: string
  link:string
  onClick?: () => void
}

type SubmissionProps = {
  inserttext: string
  onClick?: () => void
}

type StyledProps = {
  inserttext: string
  link:string
  colour:string
  hover:string
  textsize:string
}

export const GridButton = ({ inserttext, inserttext2, highlighted, onClick }: GridProps) => {
  
  const buttonClasses = `${ highlighted ? 'bg-slate-700' : 'bg-slate-800'} text-white text-2xl rounded-lg hover:bg-slate-700 shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8`;

  return (
    <button className={buttonClasses} 
      onClick={() => onClick([inserttext, inserttext2].join(' ').trim())}>
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

export const SubmissionButton = ({ inserttext, onClick }: SubmissionProps) => {
  return (
    <button className={`bg-teal-500 hover:bg-teal-700 text-2xl inline-block text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg`}
      onClick={onClick} 
      >
      {inserttext}
    </button>
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

