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
        type="radio"
        checked={selected === value}
        onChange={() => onChange(value)}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioInput;
