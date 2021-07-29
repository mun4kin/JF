import React from 'react';
import Chip from './Chip';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { variants } from '../../../types';

export default {
  title: 'Chip',
  component: Chip,
  typeArgs: {
    variant: {
      options: variants,
      control: { type: 'select' },
      defaultValue: 'default'
    }
  }
};

export const chip = () => {

  const onRemove = () => {
    console.log('remove');
  };

  return (
    <Story
      name='Chip'>
      <StoryItem>
        <Chip onRemove={onRemove}> Вариант </Chip>
      </StoryItem>
    </Story>
  );
};
