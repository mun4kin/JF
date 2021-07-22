import React from 'react';
import { render } from '@testing-library/react';
import Tag from './Tag';

describe('Test <Tag/> component', () => {
  
  it('should render Tag component', () => {
    render(<Tag> Tag </Tag>)
  });
  
  it('should be blue', () => {
    const { container } = render(<Tag variant='blue'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--blue')).toHaveLength(1);
  });
  
  it('should be lightBlue', () => {
    const { container } = render(<Tag variant='lightBlue'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--lightBlue')).toHaveLength(1);
  });
  
  it('should be turquoise', () => {
    const { container } = render(<Tag variant='turquoise'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--turquoise')).toHaveLength(1);
  });
  
  it('should be green', () => {
    const { container } = render(<Tag variant='green'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--green')).toHaveLength(1);
  });
  
  it('should be yellow', () => {
    const { container } = render(<Tag variant='yellow'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--yellow')).toHaveLength(1);
  });
  
  it('should be red', () => {
    const { container } = render(<Tag variant='red'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--red')).toHaveLength(1);
  });
  
  it('should be magenta', () => {
    const { container } = render(<Tag variant='magenta'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--magenta')).toHaveLength(1);
  });
  
  it('should be purple', () => {
    const { container } = render(<Tag variant='purple'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--purple')).toHaveLength(1);
  });
  
  it('should be violet', () => {
    const { container } = render(<Tag variant='violet'> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--violet')).toHaveLength(1);
  });
  
  it('should be clickable', () => {
    const onClick = () => {};
    const { container } = render(<Tag onClick={onClick}> Tag </Tag>);
    expect(container.getElementsByClassName('rf-tag--clickable')).toHaveLength(1);
  });
});
