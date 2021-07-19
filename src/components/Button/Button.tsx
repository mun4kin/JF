import React, { FC, HTMLProps } from 'react';
import { Size } from '../../types';
import { sizeClass } from '../../utils/helpers';
import './Button.scss';

export type ButtonType = 'primary' | 'light' | 'secondary' | 'ghost' | 'danger' | 'success' | 'icon' | 'textPrimary' | 'textSecondary';

export interface IButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  /** Внешний вид */
  buttonType?: ButtonType;
  /** Тип */
  type?: 'button' | 'submit' | 'reset';
  /** Размер */
  size?: Size;
  /** Прелоудер */
  preloader?: boolean;
  /** 100% ширина */
  fullWidth?: boolean;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  size = 'medium',
  fullWidth = false,
  buttonType = 'primary',
  preloader,
  ...props
}: IButtonProps) => {

  const classesMap: Record<ButtonType, string> = {
    primary: 'rf-button--primary',
    light: 'rf-button--light',
    secondary: 'rf-button--secondary',
    ghost: 'rf-button--ghost',
    danger: 'rf-button--danger',
    success: 'rf-button--success',
    icon: 'rf-button--icon',
    textPrimary: 'rf-button--textPrimary',
    textSecondary: 'rf-button--textSecondary',
  };

  const widthClass = fullWidth ? 'rf-button__full-width' : '';

  // -------------------------------------------------------------------------------------------------------------------

  return (

    <button
      { ...props }
      type={ type }
      className={ `rf-button ${classesMap[buttonType]} ${sizeClass[size]} ${widthClass} ${props.className || ''}` }>
      { preloader === undefined ? props.children : preloader ? <div>loading...</div> : props.children }
    </button>
  );
};

export default Button;
