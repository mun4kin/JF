import React from 'react';
import Tooltip from './Tooltip';
import Button from '../Button';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryCol from '../../storybook/StoryCol';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Tooltip',
  component: Tooltip
};

export const tooltip = () => {
  return (
    <Story name='Tooltip (Подсказка)'>
      <StoryItem description='Подсказка при наведении на элемент.'>
        <StoryRow>
          <StoryCol>
            <Tooltip background='white'>
              <Button>Hover me</Button>
              <div>Tooltip text</div>
            </Tooltip>
          </StoryCol>

          <StoryCol>
            <Tooltip position='left'>
              <Button>Hover me</Button>
              <div>Tooltip text</div>
            </Tooltip>
          </StoryCol>
        </StoryRow>

        <StoryRow>
          <StoryCol>
            <Tooltip position='bottom'>
              <Button>Hover me</Button>
              <div>Tooltip text</div>
            </Tooltip>
          </StoryCol>

          <StoryCol>
            <Tooltip position='top'>
              <Button>Hover me</Button>
              <div>Tooltip text</div>
            </Tooltip>
          </StoryCol>
        </StoryRow>
      </StoryItem>

      <StoryItem description='В некоторых случаях подсказку нужно отображать на уровне body. Для этого существует свойство portal.'>
        <Tooltip portal>
          <Button>Hover me</Button>
          <div>Эта подсказка лежит в body </div>
        </Tooltip>
      </StoryItem>
    </Story>
  );
};
