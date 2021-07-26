import React, {
  FC, InputHTMLAttributes, ReactNode
} from 'react';
import './Radio.scss';
import { Variant } from '../../../types';

export interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Лейбл */
  label: ReactNode;
  /** Значение */
  value: string;
  /** Отображение иконки */
  icon?: boolean;
  /** Вариант */
  variant?: Variant;
}

const Radio: FC<IRadioProps> = ({
  label, value, icon = true, ...props
}: IRadioProps) => {
  /** Отображение иконки */
  const withIcon = icon ? (
    <span className='rf-radio__circle'>
      <span className='rf-radio__mark'/>
    </span>
  ) : (
    ''
  );

  return (
    <label className={`rf-radio ${props.className || ''} ${props.disabled ? 'disabled' : ''}`}>
      <input {...props} type='radio' className='rf-radio__input' value={value} />

      {withIcon}

      <span className='rf-radio__label'>{label}</span>
    </label>
  );
};

export default Radio;
