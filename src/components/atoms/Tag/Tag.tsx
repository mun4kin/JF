import React, { ReactNode } from 'react';
import './Tag.scss';
import { Variant } from '../../../types';


export interface ITagProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
  variant?: Variant;
}

const Tag: React.FC<ITagProps> = ({ children, onClick, variant = 'default' }: ITagProps) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick && onClick();
  };

  const clickableClass = onClick ? 'rf-tag--clickable' : '';

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-tag ${clickableClass} rf-tag--${variant}`} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Tag;
