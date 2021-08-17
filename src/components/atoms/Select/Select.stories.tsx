import React, {
  useEffect, useRef, useState
} from 'react';
import Select from './Select';
import { IOption } from '../../../types';
import StoryItem from '../../storybook/StoryItem';
import Story from '../../storybook/Story';

export default {
  title: 'Form Controls/Select',
  component: Select
};

const list: IOption[] = [];

for (let i = 1; i < 15; i++) {
  list.push({
    value: `${i}`,
    label: `Вариант ${i}`,
    disabled: i % 6 === 0
  });
}

export const select = () => {
  const [values, setValues] = useState<IOption[]>([]);


  const onChange = (options: IOption[]) => {
    // console.log(options);
  };

  const [filteredOptions, setFilteredOptions] = useState<IOption[]>(list);
  const [loading, setLoading] = useState<boolean>(false);
  const timer = useRef<any>(undefined);

  const filterWithDelay = (query: string) => {
    if (query === '') {
      setFilteredOptions(list);
      return;
    }

    setLoading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const filtered = list.filter((o: IOption) => o.label.toLowerCase().includes(query.toLowerCase()));
      setFilteredOptions(filtered);
      setLoading(false);
    }, 1000);
  };

  const onSearch = (query: string) => {
    filterWithDelay(query);
  };

  useEffect(() => {
    setTimeout(() => {
      setValues([list[3]]);
    }, 1000);
  }, []);


  return (
    <Story name='Select' description='Select кнопки' width={400}>
      <StoryItem>
        <Select placeholder='Выберите значение'
          options={ filteredOptions }
          values={values}
          tagsPosition='outside'
          onChange={onChange}
          onSearch={onSearch}
          multiselect
          preloader={loading}/>
      </StoryItem>
    </Story>
  );
};
