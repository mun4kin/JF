import React from 'react';
import Radio from './Radio';
import { IOption } from '../../../types';
import StoryItem from '../../storybook/StoryItem';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Form Controls/Radio',
  component: Radio
};

const list: IOption[] = [
  {
    value: '1',
    label: 'Вариант 1'
  },
  {
    value: '2',
    label: 'Вариант 2'
  },
  {
    value: '3',
    label: 'Неактивный вариант',
    disabled: true
  }
];

export const radio = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };

  const listJSX = list.map((r: IOption) => (
    <StoryRow key={r.value}>
      <Radio
        name='radio'
        value={r.value}
        label={r.label}
        defaultChecked={r.value === '1'}
        onChange={onChange}
        disabled={r.disabled}
      />
    </StoryRow>
  ));

  return (
    <Story name='Radio' description='Radio кнопки'>
      <StoryItem description='Состояния радио кнопок'>{listJSX}</StoryItem>
    </Story>
  );
};
