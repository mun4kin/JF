import React, { useEffect, useState } from 'react';
import './PDFViewer.scss';
import { IRequestAttachment } from '../../../types/projects.types';
import { Document, Page } from 'react-pdf';
/**  костылики для подключения библиотеки*/
// @ts-ignore
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';
import Button from '../../atoms/Button';
import Arrow from '../../../assets/icons/ChevronLeft';
import DownloadIcon from '../../../assets/icons/Download';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export interface IProps {
  file: IRequestAttachment;
}
export const download = (file: IRequestAttachment, name: string) => {
  // @ts-ignore
  if (window.navigator && window.navigator.msSaveBlob) {

    const tmp = (file.base64 || '').split(';base64,');
    const byteCharacters = atob(tmp[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: tmp[0].split(':')[1] });
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {

    const a = document.createElement('a');
    a.href = file.base64 || '';
    a.download = name;
    a.click();
  }
};
const PDFViewer: React.FC<IProps> = ({ file }: IProps) => {
  /** всего страниц в документе*/
  const [numPages, setNumPages] = useState(1);
  /** текущая страниа*/
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setNumPages(1);
    setCurrentPage(1);
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }:{numPages:number}) => setNumPages(nextNumPages);
  // ===================================================================================================================
  /** листаем страницы*/
  const nextPage = (num:number) => {
    const sum = currentPage + num;
    sum > 0 && sum <= numPages && setCurrentPage(sum);
  };
  // ===================================================================================================================
  return <> { file &&
      <div className='pdf-document'>
        <Document file={ file.base64 } onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={currentPage}/>
        </Document>
        <div className='pdf-document__download'>
          <button onClick={() => {
            download(file, file.fileName);
          }}> Скачать</button>
          <DownloadIcon className='pdf-document__icon'/>
        </div>
        <div className='pdf-document__pager'>
          <Button buttonType='text' onClick={() => nextPage(-1)}>
            <div className={currentPage > 1 ? 'pdf-document__pager-button--active' : 'pdf-document__pager-button'}>
              <Arrow/>
            </div>
          </Button>
          <div className='pdf-document__pager-text'>{`${currentPage} / ${numPages}`}</div>
          <Button buttonType='text' onClick={() => nextPage(1)}>
            <div className={currentPage < numPages ? 'pdf-document__pager-button--active' : 'pdf-document__pager-button'}>
              <Arrow transform={'rotate(180)'}/>
            </div>
          </Button>
        </div>
      </div>
  }</>;
};

export default PDFViewer;
