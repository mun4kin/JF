import React from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';
import StatusPicker, { IPickerProps } from './StatusPicker';


export default {
  title: 'Form Controls/Status Picker',
  component: StatusPicker,
};


export const statusPicker = (args: IPickerProps) => {
  return (
    <Story name='Status Picker' description='Status Picker элемент'>
      <StoryItem description='состояние оцeнщика'>
        <StoryRow >
          <StatusPicker {...args} />
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
