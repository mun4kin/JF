import React, {
  FC, ReactNode, useEffect, useRef, useState
} from 'react';


import './Signification.scss';
import { IRequestAttachment } from '../../../types/projects.types';
import {
  Button, CertReader, Chip, CircleConfirm, CircleReject, Close, download, Hint, InputFile, Modal, PDFViewer, Tile
} from '../../../index';
import Document from '../../../assets/icons/Documents';
import { IBrowserCert, ICertResult } from '../../molecules/CertReader/CertReader';
import ContentExpander from '../../molecules/ContentExpander';
import { Certificate } from 'crypto-pro';
import Download from '../../../assets/icons/Download';
import { IFileData } from '../../../types';


type TButtons = 'sign'|'manual'|'reject'
export interface IProps{
  /** Изначальный файл*/
  data:IRequestAttachment,
  /** Дополнительные данные о документе*/
  documentInfo?:ReactNode
  /** заголовок*/
  title?:string,
  /** функция- результат подписания */
  onSignify?:(file:IRequestAttachment, success:boolean)=>void
  /** массив в котором название кнопок для скрытия */
  hideButtons?:TButtons[],
  /** показывать ли спойлер для документа */
  isSpoiler?:boolean,
  /** открыт или закрыт спойлер для документа */
  isOpenSpoiler?:boolean
  /** фильтр сертификатов */
  filter?: (cert: Certificate) => Promise<boolean>;
}


