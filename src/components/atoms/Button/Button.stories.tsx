import React from 'react';
import Button, { ButtonType, IButtonProps } from './Button';
import Story from '../../storybook/Story';
import { variantsClassic } from '../../../types';

const buttonTypes: ButtonType[] = [
  'primary',
  'light',
  'secondary',
  'ghost',
  'danger',
  'icon',
  'text',
];

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    buttonType: {
      options: buttonTypes,
      control: { type: 'select' },
      defaultValue: 'primary'
    },
    size: {
      options: [
        's',
        'm',
        'l',
        'xl'
      ],
      control: { type: 'select' },
      defaultValue: 'm'
    },
    disabled: { type: 'boolean' },
    type: { control: null },
    textColor: {
      options: variantsClassic,
      control: { type: 'select' },
      defaultValue: 'default'
    }
  }
};

export const button = (args: IButtonProps) => {
  return (
    <Story name='Button (Кнопка)'>
      <Button {...args}>
        { args.buttonType === 'icon' ? 'i' : 'Button'}
      </Button>
    </Story>
  );
};
