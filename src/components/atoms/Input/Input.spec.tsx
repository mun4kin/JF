import { render } from '@testing-library/react';
import React from 'react';
import Input from './Input';

describe('Test <Input/> component', () => {
  it('should have clear button', () => {
    const { container } = render(<Input onClear={jest.fn} defaultValue='Test' />);
    expect(container.getElementsByClassName('rf-input__action')).toHaveLength(1);
  });
});
