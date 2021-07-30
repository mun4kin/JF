import React, {
  FC, ReactNode, useCallback, useEffect, useRef, useState
} from 'react';
import './Select.scss';

import { IOption } from '../../../types';
import useClickOutside from '../../../hooks/useClickOutside';
import Chip from '../Chip';
import {
  ChevronDown, Close, Preloader
} from '../../../index';
import Checkbox from '../Checkbox/Checkbox';

export interface ISelectProps {
  /** Варианты выбора */
  options: IOption[];
  /** Изменение значения */
  onChange: (option: IOption[]) => void;
  /** Поиск внутри селекта */
  onSearch?: (query: string) => void;
  /** Значение по умолчанию */
  defaultValues?: IOption[];
  /** Множественный выбор */
  multiselect?: boolean;
  /** Плейсхолдер */
  placeholder?: string;
  /** Запрещает вводить текст */
  readOnly?: boolean;
  disabled?: boolean;
  /** Максимальное количество выбранных вариантов при multiselect */
  maxOptions?: number;
  /** Прелоудер при ленивой загрузке */
  preloader?: boolean;
  /** Положение тегов - внутри инпута или под селектом */
  tagsPosition?: 'inside' | 'outside';
  /** Очистить селект при выборе значения */
  clearOnSelect?: boolean;
  /** Любое изменяемое значение (зависимость). При изменении этого параметра очищается селект */
  clearHook?: any;
}

const Select: FC<ISelectProps> = ({
  options,
  onChange,
  onSearch,
  defaultValues = [],
  multiselect = false,
  placeholder = '',
  disabled = false,
  readOnly = false,
  maxOptions = options.length,
  preloader = false,
  tagsPosition = 'inside',
  clearOnSelect = false,
  clearHook
}: ISelectProps) => {

  const [showDropdown, toggleDropdown] = useState(false);
  const componentNode = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------------------------------------------------------------

  /** Клик в сторону */
  const handleClickOutside = useCallback(() => {
    if (showDropdown) {
      toggleDropdown(false);
    }
  }, [showDropdown, multiselect]);

  useClickOutside(componentNode, handleClickOutside);

  // -------------------------------------------------------------------------------------------------------------------

  const [inputValue, setInputValue] = useState<string>(() =>
    defaultValues.length > 0 && !multiselect ? defaultValues[0].label : '');
  const openDropdown = () => {
    toggleDropdown(true);
  };

  /** Очистка селекта */
  const onClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue('');
    toggleDropdown(true);

    if (!multiselect) {
      setValues([]);
    }

    onSearch && onSearch('');
  };

  /** Очистка при изменении извне через clearHook */
  useEffect(() => {
    if (!multiselect) {
      setValues([]);
    }

    if (clearHook === undefined) {
      return;
    }

    setInputValue('');
    onSearch && onSearch('');
  }, [clearHook]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Поиск в селекте */
  const onSelectSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (onSearch) {
      onSearch(inputValue);
      return;
    }

    const filtered = options.filter((o: IOption) => o.label.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  }, [inputValue]);

  // -------------------------------------------------------------------------------------------------------------------

  const [values, setValues] = useState<IOption[]>(() => defaultValues);
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!values) {
      return;
    }

    const map: Record<string, boolean> = values.reduce((acc: Record<string, boolean>, o: IOption) => {
      acc[o.value] = true;
      return acc;
    }, {});

    onChange(values);
    setSelectedMap(map);

  }, [values]);

  const onValueChange = (option: IOption) => {
    if (multiselect) {
      const index = values.findIndex((o: IOption) => option.value === o.value);

      if (index >= 0) {
        setValues((values: IOption[]) => values.filter((_: IOption, i: number) => i !== index));
      } else {
        if (values.length < maxOptions) {
          setValues((values: IOption[]) => [...values, option]);
        }
      }
    } else {
      setValues([option]);
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  const [filteredOptions, setFilteredOptions] = useState<IOption[]>([]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // -------------------------------------------------------------------------------------------------------------------

  const listJSX = filteredOptions.map((o: IOption) => {
    const disabled = o.disabled || false;
    const active = selectedMap[o.value] || false;

    const handleChange = (e: React.MouseEvent | React.ChangeEvent) => {
      e.stopPropagation();
      onValueChange(o);

      if (!multiselect) {
        setInputValue(clearOnSelect ? '' : o.label);
        toggleDropdown(false);
      } else {
        setInputValue('');
      }
    };

    const disabledClass = disabled ? 'rf-select__list-element--disabled' : '';
    const activeClass = active ? 'rf-select__list-element--active' : '';

    let label: ReactNode = o.label;

    if (inputValue) {
      const indexStart = o.label.toLowerCase().indexOf(inputValue.toLowerCase());

      if (indexStart >= 0) {
        const indexEnd = indexStart + inputValue.length - 1;
        let left = '';
        let query = '';
        let right = '';

        for (let i = 0; i < o.label.length; i++) {
          if (i < indexStart) {
            left += o.label[i];
            continue;
          }

          if (i >= indexStart && i <= indexEnd) {
            query += o.label[i];
            continue;
          }

          right += o.label[i];
        }

        label = <>{left}<span className='rf-select__list-element--query'>{query}</span>{right}</>;
      }
    }

    return (
      <div className={`rf-select__list-element ${disabledClass} ${activeClass}`} key={ o.value }>
        { multiselect ? <Checkbox label={label} checked={active} onChange={handleChange} fullWidth/> :
          <div className='rf-select__list-element-single' onClick={ handleChange }>{label}</div>}
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  const noop = () => {};

  const tagsRef = useRef<HTMLDivElement>(null);

  const tagsJSX = multiselect && values.length > 0 && (
    <div className='rf-select__tags' ref={ tagsRef } onClick={ () => !disabled && toggleDropdown(true) }>
      { values.map((t: IOption) => (
        <div className='rf-select__tag' key={ t.value }>
          <Chip type='secondary' size='s' onRemove={ () => onValueChange(t) } onClick={noop} disabled={ disabled }>
            { t.label }
          </Chip>
        </div>
      )) }
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  const closeButton = !disabled && !readOnly && inputValue.length > 0 && (
    <button className='rf-select__button' onClick={ onClear }>
      <Close/>
    </button>
  );

  const chevronButton = !disabled && (readOnly || inputValue.length === 0) && (
    <button className={`rf-select__button ${showDropdown ? 'rf-select__button--rotate' : ''}`}
      onClick={ () => toggleDropdown((state: boolean) => !state) }>
      <ChevronDown/>
    </button>
  );

  // -------------------------------------------------------------------------------------------------------------------

  const openClass = showDropdown ? 'rf-select__wrapper--open' : '';
  const multiselectClass = multiselect ? 'rf-select--multi' : '';

  return (
    <div className={`rf-select ${multiselectClass}`} ref={ componentNode }>
      <div className={`rf-select__wrapper ${openClass}`}>
        <input
          className='rf-select__input'
          onClick={ openDropdown }
          onChange={ onSelectSearch }
          value={ inputValue }
          disabled={ disabled }
          readOnly={ readOnly }
          placeholder={ disabled || (multiselect && tagsPosition === 'inside' && values.length === maxOptions) ? '' : placeholder }/>
        { closeButton }
        { chevronButton }
      </div>
      {
        showDropdown && filteredOptions.length > 0 && (
          <div className='rf-select__list'>
            { preloader ? (
              <div className='rf-select__list-preloader'>
                <Preloader size='m'/>
              </div>
            ) : listJSX }
          </div>
        )
      }
      { tagsJSX }
    </div>
  );
};
export default Select;
