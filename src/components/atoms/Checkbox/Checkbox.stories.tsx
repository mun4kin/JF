import React from 'react';
import { Story } from '@storybook/react';

import { IOption } from '../../../types';
import FormGroup from '../FormGroup';
import Checkbox from './Checkbox';
import StoryContainer from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';

import {
  StoryDocs, StoryDocsH1, StoryDocsH2, StoryDocsH3, StoryDocsDescription
} from '../../storybook';

export default {
  title: 'Form Controls/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: { type: 'text' } },
    disabled: { type: 'boolean' },
  }
};

const checkboxes: IOption[] = [
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
    label: 'Вариант 3',
    disabled: true
  },
  {
    value: '4',
    label: 'Неактивный вариант',
    disabled: true
  }
];

export const Demo: Story = () => {
  return (
    <StoryDocs>
      <StoryDocsH1>Checkbox</StoryDocsH1>
      <StoryDocsDescription>
        Чекбоксы применяются, когда есть список опций для выбора.  Можно выбрать любое количество опций из списка.
        Выбор одних пунктов никак не влияет на другие.
      </StoryDocsDescription>
      <div style={{
        display: 'grid',
        gap: 16
      }}>
        <Checkbox
          label='Default'
        />
        <Checkbox
          defaultChecked
          label='Checked'
        />
        <Checkbox
          halfChecked
          label='Indeterminate'
        />
        <Checkbox
          disabled
          label='Disabled'
        />
        <Checkbox
          defaultChecked
          disabled
          label='Checked disabled'
        />
        <Checkbox
          halfChecked
          disabled
          label='Indeterminate disabled'
        />
      </div>
      <StoryDocsH2>Варианты группировки</StoryDocsH2>
      <StoryDocsH3>Группа чекбоксов</StoryDocsH3>
      <FormGroup label='Выберите город'>
        <div style={{
          display: 'grid',
          gap: 16
        }}>
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
        </div>
      </FormGroup>
      <StoryDocsH3>Горизонтальная компоновка</StoryDocsH3>
      <FormGroup label='Выберите город'>
        <div style={{
          display: 'grid',
          gridAutoFlow: 'column',
          justifyContent: 'flex-start',
          gap: 16
        }}>
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
        </div>
      </FormGroup>
      <StoryDocsH3>Составная группа чекбоксов</StoryDocsH3>
      <StoryDocsDescription>
        Используется в случае необходимости выводы сложносоставной группы чекбоксов с выпадающим списком.
      </StoryDocsDescription>
      <div style={{
        display: 'grid',
        gap: 16
      }}>
        <Checkbox
          halfChecked
          label='Default'
        />
        <div style={{
          display: 'grid',
          gap: 16,
          marginLeft: 32
        }}>
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
        </div>
      </div>
    </StoryDocs>
  );
};

export const Playground: Story = (args) => {
  return <StoryContainer>
    <StoryRow>
      <Checkbox {...args} />
    </StoryRow>
  </StoryContainer>;
};
