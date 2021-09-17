import React, { FC, useState } from 'react';
import './StatusPicker.scss';


export interface IPickerProps extends React.MouseEvent<HTMLElement> {
  /** Получить значение оценки*/
  getRate?: (value: string) => number | void
}


const StatusPicker: FC<IPickerProps> = ({ getRate = () => { },
  ...props }: IPickerProps) => {

  const [statusValue, setStatus] = useState(0);


  const clickStatusHandler = (e: React.ChangeEvent<HTMLLabelElement>) => {
    if (typeof e?.target?.htmlFor === 'string') {
      setStatus(+e?.target?.htmlFor);
      getRate(status[+e?.target?.htmlFor - 1].value);
    } else {
      setStatus(0);
    }
  };

  const status = [
    {
      id: 1,
      value: 'Низкий',
      color: 'low'
    },
    {
      id: 2,
      value: 'Средний',
      color: 'medium'
    },
    {
      id: 3,
      value: 'Высокий',
      color: 'hight'
    }
  ];


  const statusComponent = status.map((item, index) =>
    <div
      key={item.id.toString()}
      className={'rf-rate-picker-item'} >
      <input
        type='radio'
        id={item.id.toString()}
        value={item.value} />
      <label
        className={`rf-label-${statusValue === index + 1 ? item.color : ''}`}
        onClick={clickStatusHandler}
        htmlFor={item.id.toString()}
        {...props}>
        {item.value}
      </label>
    </div >);


  return (
    <div className={'fs-rate-picker'} >
      < div className='fs-rate-picker-items' >
        {statusComponent}
      </ div>
    </div >
  );
};
export default StatusPicker;
