import React, {
  ReactNode,
  useCallback, useEffect, useRef, useState
} from 'react';
import './Datepicker.scss';
import DatepickerCalendar from './DatepickerCalendar';
import InputMask from 'react-input-mask';
import {
  formatDate, generateMask, getWeekDay, parseToFormat, stringToDate
} from './DatepickerCalendar/datepicker.utils';
import Input from '../Input';
import { DateFormat, IDateVariants } from './DatepickerCalendar/datepicker.types';
import useClickOutside from '../../../hooks/useClickOutside';
import { Calendar } from '../../../index';

export interface IDatepickerProps {
  name?: string;
  placeholder?: string;
  defaultValue?: Date | string | number;
  disabled?: boolean;
  readOnly?: boolean;
  min?: Date | string | number;
  max?: Date | string | number;
  onChange?: (value: IDateVariants, name?: string) => void;
  /** Диапазон */
  range?: boolean;
  /** Показывать день недели в инпуте */
  showDayOfWeek?: boolean;
  /** Локализация */
  locale?: 'ru' | 'en';
  /** Кнопка Сегодня */
  showTodayButton?: boolean;
  position?: 'left' | 'right';
  /** Формат даты */
  format?: DateFormat;
  /** Ограничения на дни недели 0 - 6 */
  disableWeekDays?: number[];
  /** Кастомная кнопка */
  children?: ReactNode | ReactNode[];
}

