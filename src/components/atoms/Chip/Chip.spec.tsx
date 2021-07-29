import React from 'react';
import { render } from '@testing-library/react';
import Chip from './Chip';

describe('Test <Tag/> component', () => {
  
  it('should render Tag component', () => {
    render(<Chip> Tag </Chip>)
  });
});
