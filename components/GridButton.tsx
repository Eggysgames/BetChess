import clsx from "clsx";

type Props = {
  line1: string;
  line2?: string;
  selected: boolean;
  onClick: () => void;
};

const GridButton = ({ line1, line2, selected, onClick }: Props) => {
  return (
    <button
      className={clsx(
        "text-white space-y-2 text-2xl rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8",
        {
          "bg-slate-500": selected,
          "hover:bg-slate-700 bg-slate-800": !selected,
        }
      )}
      onClick={onClick}
    >
      <div>{line1}</div>
      <div>{line2}</div>
    </button>
  );
};

export default GridButton;
