import React, { ReactNode } from 'react';
import './Chip.scss';
import { Size } from '../../../types';
import { sizeClass } from '../../../utils/helpers';
import { Close, Download } from '../../../index';

export interface ITagProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
  onRemove?: () => void;
  onDownload?: () => void;
  disabled?: boolean;
  size?: Size;
  type?: 'primary' | 'secondary' | 'outline';
}

const Chip: React.FC<ITagProps> = ({ children, onClick, onRemove, onDownload, size = 'm', type = 'primary' }: ITagProps) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick && onClick();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove && onRemove();
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload && onDownload();
  };

  // -------------------------------------------------------------------------------------------------------------------

  const clickableClass = onClick ? 'rf-chip--clickable' : '';

  // -------------------------------------------------------------------------------------------------------------------
  return (
    <div className={`rf-chip rf-chip--${type} ${sizeClass[size]} ${clickableClass}`} onClick={handleClick}>
      {onDownload && <div className='rf-chip__download' onClick={handleDownload}>
        <Download />
      </div>}
      {children}
      {onRemove && <div className='rf-chip__remove' onClick={handleRemove}>
        <Close/>
      </div>}
    </div>
  );
};

export default Chip;
