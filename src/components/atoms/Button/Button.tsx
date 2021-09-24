import React, {
  FC, HTMLProps, ReactNode
} from 'react';
import { Size, VariantClassic } from '../../../types';
import { sizeClass } from '../../../utils/helpers';
import './Button.scss';
import Preloader from '../Preloader';

export type ButtonType =
  'primary'
  | 'light'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'icon'
  | 'iconFill'
  | 'text'
  | 'white';

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
  /** цвет шрифта ТЕКСТОВОЙ кнопки */
  textColor?: VariantClassic;
  /** Круглая кнопка */
  round?: boolean;
  /**
   * Условие, по которому кнопка нажата
   * @deprecated
   */
  pressedCondition?: boolean;
  /** Контент для вставки в начало кнопки */
  startAdornment?: ReactNode;
  /** Контент для вставки в конец кнопки */
  endAdornment?: ReactNode;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  size = 'm',
  fullWidth = false,
  buttonType = 'primary',
  preloader,
  textColor = 'default',
  round = false,
  pressedCondition,
  children,
  startAdornment,
  endAdornment,
  ...props
}: IButtonProps) => {

  const classesMap: Record<ButtonType, string> = {
    primary: 'rf-button--primary',
    light: 'rf-button--light',
    secondary: 'rf-button--secondary',
    ghost: 'rf-button--ghost',
    danger: 'rf-button--danger',
    icon: 'rf-button--icon',
    iconFill: 'rf-button--iconFill',
    text: 'rf-button--text',
    white: 'rf-button--white',
  };

  const widthClass = fullWidth ? 'rf-button__full-width' : '';
  const roundClass = round ? 'rf-button--round' : '';
  const colorClass = buttonType === 'text' ? `rf-button--text-${textColor}` : '';

  return (

    <button
      { ...props }
      type={ type }
      className={ `rf-button ${classesMap[buttonType]} ${sizeClass[size]} ${widthClass} ${props.className || ''} ${colorClass} ${roundClass}` }
    >
      <div data-testid='rf-button__content' className={`rf-button__content ${preloader ? 'rf-button__content--hidden' : ''}`}>
        {!!startAdornment && <div className='rf-button__adornment rf-button__adornment--start'>{startAdornment}</div>}
        {!!children && <div className='rf-button__text'>
          {children}
        </div>}
        {!!endAdornment && <div className='rf-button__adornment rf-button__adornment--end'>{endAdornment}</div>}
      </div>
      {!!preloader && <Preloader size='s' variant='inherit'/>}
    </button>
  );
};

export default Button;
