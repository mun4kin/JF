import React, { ReactNode } from 'react';
import './Hint.scss';
import { VariantClassic } from '../../../types';


import { ReactComponent as InfoSolid } from '@openvtb/admiral-icons/build/service/InfoSolid.svg';
import Button from '../Button';
export interface IHintProps {
 /** основное сообщение*/

  children?: ReactNode;
  title?:ReactNode;
  button?:ReactNode;
  className?: string;
  variant?: VariantClassic;
  icon?:'info';
  maxWidth?:string;

}


const Hint: React.FC<IHintProps> = ({
  children = 'Текстовое сообщение',
  button = <Button buttonType='text' >Text Button</Button>,
  className = '',
  variant = 'default',
  icon = 'info',
  title = 'Заголовок сообщения',
  maxWidth = '648px',

}: IHintProps) => {

  // const wrapper = useRef<HTMLDivElement>(null);


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
