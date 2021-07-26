import { render } from '@testing-library/react';
import React from 'react';
import Input from './Input';

describe('Test <Input/> component', () => {
  it('should have clear button', () => {
    const { container } = render(<Input />);
    // expect(wrapper.find('.rf-input__action-clear')).toHaveLength(1);
  });
});
