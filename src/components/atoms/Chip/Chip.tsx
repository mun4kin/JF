import React, { ReactNode } from 'react';
import './Chip.scss';
import { Size } from '../../../types';
import { Close } from '../../../assets/icons/index';
import { sizeClass } from '../../../utils/helpers';

export interface ITagProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  size?: Size;
  type?: 'primary' | 'secondary' | 'outline';
}

const Chip: React.FC<ITagProps> = ({ children, onClick, onRemove, size = 'm', type = 'primary' }: ITagProps) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick && onClick();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove && onRemove();
  };

  // -------------------------------------------------------------------------------------------------------------------

  const clickableClass = onClick ? 'rf-chip--clickable' : '';

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-chip rf-chip--${type} ${clickableClass} ${sizeClass[size]}`} onClick={handleClick}>
      {children}
      {onRemove && <div className='rf-chip__remove' onClick={handleRemove}>
        <Close/>
      </div>}
    </div>
  );
};

export default Chip;
