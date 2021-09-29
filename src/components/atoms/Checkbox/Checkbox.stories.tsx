import React from 'react';
import { Story } from '@storybook/react';

import ControlGroup from '../ControlGroup';
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

export const Demo: Story = () => {
  return (
    <StoryDocs>
      <StoryDocsH1>Checkbox</StoryDocsH1>
      <StoryDocsDescription>
        Чекбоксы применяются, когда есть список опций для выбора.  Можно выбрать любое количество опций из списка.
        Выбор одних пунктов никак не влияет на другие.
      </StoryDocsDescription>
      <ControlGroup>
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
      </ControlGroup>
      <StoryDocsH2>Варианты группировки</StoryDocsH2>
      <StoryDocsH3>Группа чекбоксов</StoryDocsH3>
      <FormGroup label='Выберите город'>
        <ControlGroup>
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
        </ControlGroup>
      </FormGroup>
      <StoryDocsH3>Горизонтальная компоновка</StoryDocsH3>
      <FormGroup label='Выберите город'>
        <ControlGroup direction='horizontal'>
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
          <Checkbox
            label='Default'
          />
        </ControlGroup>
      </FormGroup>
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
