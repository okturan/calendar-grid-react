import { ChangeEvent } from 'react';

interface ToggleSwitchProps {
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
}

const ToggleSwitch = ({ isChecked, onChange, labelText }: ToggleSwitchProps) => {
  return (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={isChecked}
        onChange={onChange}
      />
      <span className="slider"></span>
      <span className="label-text">{labelText}</span>
    </label>
  );
};

export default ToggleSwitch;
