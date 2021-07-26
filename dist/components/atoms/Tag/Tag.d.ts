import React, { ReactNode } from 'react';
import './Tag.scss';
import { Variant } from '../../../types';
export interface ITagProps {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
    onRemove?: () => void;
    disabled?: boolean;
    variant?: Variant;
}
declare const Tag: React.FC<ITagProps>;
export default Tag;
