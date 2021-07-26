import React, { ReactNode } from 'react';
import './Hint.scss';
import { VariantClassic } from '../../../types';
export interface IHintProps {
    /** основное сообщение*/
    children?: ReactNode;
    title?: ReactNode;
    button?: ReactNode;
    className?: string;
    variant?: VariantClassic;
    icon?: 'info';
    maxWidth?: string;
}
declare const Hint: React.FC<IHintProps>;
export default Hint;
