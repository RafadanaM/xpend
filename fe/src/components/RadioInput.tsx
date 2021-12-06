interface RadioInputI {
  value: string;
  selected: string;
  onChange: Function;
  label: string;
}
const RadioInput = ({ value, selected, onChange, label }: RadioInputI) => {
  return (
    <label>
      <input
        className="focus:ring-0 focus:ring-offset-0 focus:text-primary transform scale-90"
        type="radio"
        checked={selected === value}
        onChange={() => onChange(value)}
      />
      <span className=" ml-1 text-xs">{label}</span>
    </label>
  );
};

export default RadioInput;
