/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  
  it('Should render Button component', () => {
    render(<Button> Button </Button>)
  });
  
  it('Should be primary', () => {
    const { container } = render(<Button buttonType='primary'> Button </Button>);
    expect(container.getElementsByClassName('rf-button--primary')).toHaveLength(1);
  });
  
  it('Should be secondary', () => {
    const { container } = render(<Button buttonType='secondary'> Button </Button>);
    expect(container.getElementsByClassName('rf-button--secondary')).toHaveLength(1);
  });
  
  it('Should be light', () => {
    const { container } = render(<Button buttonType='light'> Button </Button>);
    expect(container.getElementsByClassName('rf-button--light')).toHaveLength(1);
  });
  
  it('Should be ghost', () => {
    const { container } = render(<Button buttonType='ghost'> Button </Button>);
    expect(container.getElementsByClassName('rf-button--ghost')).toHaveLength(1);
  });
  
  it('Should be danger', () => {
    const { container } = render(<Button buttonType='danger'> Button </Button>);
    expect(container.getElementsByClassName('rf-button--danger')).toHaveLength(1);
  });
  
  it('Should be icon', () => {
    const { container } = render(<Button buttonType='icon'> Button </Button>);
    expect(container.getElementsByClassName('rf-button--icon')).toHaveLength(1);
  });
  
  it('Should be text', () => {
    const { container } = render(<Button buttonType='text'> Button </Button>);
    expect(container.getElementsByClassName('rf-button--text')).toHaveLength(1);
  });
  
  it('Should be small', () => {
    const { container } = render(<Button size='s'> Button </Button>);
    expect(container.getElementsByClassName('rf--s')).toHaveLength(1);
  });
  
  it('Should be medium', () => {
    const { container } = render(<Button size='m'> Button </Button>);
    expect(container.getElementsByClassName('rf--m')).toHaveLength(1);
  });
  
  it('Should be large', () => {
    const { container } = render(<Button size='l'> Button </Button>);
    expect(container.getElementsByClassName('rf--l')).toHaveLength(1);
  });
  
  it('Should be extra large', () => {
    const { container } = render(<Button size='xl'> Button </Button>);
    expect(container.getElementsByClassName('rf--xl')).toHaveLength(1);
  });
});
