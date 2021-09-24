import React from 'react';
import Input from './Input';
import FormGroup from '../FormGroup';

import {
  StoryDocs, StoryDocsH1, StoryDocsH2
} from '../../storybook';

import Calendar from '../../../assets/icons/Calendar';
import ChevronDown from '../../../assets/icons/ChevronDown';
import Info from '../../../assets/icons/Info';
import Search from '../../../assets/icons/Search';
import Success from '../../../assets/icons/Success';

export default {
  title: 'Form Controls/Input',
  component: Input
};

const LABEL = 'Label';

export const input = () => {
  return (
    <StoryDocs>
      <StoryDocsH1>Input</StoryDocsH1>

      <div style={{
        display: 'grid',
        gap: 32,
        maxWidth: 400
      }}>
        <FormGroup label={LABEL}>
          <Input placeholder='Введите тип обращения' onClear={() => {}} />
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input defaultValue='Тип обращения' placeholder='Введите тип обращения' onClear={() => {}} />
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input placeholder='Введите тип обращения' disabled />
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input defaultValue='Тип обращения' disabled />
        </FormGroup>
        <FormGroup label={LABEL} errorMessage='Additional text'>
          <Input invalid />
        </FormGroup>
        <Input placeholder='Инлайн' variant='inline' />
        <Input placeholder='Инлайн неактивное поле' variant='inline' disabled />
        <Input placeholder='Инлайн невалидное поле' variant='inline' invalid />
      </div>

      <StoryDocsH2>Input Icons</StoryDocsH2>

      <div style={{
        display: 'grid',
        gap: 32,
        maxWidth: 400
      }}>
        <FormGroup label={LABEL}>
          <Input endAdornment={<Search style={{ color: 'var(--basic-primary)' }}/>}/>
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input endAdornment={<Calendar style={{ color: 'var(--text-tertiary)' }} />}/>
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input endAdornment={<ChevronDown />}/>
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input endAdornment={<Success style={{ color: 'var(--status-success)' }}/>}/>
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input endAdornment={<Info />}/>
        </FormGroup>
        <FormGroup label={LABEL}>
          <Input startAdornment={<Info />}/>
        </FormGroup>
      </div>
    </StoryDocs>
  );
};
