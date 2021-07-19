/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  
  it('Should render Button component', () => {
    render(<Button> Button </Button>)
  });
  
});
