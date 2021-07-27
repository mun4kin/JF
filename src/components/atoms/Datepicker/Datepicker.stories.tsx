import React from 'react';
import Datepicker from './Datepicker';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';
import StoryCol from '../../storybook/StoryCol';

export default {
  title: 'Form Controls/Datepicker',
  component: Datepicker
};

export const datepicker = () => {
  return (
    <Story name='Datepicker' description='Handcrafted delightful datepicker. Has not been rewritten from SCSS to Styled Components due to complicated logic.'>
      <StoryItem subtitle='Default' description='Accepts any date format: number, string or Date'>
        <StoryRow>
          <Datepicker/>
        </StoryRow>
      </StoryItem>
      <StoryItem subtitle='Min and Max' description='Supports Min and Max dates'>
        <StoryRow>
          <Datepicker min={Date.now()} max={Date.now() + 7 * 24 * 3600 * 1000}/>
        </StoryRow>
      </StoryItem>
      <StoryItem subtitle='Different date formats'>
        <StoryRow>
          <StoryCol>
            <Datepicker format='mm.dd.yyyy' defaultValue={Date.now()}/>
          </StoryCol>
          <StoryCol>
            <Datepicker format='dd.mm.yyyy' defaultValue={Date.now()}/>
          </StoryCol>
        </StoryRow>
        <StoryRow>
          <StoryCol>
            <Datepicker format='mm/dd/yyyy' defaultValue={Date.now()}/>
          </StoryCol>
          <StoryCol>
            <Datepicker format='dd/mm/yyyy' defaultValue={Date.now()}/>
          </StoryCol>
        </StoryRow>
      </StoryItem>
      <StoryItem subtitle='Can display day of the week'>
        <StoryRow>
          <Datepicker defaultValue={Date.now()} showDayOfWeek/>
        </StoryRow>
      </StoryItem>
      <StoryItem subtitle='Supports range with single prop'>
        <StoryRow>
          <Datepicker min={Date.now() - 7 * 24 * 3600 * 1000} range showDayOfWeek/>
        </StoryRow>
      </StoryItem>
      <StoryItem subtitle='Disabled'>
        <StoryRow>
          <Datepicker disabled defaultValue={Date.now()}/>
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
