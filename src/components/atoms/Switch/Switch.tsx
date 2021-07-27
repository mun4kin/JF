import React, {
  FC, ReactNode, useState, useEffect
} from 'react';
import './Switch.scss';
import { Size } from '../../../types';

export interface ISwitchProps {
  onChange?: (f: boolean) => void;
  label?: ReactNode;
  className?: string;
  state?: boolean;
  disable?: boolean;
  size?: Size;
}

const Switch: FC<ISwitchProps> = ({
  label,
  className = '',
  state = false,
  disable = false,
  onChange,
  size = 'm'
}: ISwitchProps) => {
  const [s, toggle] = useState<boolean>(state);

  useEffect(() => {
    toggle(state);
  }, [state]);

  const changeState = () => {
    if (!disable) {
      onChange && onChange(!s);
      toggle(!s);
    }
  };

  return (
    <div className={`rf-switch ${disable ? 'rf-switch--disable' : ''} rf-switch--${size} ${className}`} onClick={changeState}>
      <div className={`rf-switch__toggle ${s ? 'on' : 'off'}`}>
        <div className='rf-switch__circle' />
      </div>
      {label && <p className='rf-switch__label'>{label}</p>}
    </div>
  );
};

export default Switch;
