import React from 'react';
import Input from './Input';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Form Controls/Input',
  component: Input
};

const inputsData: any[] = [
  {
    name: 'rtf1',
    placeholder: 'Введите текст',
    clear: () => {}
  },
  {
    name: 'rtf2',
    placeholder: 'Фокус на поле',
    autofocus: true
  },
  {
    name: 'rtf3',
    placeholder: 'Невалидное поле',
    className: 'invalid'
  },
  {
    name: 'rtf4',
    placeholder: 'Неактивное поле ввода',
    disabled: true
  }
];

export const input = () => {
  const inputsJSX = inputsData.map((r: any) => (
    <StoryRow key={r.name}>
      <Input
        name={r.name}
        className={r.className}
        placeholder={r.placeholder}
        disabled={r.disabled}
        onClear={r.clear}
      />
    </StoryRow>
  ));

  return (
    <Story name='Input' description='Однострочное поле ввода' width={600}>
      <StoryItem subtitle='Состояния инпута'>{inputsJSX}</StoryItem>
    </Story>
  );
};
