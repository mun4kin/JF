import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import React from 'react';
import Card, { ICard } from './Card';
import { usersMocks } from '../../popups/FindUsers/users.mocks';

const data: ICard = {
  title: 'Надбавка за увеличение объёма продаж',
  subTitle: 'Вид заявки: Исполнение обязанностей',
  requestNumber: '347347347',
  date: '01.01.2021',
  statusText: 'На согласовании',
  statusColor: 'yellow',
  user: usersMocks[0],
  footer: [
    {
      text: 'Период',
      value: '03.08.2020 — 07.09.2021'
    },
    {
      text: 'Сумма',
      value: '100 000 ₽'
    }
  ],
  onClick: () => {}
};

export default {
  title: 'Card',
  component: Card
};

export const card = () => {
  return <Story name='Card' description='Карточка'>
    <StoryItem>
      <Card {...data} />
    </StoryItem>
  </Story>;
};
