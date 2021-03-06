import React, {
  HTMLProps, useEffect, useRef, useState
} from 'react';
import './Search.scss';
import { Close, SearchIcon } from '../../../index';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IDebounceResult } from '../../../types/projects.types';


export interface ISearchProps extends HTMLProps<HTMLInputElement> {
  onClear?: () => void;
  isShowClear?:boolean;
  debounce?:number;
  onDebounce?:(result:IDebounceResult)=>void
}

const Search: React.FC<ISearchProps> = ({ onClear, isShowClear = true, debounce = 500, onDebounce = () => {}, ...props }: ISearchProps) => {

  // -------------------------------------------------------------------------------------------------------------------

  const [value, setValue] = useState<string>(props.value ? props.value.toString() : '');
  const ref = useRef<HTMLInputElement>(null);
  // =======================

  useEffect(() => {
    /** Подписываемся на ввод текста */
    let sub: Subscription;

    ref.current && (sub = fromEvent<Event>(ref.current, 'keyup')
      .pipe(
        debounceTime(debounce),
        distinctUntilChanged()
      )
      .subscribe((e: Event) => {
        const debounceString = (e.target as HTMLInputElement).value;
        setValue(debounceString);
        onDebounce({
          event: e,
          debounceString
        });
      }));

    return () => sub && sub.unsubscribe();
  }, [ debounce, onDebounce]);


  useEffect(() => {
    setValue(props.value ? props.value.toString() : '');
  }, [props.value]);
  // -------------------------------------------------------------------------------------------------------------------
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  //* ***************
  const onClearClickHandler = () => {
    setValue('');
    onClear && onClear();
    onDebounce({ debounceString: '' });
  };
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-search'>
      <input { ...props }
        ref={ref}
        type='text'
        className='rf-search__input'
        placeholder={ props.placeholder || 'Поиск' }
        value={ value }
        onChange={ onChangeHandler }
      />
      <SearchIcon className='rf-search__search-icon'/>
      { value.length > 0 && isShowClear && <Close className='rf-search__close-icon' onClick={ onClearClickHandler }/> }
    </div>
  );
};

export default Search;
