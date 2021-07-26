import { FC, InputHTMLAttributes, ReactNode } from 'react';
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
declare const Radio: FC<IRadioProps>;
export default Radio;