const Datepicker: React.FC<IDatepickerProps> = ({
  name = 'datepicker',
  locale = 'ru',
  placeholder = locale === 'ru' ? 'Выберите дату' : 'Select date',
  defaultValue,
  min,
  max,
  disabled = false,
  readOnly = false,
  onChange,
  range = false,
  showDayOfWeek = false,
  showTodayButton = true,
  position = 'left',
  format = 'dd.mm.yyyy',
  disableWeekDays = [0, 6],
  children
}: IDatepickerProps) => {
  const separator = format[2];

  const [dayOfWeek, setDayOfWeek] = useState<string[]>([]);

  const [minDate, setMinDate] = useState<Date | undefined>(undefined);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setMinDate(min ? parseToFormat(format, min).date : undefined);
  }, [min]);

  useEffect(() => {
    setMaxDate(max ? parseToFormat(format, max).date : undefined);
  }, [max]);

  // -------------------------------------------------------------------------------------------------------------------

  const datepickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [showCalendar, toggleCalendar] = useState<boolean>(false);
  // -------------------------------------------------------------------------------------------------------------------

  const handleClickOutside = useCallback(() => {
    toggleCalendar(false);
  }, []);

  useClickOutside(datepickerRef, handleClickOutside);

  // -------------------------------------------------------------------------------------------------------------------

  const [inputValue, setInputValue] = useState<string>('');

  const validate = (date: string): string => {
    let result = date;

    if (range) {
      let [from, to] = date.split(' - ');
      let fromD = 0;
      let toD = 0;

      if (from) {
        from = from.slice(0, 10);
      }

      if (to) {
        to = to.slice(0, 10);
      }

      if (from && !from.includes('_')) {
        fromD = stringToDate(from, format).getTime();

        if (minDate && fromD < minDate.getTime()) {
          fromD = minDate.getTime();
        }

        if (maxDate && fromD > maxDate.getTime()) {
          fromD = minDate ? minDate.getTime() : maxDate.getTime();
        }

        from = formatDate(fromD, format).date;
      }

      if (to && !to.includes('_')) {
        toD = stringToDate(to, format).getTime();

        if (toD < fromD) {
          toD = fromD + 24 * 3600 * 1000;
        }

        if (maxDate && toD > maxDate.getTime()) {
          toD = maxDate.getTime();
        }

        to = formatDate(toD, format).date;
      }

      if (from || to) {
        result = [from, to].join(' - ');
      }
    } else {
      const d = stringToDate(date, format);

      if (date !== '' && minDate && d.getTime() < minDate.getTime()) {
        result = formatDate(minDate.getTime(), format).date;
      }

      if (maxDate && d.getTime() > maxDate.getTime()) {
        result = formatDate(maxDate.getTime(), format).date;
      }
    }

    return result;
  };

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    let inputValue = parseToFormat(format, defaultValue).string;

    if (!inputValue.includes('_')) {
      inputValue = validate(parseToFormat(format, defaultValue).string);
    }

    setInputValue(inputValue);
  }, [defaultValue, minDate, maxDate]);

  // -------------------------------------------------------------------------------------------------------------------

  const getReturnValue = (value: string, range: boolean): IDateVariants => {
    if (range) {
      const [from, to] = value.split(' - ');
      const fromD = stringToDate(from, format).getTime();
      const toD = stringToDate(to, format).getTime();
      return {
        value,
        date: {
          from: new Date(fromD),
          to: new Date(toD),
          value: new Date(fromD)
        },
        timestamp: {
          from: fromD,
          to: toD,
          value: fromD
        }
      };
    }

    const date = stringToDate(value, format);
    return {
      date: {
        from: date,
        to: date,
        value: date
      },
      value,
      timestamp: {
        from: date.getTime(),
        to: date.getTime(),
        value: date.getTime()
      }
    };
  };

  const onDatepickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let result = e.target.value;

    if (range || (result.length === 10 && !result.includes('_'))) {
      result = validate(result);
    }

    setInputValue(result);
  };

  const setValue = (value: string) => {
    setInputValue(validate(value));
  };

  useEffect(() => {
    if (!inputValue.includes('_') && inputValue !== '') {
      const result = getReturnValue(inputValue, range);
      onChange && onChange(result, name);
      fireOnChange();
    } else {
      if (showDayOfWeek) {
        setDayOfWeek([]);
      }
    }
  }, [inputValue, showDayOfWeek]);

  const fireOnChange = () => {
    setTimeout(() => {
      if (inputRef.current) {
        const input = inputRef.current.querySelector('input');

        if (input) {

          let event;

          if (typeof (Event) === 'function') {
            event = new Event('change');
          } else {
            event = document.createEvent('Event');
            event.initEvent('change', true, true);
          }

          input.dispatchEvent(event);
        }
      }
    }, 100);
  };

  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (showDayOfWeek) {
      if (!range) {
        if (!inputValue.includes('_') && inputValue !== '') {
          const result = getReturnValue(inputValue, range);
          const dayFrom = result.date.value.getDay();
          setDayOfWeek([getWeekDay(dayFrom, locale)]);
        }
      } else {
        const [fromValue, toValue] = inputValue.split(' - ');


        if (fromValue && !fromValue.includes('_')) {
          const from = getReturnValue(fromValue, false);
          const dayFrom = from.date.from.getDay();
          setDayOfWeek([getWeekDay(dayFrom, locale)]);
        }

        if (toValue && !toValue.includes('_')) {
          const to = getReturnValue(toValue, false);
          const dayTo = to.date.from.getDay();
          setDayOfWeek([...dayOfWeek, getWeekDay(dayTo, locale)]);
        }
      }
    }
  }, [inputValue, showDayOfWeek, range]);

  // -------------------------------------------------------------------------------------------------------------------

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === 'enter' || e.charCode === 13) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  const mask = generateMask(inputValue, format, range, showDayOfWeek, dayOfWeek);

  // -------------------------------------------------------------------------------------------------------------------

  const disabledClass = disabled ? 'rf-datepicker__input-wrapper--disabled' : '';
  const readOnlyClass = readOnly ? 'rf-datepicker__input-wrapper--readonly' : '';

  return (
    <div className='rf-datepicker' ref={ datepickerRef }>
      <div className={ `rf-datepicker__input-wrapper ${disabledClass} ${readOnlyClass}` }
        ref={ inputRef }
        onClick={ () => toggleCalendar(true) }>
        {
          children || (
            <>
              <InputMask
                mask={ mask }
                name={ name }
                placeholder={ placeholder }
                value={ inputValue }
                disabled={ disabled }
                readOnly={ readOnly }
                onKeyPress={ onKeyPress }
                onChange={ onDatepickerChange }>
                <Input/>
              </InputMask>

              <button type='button' className='rf-datepicker__calendar-button'>
                <Calendar/>
              </button>
            </>
          )
        }
      </div>
      { showCalendar && (
        <DatepickerCalendar
          value={ inputValue }
          minDate={ minDate }
          maxDate={ maxDate }
          toggleRef={ inputRef }
          setInputValue={ setValue }
          range={ range }
          locale={ locale }
          showCalendar={ showCalendar }
          toggleCalendar={ toggleCalendar }
          showTodayButton={ showTodayButton }
          position={ position }
          separator={ separator }
          format={ format }
          disableWeekDays={disableWeekDays || []}
        />
      ) }
    </div>
  );
};

export default Datepicker;
