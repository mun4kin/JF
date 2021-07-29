import React, { useRef } from 'react';
import { IOption } from '../../../types';
import './Segment.scss';


export interface ISegmentProps {
  /** Список элементов */
  list: [IOption, IOption];
  /** Изменение */
  onChange: (option: IOption) => void;
}

const Segment: React.FC<ISegmentProps> = ({
  list,
  onChange
}: ISegmentProps) => {

  const slider = useRef<HTMLDivElement>(null);
  // -------------------------------------------------------------------------------------------------------------------

  /** Изменение позиции слайдера */
  const onClick = (o: IOption, i: number) => {
    if (slider.current) {
      slider.current.style.transform = `translateX(${100 * i}%)`;
    }

    onChange && onChange(o);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const buttons = list.map((o: IOption, i: number) => {
    return (
      <div key={ o.value } className='rf-segment__item' onClick={ () => onClick(o, i) }>
        { o.label }
      </div>
    );
  });

  return (
    <div className='rf-segment'>
      <div className='rf-segment__list'>
        { buttons }
      </div>
      <div className='rf-segment__slider' ref={ slider }/>
    </div>
  );
};

export default Segment;
