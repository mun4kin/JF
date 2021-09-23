import React, { FC } from 'react';
import Tile from '../../atoms/Tile';
import Tag from '../../atoms/Tag';
import './Card.scss';
import { IUser } from '../../../types/projects.types';
import { Variant } from '../../../types';
import UserPhoto from '../../atoms/UserPhoto';
import Copy from '../../../assets/icons/Copy';

export interface ICard {
  title: string;
  subTitle?: string;
  requestNumber: string;
  date: string;
  statusText: string;
  statusColor: Variant;
  user: IUser;
  footer: {
    text: string;
    value: string;
  }[];
  onClick: () => void;
 }

const Card: FC<ICard> = ({
  title,
  subTitle,
  requestNumber,
  date,
  statusText,
  statusColor,
  user,
  footer,
  onClick
}) => {
  return <div className='rf-card__wrapper' onClick={onClick}>
    <Tile>
      <div className='rf-card__row rf-card__row_first-row'>
        <div className='rf-card__title-wrapper'>
          <h1 className='rf-card__title'>{`${title} №${requestNumber} от ${date}`}</h1>
          {subTitle && <p className='rf-card__subtitle'>{subTitle}</p>}
        </div>
        <Tag variant={statusColor}>{statusText}</Tag>
      </div>
      <div className='rf-card__row'>
        <div className='rf-card__user-wrapper'>
          <div className='rf-card__user-photo-wrapper'>
            <UserPhoto url={user.photo} radius='48' />
          </div>
          <div className='rf-card__user-info-wrapper'>
            <div className='rf-card__user-row'>
              <p className='rf-card__user-full-name'>{user.fullName}</p>
            </div>
            <div className='rf-card__user-row'>
              <p className='rf-card__user-additional'>Табельный номер</p>
              <div className='rf-card__user-row'>
                <p className='rf-card__user-accent'>{user.id}</p>
                <div className='rf-card__icon-wrapper'>
                  <Copy onClick={() => {
                    navigator.clipboard.writeText(user.id);
                  }} id='copyIcon' />
                </div>
                <p className='rf-card__user-additional'>Должность</p>
                <div className='rf-card__user-row'>
                  <p className='rf-card__user-accent'>{user.position}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='rf-card__user-row'>
        {footer.map(item => {
          return (
            <div className='rf-card__user-row'>
              <p className='rf-card__user-additional'>{`${item.text}:`}</p>
              <div className='rf-card__user-row with-icon'>
                <p className='rf-card__user-accent'>{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Tile>
  </div>;
};

export default Card;