const Signification:FC<IProps> = ({
  data,
  onSignify = () => {},
  title = '',
  isSpoiler = true,
  isOpenSpoiler = false,
  documentInfo,
  hideButtons = [],
  filter = async (cert) => !!~cert.issuerName.toLowerCase().indexOf('vtb')
}:IProps) => {
  /** текущий статус файла*/
  const [value, setValue] = useState<IRequestAttachment>(data);
  /** хранит текущий выбранный сертификат*/
  const [currentCert, setCurrentCert] = useState<IBrowserCert | undefined>(undefined);
  /** True если ошибка сертификатов*/
  const [certError, setCertError] = useState<boolean>(false);
  /** хранит приложеннный руками фойл*/
  const [manualFile, setManualFile] = useState<IRequestAttachment | undefined>(undefined);
  /** изначальный файл*/
  const initialFile = useRef<IRequestAttachment>(data);
  /** статус подписания*/
  const [finalStage, setFinalStage] = useState<'reject' | 'auto' | 'manual' | undefined>(undefined);
  /** открывает попап ручного подписания*/
  const [manualPopup, setManualPopup] = useState<boolean>(false);
  /** открыт или закрыт спойлер*/
  const [isOpenContent, setOpenContent] = useState(isOpenSpoiler);


  const status = ['auto', 'manual'].includes(finalStage || '') ? 'success' : 'danger';
  // ===========
  useEffect(() => {
    data && setValue(data);
  }, [data]);
  // =======================================================================================================================================

  const successHandle = (result: ICertResult) => {
    onSignify(result.data, true);
    setValue(result.data);
    setCurrentCert(result.cert);
    setFinalStage('auto');
    setOpenContent(false);
  };
  const errorHandle = () => {
    setCertError(true);
  };
  const cancelSign = () => {
    setFinalStage(undefined);
    setValue(initialFile.current);
    onSignify(initialFile.current, false);
  };
  const manualSignHandler = () => {
    setFinalStage('manual');
    const file = {
      ...value,
      ...manualFile
    };
    setValue(file);
    onSignify(file, true);
    setManualPopup(false);
    setOpenContent(false);
  };
  const setFileHandler = (file: IFileData[]) => {
    setManualFile({
      fileName: file[0].file.name,
      base64: file[0].base64
    });
  };

  const finalText = finalStage === 'auto' ?
    'Документ будет подписан сертификатом' :
    finalStage === 'manual' ?
      'Документ будет подписан ручной подписью' :
      'Документ будет отклонен';
  // =======================================================================================================================================
  const buttonsTSX = !finalStage &&
    <div className='buttons__wrapper'>
      {!hideButtons?.includes('sign') &&
      <div className='button__item'>
        <CertReader
          filter={filter}
          file={data} onSuccess={successHandle} onError={errorHandle}/>
      </div>
      }
      {!hideButtons?.includes('manual') &&
      <div className='button__item'>
        <Button buttonType='light' onClick={() => setManualPopup(true)}>Подписать вручную</Button>
      </div>
      }
      {!hideButtons?.includes('reject') &&
      <div className='button__item'>
        <Button buttonType='danger' onClick={() => {
          setOpenContent(false);
          setFinalStage('reject');
        }}>Отклонить ЭДО</Button>
      </div>
      }
    </div>;
  // =======================================================================================================================================
  const manualFileChipTSX = (name:string, onClick:(e:any)=>void) =>
    <div className='manual__chip-wrapper'>
      <Chip onClick={() => manualFile && download(manualFile, manualFile?.fileName)} size='s' type='outline'>
        <div className='manual__chip-text'>
          {name}
          <div className='manual__chip-button' onClick={onClick}>
            <Close/>
          </div>
        </div>
      </Chip>
    </div>;

  // =======================================================================================================================================

  const finalCardTSX = finalStage &&
    <>
      <div className={`info-block__wrapper info-block__wrapper--${status}`}>
        <div className='info-block__icon'>
          {finalStage === 'reject' ?
            <CircleReject width='40px' height='40px' color1='#DA0B20' color2='#FFFFFF'/> :
            <CircleConfirm width='40px' height='40px' color1='#2ABB5B' color2='#FFFFFF'/>
          }
        </div>
        <div className='info-block__text-wrapper'>
          <div className={`info-block__main-text info-block__main-text--${finalStage}`}>
            {finalText}
          </div>
          {finalStage === 'auto' &&
          <div className='info-block__text'>{`${currentCert?.name} ${currentCert?.issuerName}`.slice(0, 100)}</div>}
        </div>
        <div className='info-block__button'>
          <Button onClick={cancelSign} buttonType='text'>
            <div className='info-block__button-inner'>
            Отменить
            </div>
          </Button>
        </div>
      </div>
      {finalStage === 'manual' && manualFileChipTSX(
        value.fileName,
        (e:Event) => {
          e.stopPropagation();
          cancelSign();
        }
      )}

    </>;
  // =======================================================================================================================================

  const manualPopupTSX = manualPopup && <Modal >
    <div className='manual__wrapper'>
      <div className='manual__header'>
        <div>Подписать вручную</div>
        <div className='manual__close' onClick={() => setManualPopup(false)}>
          <Close/>
        </div>
      </div>
      <div className='manual__hint-wrapper'>
        <Hint button={<Button
          onClick={() => download(value, value.fileName)}
          buttonType='text'
          startAdornment={<Download/>} >Скачать</Button>}
        icon='info'
        maxWidth='648px'
        title='Название'
        variant='default'>
        Скачайте и подпишите документ. После прикрепите подписанный файл
        </Hint>
      </div>
      {manualFile && manualFileChipTSX(manualFile.fileName, (e:Event) => {
        e.stopPropagation();
        setManualFile(undefined);
      })}
      <div className='modal_buttons'>
        <div className='modal_button'>
          <InputFile showChips={false} multiple={false} setFile={setFileHandler} buttonType='light' placeholder='Прикрепить файл'/>
        </div>
        <div className='modal_button'>
          <Button onClick={manualSignHandler} disabled={!manualFile}>Подписать</Button>
        </div>
      </div>
    </div>
  </Modal>;
  // =======================================================================================================================================
  const certErrorTSX = certError &&
   <div className='cert-error__wrapper'>
     <Hint button={<Button
       onClick={() => download(value, value.fileName)}
       buttonType='text'
       textColor='red'
       startAdornment={<Download/>} >Инструкция</Button>}
     icon='info'
     maxWidth='648px'
     title='Не найден сертификат, который осуществляет подпись'
     variant='red'>
       Для получения сертификата ЭП (электронная подпись) ознакомьтесь, пожалуйста, с инструкцией
     </Hint>
   </div>;
  // =======================================================================================================================================
  const expanderContentTSX = <>
    { buttonsTSX}
    {(!finalStage || isSpoiler) && <PDFViewer file={data}/>}
  </>;

  return <div className='signification__wrapper'>
    <Tile>
      <div className='signification__title-row'>
        <Document/>
        <div className='signification__title-text'>{title}</div>
      </div>
      {documentInfo && documentInfo}
      { finalCardTSX}
      { certErrorTSX}
      { !isSpoiler && expanderContentTSX}

      {isSpoiler &&
        <>
          <ContentExpander
            onExpand={() => setOpenContent(!isOpenContent)}
            expanded={isOpenContent}
            title={isOpenContent ? 'Скрыть' : `Просмотреть${finalStage !== 'reject' ? 'и подписать документ' : ''} `}>
            { isOpenContent && expanderContentTSX}
          </ContentExpander>
        </>}
    </Tile>
    { manualPopupTSX }
  </div>;
};

export default Signification;
