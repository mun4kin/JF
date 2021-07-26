import { FC, HTMLProps, ReactNode } from 'react';
import './Input.scss';
export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
    /** Возможность очистки поля по клику */
    onClear?: () => void;
    /** Дебаунс */
    debounce?: number;
    /** Иконка */
    icon?: ReactNode;
}
declare const Input: FC<IInputProps>;
export default Input;
