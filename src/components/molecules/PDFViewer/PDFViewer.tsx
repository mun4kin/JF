import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import './PDFViewer.scss';
import { IRequestAttachment } from '../../../types/projects.types';
// @ts-ignore
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';
import DownloadIcon from '../../../assets/icons/Download';
import { download } from '../../../utils/download';
import ButtonPages from '../../atoms/ButtonPages/ButtonPages';
import { Button } from '../../../index';
import { Page, Document } from 'react-pdf';
import { PDFPageProxy } from 'pdfjs-dist';


export interface IProps {
  /** Файл на просмотр с base64 */
  file: IRequestAttachment;
}

const PDFViewer: React.FC<IProps> = ({ file }: IProps) => {
  /** Всего страниц в документе */
  const [numPages, setNumPages] = useState(1);
  /** Текущая страница */
  const [currentPage, setCurrentPage] = useState(1);

  const [pageWidth, setPageWidth] = useState(0);
  const pdfWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
  }, []);

  useEffect(() => {
    setNumPages(1);
    setCurrentPage(1);
  }, [file]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  // -------------------------------------------------------------------------------------------------------------------

  /** Переключение страницы */
  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  /** Определение ширины страницы */
  const calculatePageWidth = (page: PDFPageProxy) => {
    if (pdfWrapper.current) {
      const blockWidth = pdfWrapper.current?.getBoundingClientRect().width;
      const pageWidth = page.getViewport({ scale: 1 }).width;

      setPageWidth(Math.min(pageWidth, blockWidth - 16));
    }
  };

  const onClickDownload = () => {
    download(file, file.fileName);
  };
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      { file &&
      <div ref={pdfWrapper} className='pdf-document'>
        <Document file={ file.base64 } onLoadSuccess={ onDocumentLoadSuccess }>
          <Page width={pageWidth} pageNumber={ currentPage } onLoadSuccess={calculatePageWidth} />
        </Document>
        <div className='pdf-document__download'>

          <Button
            buttonType='white'
            size='s'
            onClick={onClickDownload}
            endAdornment={<DownloadIcon className='pdf-document__icon'/>}>
            Скачать
          </Button>
        </div>
        <div className='pdf-document__pager'>
          <ButtonPages max={numPages} onChange={onPageChange}/>
        </div>
      </div>
      }
    </>
  );
};

export default PDFViewer;
