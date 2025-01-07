import { ChangeEvent } from 'react';

interface OrientationSwitchProps {
  isHorizontal: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const OrientationSwitch = ({ isHorizontal, onChange }: OrientationSwitchProps) => {
  return (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={isHorizontal}
        onChange={onChange}
      />
      <span className="slider"></span>
      <span className="label-text">{isHorizontal ? 'Horizontal' : 'Vertical'}</span>
    </label>
  );
};

export default OrientationSwitch;
