import React, { ReactNode } from 'react';
import './Hint.scss';
import { VariantClassic } from '../../../types';


import { ReactComponent as InfoSolid } from '@openvtb/admiral-icons/build/service/InfoSolid.svg';
export interface IHintProps {
 /** основное сообщение*/

  children?: ReactNode|string;
  title?:ReactNode|string;
  button?:ReactNode;
  className?: string;
  variant?: VariantClassic;
  icon?:'info';
  maxWidth?:string;

}


const Hint: React.FC<IHintProps> = ({
  children = 'Текстовое сообщение',
  button,
  className = '',
  variant = 'default',
  icon,
  title = 'Заголовок сообщения',
  maxWidth = '648px',

}: IHintProps) => {


  return (
    <div style={{ maxWidth }} className={`rf-hint__wrapper rf-hint__${variant} ${className} `}>
      {icon === 'info' &&
          <div className='rf-hint__icon'>
            <InfoSolid/>
          </div>
      }
      <div className='rf-hint__body'>
        <div className='rf-hint__title-text'>   {title}</div>
        <div className='rf-hint__message'> {children} </div>
        {!!button && button}
      </div>
    </div>
  );
};


export default Hint;
