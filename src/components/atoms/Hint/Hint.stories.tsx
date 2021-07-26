import React from 'react';
import Hint, { IHintProps } from './Hint';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { variants } from '../../../types';


export default {
  title: 'Hint',
  component: Hint,
  typeArgs: {
    variant: {
      options: variants,
      control: { type: 'select' },
      defaultValue: 'blue'
    },
    className: { control: null },
    position: {
      options: [
        'topRight',
        'topLeft',
        'bottomLeft',
        'bottomRight'
      ],
      control: { type: 'select' },
      defaultValue: 'topRight'
    }
  }
};

export const hint = (args: IHintProps) => {

  return (
    <Story name='Hint' description='Общее уведомление'>
      <StoryItem subtitle='Простое уведомление'>
        <Hint variant={args.variant} >
          текс
        </Hint>
      </StoryItem>


    </Story>
  );
};
