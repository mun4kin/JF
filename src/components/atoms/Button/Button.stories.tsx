import React from 'react';
import Button, { ButtonType, IButtonProps } from './Button';
import Story from '../../storybook/Story';

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
    type: { control: null }
  }
};

export const buttons = (args: IButtonProps) => {
  return (
    <Story name='Button (Кнопка)'>
      <Button buttonType={args.buttonType} size={args.size} disabled={args.disabled}>
        { args.buttonType === 'icon' ? 'i' : 'Button'}
      </Button>
    </Story>
  );
};
