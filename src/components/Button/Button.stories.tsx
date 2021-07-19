import React from 'react';
import Button, { ButtonType } from './Button';
import { Size } from '../../types';
import Story from '../storybook/Story';

const buttonTypes: ButtonType[] = [
  'primary',
  'light',
  'secondary',
  'ghost',
  'danger',
  'success',
  'icon',
  'textPrimary',
  'textSecondary'
];

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    buttonType: {
      options: buttonTypes,
      control: { type: 'radio' },
    }
  }
};

const scales: Size[] = ['big', 'medium', 'small'];

export const buttons = () => {
  return (
    <Story name='Button (Кнопка)'>
      <Button> Button </Button>
    </Story>
  );
};
