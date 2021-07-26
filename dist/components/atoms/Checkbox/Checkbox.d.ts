import React, { FC, InputHTMLAttributes } from 'react';
import './Checkbox.scss';
export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Лейбл */
    label?: React.ReactNode;
    /** Значение */
    value?: string;
    /** Отображение иконки */
    icon?: boolean;
    /** Вертикальное выравнивание */
    align?: 'flex-start' | 'center' | 'flex-end';
    /** Если дочерние чекбоксы чекнуты, флаг равен true */
    halfChecked?: boolean;
    /** Положение чекбокса */
    position?: 'left' | 'right';
    /** Круглый чекбокс */
    round?: boolean;
}
declare const Checkbox: FC<ICheckboxProps>;
export default Checkbox;
