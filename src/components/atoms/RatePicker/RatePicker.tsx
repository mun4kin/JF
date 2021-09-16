import React, {
  FC, InputHTMLAttributes, useState, useEffect
} from 'react';
import './RatePicker.scss';


export type PickerType =
  'primary'
  | 'tertiary';

export interface IPickerProps extends InputHTMLAttributes<HTMLLabelElement> {

  /** Величина диапазона*/
  sizePicker?: number
  /** Заданное значение выбранного диапазона*/
  defaultPickedValue?: number
  /** Включить диапазон*/
  isActive?: boolean

  /** Текст контента диапазона*/
  textContent?: string,
  /** Нижнее подчеркивание*/
  isUnderline?: boolean

  /** Реверсировать поярдок диапазона*/
  isReverse?: boolean
  /** Получить значение оценки*/
  getRate?: (value: string) => number | void
}


const RatePicker: FC<IPickerProps> = ({ isActive = true, defaultPickedValue = 0, getRate = () => { }, sizePicker = 10, textContent = '', isUnderline = true, isReverse = false, ...props }: IPickerProps) => {

  const [rating, setRating] = useState(defaultPickedValue);

  useEffect(() => {
    setRating(defaultPickedValue);
  }, [defaultPickedValue, isActive]);


  if (sizePicker < 1) {
    sizePicker = 1;
  }

  const clickRateHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (typeof e?.currentTarget?.textContent === 'string') {
      isActive && setRating(+e.currentTarget.textContent);
      getRate(e.currentTarget.textContent);
    } else {
      setRating(0);
    }
  };

  const rates = Array.from(Array(sizePicker), (_, index) => index + 1);
  const rateComponent = rates.map((item) =>
    <div
      key={item.toString()}
      className={`rf-rate-picker-item
       ${isReverse && item === 1 ? 'rf-rate-picker-item-rounded-right' : ''}
         ${isReverse && rates.length === item ? 'rf-rate-picker-item-rounded-left' : ''}
          ${!isReverse && item === 1 ? 'rf-rate-picker-item-rounded-left' : ''} 
          ${!isReverse && rates.length === item ? 'rf-rate-picker-item-rounded-right' : ''}`} >
      <input
        type='radio'
        id={`input-${item}`}
        value={item} />
      <label
        className={+rating >= item && !isReverse ?
          `rf-rate-picked-${isActive ?
            'primary' :
            'tertiary'}` :
          isReverse && +rating <= item ?
            `rf-rate-picked-${isActive ?
              'primary' :
              'tertiary'}` :
            ''}
        onClick={clickRateHandler}
        htmlFor={`input-${item}`}
        {...props}>
        {item}
      </label>
    </div >);

  if (isReverse) {
    rates.reverse();
  }


  return (
    <div className={isUnderline ? 'fs-rate-picker' : ''} >
      <p className='fs-rate-content'>{textContent}</p>
      <div className='fs-rate-picker-items'>
        {rateComponent}
      </div>

    </div >
  );
};
export default RatePicker;
