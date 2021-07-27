import React, {
  FC, HTMLProps, useEffect, useState
} from 'react';
import { Size, VariantClassic } from '../../../types';
import { sizeClass } from '../../../utils/helpers';
import './Button.scss';

export type ButtonType =
  'primary'
  | 'light'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'icon'
  | 'text';

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
  textColor?:VariantClassic;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  size = 'm',
  fullWidth = false,
  buttonType = 'primary',
  preloader,
  textColor = 'default',
  ...props
}: IButtonProps) => {

  const classesMap: Record<ButtonType, string> = {
    primary: 'rf-button--primary',
    light: 'rf-button--light',
    secondary: 'rf-button--secondary',
    ghost: 'rf-button--ghost',
    danger: 'rf-button--danger',
    icon: 'rf-button--icon',
    text: 'rf-button--text',
  };

  const widthClass = fullWidth ? 'rf-button__full-width' : '';

  // -------------------------------------------------------------------------------------------------------------------

  const [pressed, setPressed] = useState<boolean>(false);

  /** Состояние pressed */
  const onMouseDown = () => {
    setPressed(true);
  };

  useEffect(() => {
    const onMouseUp = () => {
      setPressed(false);
    };

    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const pressedClass = pressed ? 'rf-button--pressed' : '';
  const colorClass = buttonType === 'text' ? `rf-button--text-${textColor}` : '';

  // -------------------------------------------------------------------------------------------------------------------

  return (

    <button
      { ...props }
      type={ type }
      onMouseDown={ onMouseDown }
      className={ `rf-button ${classesMap[buttonType]} ${sizeClass[size]} ${widthClass} ${pressedClass} ${props.className || ''} ${colorClass}` }>
      { preloader === undefined ? props.children : preloader ? <div>loading...</div> : props.children }
    </button>
  );
};

export default Button;
