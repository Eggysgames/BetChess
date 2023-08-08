import GridButton from "./GridButton";

type Props = {
  options: {
    key: string;
    line1: string;
    line2?: string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

const GridButtonSet = ({ options, value, onChange }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => (
        <GridButton
          key={option.key}
          line1={option.line1}
          line2={option.line2}
          selected={value === option.key}
          onClick={() => onChange(option.key)}
        />
      ))}
    </div>
  );
};

export default GridButtonSet;
