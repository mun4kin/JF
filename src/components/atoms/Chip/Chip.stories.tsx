import React from 'react';
import Chip from './Chip';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { variants } from '../../../types';

export default {
  title: 'Chip',
  component: Chip,
  typeArgs: {
    variant: {
      options: variants,
      control: { type: 'select' },
      defaultValue: 'default'
    }
  }
};

export const chip = () => {

  const onRemove = () => {
    console.log('remove');
  };

  const onDownload = () => {
    console.log('download');
  };

  const onClick = () => {
    console.log('on click');
  };

  const frameStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 142,
    border: '2px dashed lightblue',
    borderRadius: 12,
    padding: 8,
    marginRight: 16
  };

  const elementStyle = { marginBottom: 8 };

  return (
    <Story
      name='Chip'>
      <StoryItem subtitle='Chips 40'>
        <div style={{ display: 'flex' }}>
          <div style={frameStyle}>
            <div style={elementStyle}>
              <Chip type='secondary' size='l' onRemove={onRemove}>Size L-M</Chip>
            </div>
            <div style={elementStyle}>
              <Chip type='outline' size='l' onRemove={onRemove}>Size L-M</Chip>
            </div>
            <div style={{
              ...elementStyle,
              marginBottom: 0
            }}>
              <Chip type='primary' size='l' onRemove={onRemove}>Size L-M</Chip>
            </div>
          </div>
          <div style={frameStyle}>
            <div style={elementStyle}>
              <Chip type='secondary' size='l' onDownload={onDownload}>Size L-M</Chip>
            </div>
            <div style={elementStyle}>
              <Chip type='outline' size='l' onDownload={onDownload}>Size L-M</Chip>
            </div>
            <div style={{
              ...elementStyle,
              marginBottom: 0
            }}>
              <Chip type='primary' size='l' onDownload={onDownload}>Size L-M</Chip>
            </div>
          </div>
        </div>
      </StoryItem>
      <StoryItem subtitle='Chips 32'>
        <div style={{ display: 'flex' }}>
          <div style={{
            ...frameStyle,
            width: 135
          }}>
            <div style={elementStyle}>
              <Chip type='secondary' size='s' onRemove={onRemove}>Size S-XS</Chip>
            </div>
            <div style={elementStyle}>
              <Chip type='outline' size='s' onRemove={onRemove}>Size S-XS</Chip>
            </div>
            <div style={{
              ...elementStyle,
              marginBottom: 0
            }}>
              <Chip type='primary' size='s' onRemove={onRemove}>Size S-XS</Chip>
            </div>
          </div>
          <div style={{
            ...frameStyle,
            width: 135
          }}>
            <div style={elementStyle}>
              <Chip type='secondary' size='s' onDownload={onDownload}>Size S-XS</Chip>
            </div>
            <div style={elementStyle}>
              <Chip type='outline' size='s' onDownload={onDownload}>Size S-XS</Chip>
            </div>
            <div style={{
              ...elementStyle,
              marginBottom: 0
            }}>
              <Chip type='primary' size='s' onDownload={onDownload}>Size S-XS</Chip>
            </div>
          </div>
          <div style={{
            ...frameStyle,
            width: 105
          }}>
            <div style={elementStyle}>
              <Chip type='secondary' size='s' onClick={onClick}>Size S-XS</Chip>
            </div>
            <div style={elementStyle}>
              <Chip type='outline' size='s' onClick={onClick}>Size S-XS</Chip>
            </div>
            <div style={{
              ...elementStyle,
              marginBottom: 0
            }}>
              <Chip type='primary' size='s' onClick={onClick}>Size S-XS</Chip>
            </div>
          </div>
        </div>
      </StoryItem>
    </Story>
  );
};
