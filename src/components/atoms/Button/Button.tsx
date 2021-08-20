import React, {
  FC, HTMLProps, useEffect, useRef, useState
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
  /** Условие, по которому кнопка нажата */
  pressedCondition?: boolean;
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

  const pressedClass = pressed || pressedCondition ? 'rf-button--pressed' : '';
  const colorClass = buttonType === 'text' ? `rf-button--text-${textColor}` : '';

  // -------------------------------------------------------------------------------------------------------------------

  const [minWidth, setMinWidth] = useState(32);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        const { width } = ref.current.getBoundingClientRect();
        setMinWidth(width);
      }
    });
  }, [props.children]);


  // -------------------------------------------------------------------------------------------------------------------

  return (

    <button
      { ...props }
      ref={ ref }
      type={ type }
      style={ { minWidth: `${minWidth}px` } }
      onMouseDown={ onMouseDown }

      className={ `rf-button ${classesMap[buttonType]} ${sizeClass[size]} ${widthClass} ${pressedClass} ${props.className || ''} ${colorClass} ${roundClass}` }>
      { preloader === undefined ? props.children : preloader ? <Preloader size='s' variant='white'/> : props.children }

    </button>
  );
};

export default Button;
