import React from 'react';
import Textarea from './Textarea';
import FormGroup from '../FormGroup';

import { StoryDocs, StoryDocsH1 } from '../../storybook';

export default {
  title: 'Form Controls/Textarea',
  component: Textarea
};

const LABEL = 'Label';
const PLACEHOLDER = 'Введите текст';
const DEFAULT_VALUE = 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem s';
const MAX_LENGTH = 255;

export const textarea = () => {
  const getValue = (s: string) => {
    console.log(s);
  };

  return (
    <StoryDocs>
      <StoryDocsH1>Textarea</StoryDocsH1>
      <div style={{
        display: 'grid',
        gap: 32,
        maxWidth: 400
      }}>
        <FormGroup label={LABEL}>
          <Textarea placeholder={PLACEHOLDER} maxLength={MAX_LENGTH} />
        </FormGroup>
        <FormGroup label={LABEL}>
          <Textarea placeholder={PLACEHOLDER} defaultValue={DEFAULT_VALUE} maxLength={MAX_LENGTH} />
        </FormGroup>
        <FormGroup label={LABEL}>
          <Textarea placeholder={PLACEHOLDER} disabled maxLength={MAX_LENGTH} />
        </FormGroup>
        <FormGroup label={LABEL}>
          <Textarea placeholder={PLACEHOLDER} defaultValue={DEFAULT_VALUE} disabled maxLength={MAX_LENGTH} />
        </FormGroup>
        <FormGroup label={LABEL}>
          <Textarea placeholder={PLACEHOLDER} invalid maxLength={MAX_LENGTH} />
        </FormGroup>
      </div>
    </StoryDocs>
  );
};
