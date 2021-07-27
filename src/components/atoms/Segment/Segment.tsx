import React, { HTMLProps, useRef } from 'react';
import { IOption } from '../../../types';
import './Segment.scss';
import Radio from '../Radio';


export interface ISegmentProps extends Omit<HTMLProps<HTMLInputElement>, 'list'> {
  /** Список элементов */
  list: [IOption, IOption];
}

const Segment: React.FC<ISegmentProps> = ({
  list,
  className = '',
  ...props
}: ISegmentProps) => {

  const slider = useRef<HTMLDivElement>(null);
  // -------------------------------------------------------------------------------------------------------------------

  /** Изменение позиции слайдера */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (slider.current) {
      slider.current.style.transform = `translateX(${100 * i}%)`;
    }

    props.onChange && props.onChange(e);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const radioButtons = list.map((o: IOption, i: number) => (
    <div key={o.value} className='rf-segment__item'>
      <Radio
        {...o}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, i)}
        name={props.name || 'defaultSegmentName'}
        checked={props.defaultChecked}
        icon={false}
      />
    </div>
  ));

  return (
    <div className={`rf-segment ${className}`}>
      <div className='rf-segment__list'>
        {radioButtons}
      </div>
      <div className='rf-segment__slider' ref={slider}/>
    </div>
  );
};

export default Segment;
