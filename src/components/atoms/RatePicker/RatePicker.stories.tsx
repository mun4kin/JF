import React from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';
import RatePicker, { IPickerProps, PickerType } from './RatePicker';

const pickerTypes: PickerType[] = ['primary', 'tertiary'];

export default {
  title: 'Form Controls/Rate Picker',
  component: RatePicker,
  argTypes: {
    pickedType: {
      options: pickerTypes,
      control: { type: 'select' },
      defaultValue: 'primary',
    },
  }
};


export const ratePicker = (args: IPickerProps) => {
  return (
    <Story name='Rate Picker' description='Rate Picker элемент'>
      <StoryItem description='состояние оцeнщика'>
        <StoryRow >
          <RatePicker {...args} />
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
