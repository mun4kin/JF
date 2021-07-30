import React, { HTMLProps, useState } from 'react';
import './Search.scss';
import { Close, SearchIcon } from '../../../index';

export interface ISearchProps extends HTMLProps<HTMLInputElement> {
  onClear?: () => void;
}

const Search: React.FC<ISearchProps> = ({ onClear, ...props }: ISearchProps) => {

  // -------------------------------------------------------------------------------------------------------------------

  const [value, setValue] = useState<string>(props.value ? props.value.toString() : '');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const onClearClick = () => {
    setValue('');
    onClear && onClear();
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-search'>
      <input { ...props }
        type='text'
        className='rf-search__input'
        placeholder={ props.placeholder || 'Поиск' }
        value={ value }
        onChange={ onChange }
      />
      <SearchIcon className='rf-search__search-icon'/>
      { onClear && <Close className='rf-search__close-icon' onClick={ onClearClick }/> }
    </div>
  );
};

export default Search;
