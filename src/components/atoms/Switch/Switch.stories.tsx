import React from 'react';
import Switch from './Switch';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Toggle',
  component: Switch
};

export const toggle = () => {
  const onChange = (flag: boolean) => {
    console.log(`Новое состояние: ${flag}`);
  };

  return (
    <Story name='Switch (Toggle)' description='Переключает состояние какой-нибудь сущности'>
      <StoryItem description='Состояния переключателя'>
        <StoryRow>
          <Switch onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='С текстом' onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='Сразу включен' state={true} onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='Неактивен и включен' state={true} disable={true} onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='Неактивен и выключен' disable={true} onChange={onChange} />
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
