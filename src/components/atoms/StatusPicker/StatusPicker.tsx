import React, { FC, useState } from 'react';
import './StatusPicker.scss';


export interface IPickerProps extends React.MouseEvent<HTMLElement> {
  /** Получить значение оценки*/
  getRate?: (value: number, pos: number) => number | void

  pickedId: number | number[],
  pickedValues: number[]

  position: number
}


const StatusPicker: FC<IPickerProps> = ({ getRate = () => { }, pickedId = 0, position, pickedValues,
  ...props }: IPickerProps) => {

  const [statusValue, setStatus] = useState(0);


  const clickStatusHandler = (e: React.ChangeEvent<HTMLLabelElement>) => {
    if (typeof e?.target?.htmlFor === 'string') {
      if (pickedValues.find(index => index === +e.target.htmlFor)) {

      } else {
        const res = +e?.target?.htmlFor;
        setStatus(+e?.target?.htmlFor);
        getRate(res, position);
      }

      /*       if (typeof pickedId !== 'number' && pickedId.find(index => index === +e.target.htmlFor)) {
        getRate(+e?.target?.htmlFor, position);
        setStatus(0);
      } else {
        if (statusValue === +e?.target?.htmlFor) {
          console.log('=');

          const res = +e?.target?.htmlFor;
          setStatus(0);
          getRate(res, position);
        } else {
          setStatus(+e?.target?.htmlFor);
          getRate(status[+e?.target?.htmlFor - 1].value, position);
        }

      } */

    } else {
      setStatus(0);
    }
  };

  const status = [
    {
      id: 1,
      value: 1,
      color: 'low',
      name: 'Низкий'
    },
    {
      id: 2,
      value: 2,
      color: 'medium',
      name: 'Средний'
    },
    {
      id: 3,
      value: 3,
      color: 'hight',
      name: 'Высокий'
    }
  ];


  const statusComponent = status.map((item, index) => {


    return <div
      key={item.id.toString()}
      className={'rf-rate-picker-item'} >
      <input
        type='radio'
        id={item.id.toString()}
        value={item.value} />
      <label
        className={`rf-label-${statusValue === index + 1 ?
          item.color :
          pickedValues.find(id => id === item.id) ?
            'disabled' :
            ''}`}
        onClick={clickStatusHandler}
        htmlFor={item.id.toString()}
        {...props}>
        {item.name}
      </label>
    </div >;
  });


  return (
    <div className={'fs-rate-picker'} >
      < div className='fs-rate-picker-items' >
        {statusComponent}
      </ div>
    </div >
  );
};
export default StatusPicker;
