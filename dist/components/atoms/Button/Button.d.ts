import { FC, HTMLProps } from 'react';
import { Size } from '../../../types';
import './Button.scss';
export declare type ButtonType = 'primary' | 'light' | 'secondary' | 'ghost' | 'danger' | 'icon' | 'text';
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
declare const Button: FC<IButtonProps>;
export default Button;
