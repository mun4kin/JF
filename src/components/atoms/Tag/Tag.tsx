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

const Tag: React.FC<ITagProps> = ({ children, onClick, onRemove, disabled, variant = 'default' }: ITagProps) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick && onClick();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove && onRemove();
  };

  // -------------------------------------------------------------------------------------------------------------------

  const clickableClass = onClick ? 'rf-tag--clickable' : '';

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-tag ${clickableClass} rf-tag--${variant}`} onClick={handleClick}>
      {children}
      {onRemove && <div className='rf-tag__remove' onClick={handleRemove}>X</div>}
    </div>
  );
};

export default Tag;
