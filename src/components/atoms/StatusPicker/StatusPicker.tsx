import React, { FC, useState } from 'react';
import './StatusPicker.scss';


export interface IPickerProps extends React.MouseEvent<HTMLElement> {
  /** Получить значение оценки*/
  getRate?: (value: number, arr: string[][], pos: number) => number | void

  pickedValues: Array<Array<string>>
  position: number
}


const StatusPicker: FC<IPickerProps> = ({ getRate = () => { }, pickedValues, position,
  ...props }: IPickerProps) => {

  const [statusValue, setStatus] = useState(0);

  const clickStatusHandler = (selectIndex: number) => (e: React.ChangeEvent<HTMLLabelElement>) => {
    const res = +e?.target?.htmlFor;
    console.log(pickedValues);

    const newArr = pickedValues.map((pv, index) => {

      if (index === selectIndex) {
        pv = pv.map((a, i) => res - 1 === i ? a = '0' : 'X');
        return pv;
      }

      return pv = pv.map((a, i) => res - 1 === i ? a = 'X' : a);


    });
    setStatus(+e?.target?.htmlFor);
    getRate(res, newArr, position);

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
    /*   console.log(statusArray); */

    return <div
      key={item.id.toString()}
      className={'rf-rate-picker-item'} >
      <input
        type='radio'
        id={item.id.toString()}
        value={item.value} />
      <label
        className={`rf-label-${pickedValues[position][index] !== '' ? pickedValues[position][index] === '0' ? item.color : 'disabled' : ''}`}
        onClick={pickedValues[position][index] === '' || pickedValues[position][index] === '0' ? clickStatusHandler(position) : null}
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
