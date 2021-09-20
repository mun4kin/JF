import React, {
  FC, HTMLProps, ReactNode, useEffect, useRef, useState
} from 'react';
import './Input.scss';
import { fromEvent } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';
import Close from '../../../assets/icons/Close';

export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  /** Возможность очистки поля по клику */
  onClear?: () => void;
  /** Дебаунс */
  debounce?: number;
  /** Иконка */
  icon?: ReactNode;
  variant?: 'base' | 'inline';
  /* Контент для вставки в начало инпута */
  startAdornment?: ReactNode;
  /* Контент для вставки в конец инпута */
  endAdornment?: ReactNode;
}

const Input: FC<IInputProps> = ({
  onClear,
  debounce = 300,
  icon,
  variant = 'base',
  startAdornment,
  endAdornment,
  disabled,
  onFocus,
  onBlur,
  ...props
}: IInputProps) => {
  /** Ref */
  const ref = useRef<HTMLInputElement>(null);
  /** Значение поля */
  const [value, setValue] = useState<string>(props.defaultValue?.toString() || props.value?.toString() || '');
  /** Находится ли инпут в состоянии фокуса */
  const [isFocused, setFocused] = useState(false);

  // ------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    /** Подписываемся на ввод текста */
    let sub: any;

    if (ref.current) {
      sub = fromEvent(ref.current, 'keyup')
        .pipe(
          map((e: Event) => e),
          debounceTime(debounce),
          distinctUntilChanged()
        )
        .subscribe((e: any) => {
          setValue(e.target.value);
          props.onKeyUp && props.onKeyUp(e);
        });
    }

    return () => {
      try {
        sub && sub.unsubscribe();
      } catch (e) {
        console.log(e);
      }
    };
  }, [onClear, debounce, props.onKeyUp]);

  // ------------------------------------------------------------------------------------------------------------------
  /** Очистка поля ввода и сброс результатов поиска */
  const clearInput = () => {
    if (ref.current) {
      ref.current.value = '';
      setValue('');
      onClear && onClear();
    }
  };

  /** Кнопка поиска и сброса */
  const closeButton = onClear && value.length > 0 && (
    <button type='button' className='rf-input__action' onClick={ clearInput } aria-label='Сбросить'>
      <Close/>
    </button>
  );

  // ------------------------------------------------------------------------------------------------------------------

  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  // ------------------------------------------------------------------------------------------------------------------

  return (
    <label
      className={`
        rf-input 
        ${variant === 'inline' ? 'rf-input--inline' : ''} 
        ${disabled ? 'rf-input--disabled' : ''} 
        ${isFocused ? 'rf-input--focused' : ''} 
        ${props.className || ''}`
      }
    >
      {!!startAdornment && <div className='rf-input__adornment rf-input__adornment--start'>{startAdornment}</div>}
      <input
        { ...props }
        ref={ ref }
        className={'rf-input__field'}
        autoComplete='off'
        type={ props.type || 'text' }
        disabled={disabled}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
      {!!endAdornment && <div className='rf-input__adornment rf-input__adornment--end'>{endAdornment}</div>}
      { icon ? <button type='button' className='rf-input__action'>{ icon }</button> : closeButton }
    </label>
  );
};

export default Input;
