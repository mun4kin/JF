import React from 'react';
import Tag, { ITagProps } from './Tag';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { variants } from '../../../types';

export default {
  title: 'Tag',
  component: Tag,
  typeArgs: {
    variant: {
      options: variants,
      control: { type: 'select' },
      defaultValue: 'default'
    }
  }
};

export const tag = (args: ITagProps) => {
  return (
    <Story
      name='Tag'>
      <StoryItem>
        <Tag variant={args.variant} disabled={args.disabled}> Вариант </Tag>
      </StoryItem>
    </Story>
  );
};
