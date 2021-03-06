import React, { FC } from 'react';
import './FormGroup.scss';

export interface IFormGroup {
  /** Дочерние элементы */
  children: React.ReactNode | React.ReactNode[];
  /** Имя */
  label?: React.ReactNode;
  /** Имя */
  labelSecondary?: React.ReactNode;
  /** Сообщение об ошибке */
  errorMessage?: string;
  /** Дополнительный класс */
  className?: string;
  /** Обязательность */
  required?: boolean;
}

const FormGroup: FC<IFormGroup> = ({
  label, labelSecondary, children, errorMessage, className = '', required = false
}: IFormGroup) => {
  return (
    <div className={`rf-form-group ${className} `}>
      <div className='rf-form-group__inner'>
        {label && (
          <p className='rf-form-group__label'>
            {label}
            {required && <span className='rf-form-group__required'>*</span>}
            {!!labelSecondary && <span className='rf-form-group__label-secondary'>{labelSecondary}</span>}
          </p>
        )}
        {children}
      </div>
      {errorMessage && <p className='rf-form-group__message'>{errorMessage}</p>}
    </div>
  );
};

export default FormGroup;
