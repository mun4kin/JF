import React, { useEffect, useState } from 'react';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export interface IHeadingData {
    id: string;
    htmlNode: HTMLElement;
}

export interface IUseTableOfContentsProps {
    container?: React.RefObject<HTMLElement>;
    /* Селектор для отслеживаемых заголовков/элементов */
    selector: string;
    /* Доп. отступ сверху для активации элемента (помимо отступа контейнера) */
    additionalOffset?: number;
    /* Доп. зависимости для запуска парсинга тайтлов */
    deps?: any[];
}

export interface IActiveTitle {
  activeTitleId?: string;
  activeIndex: number;
}

const useTableOfContents = ({ container, selector, additionalOffset = 0, deps = [] }: IUseTableOfContentsProps): IActiveTitle => {
  const [activeTitle, setActiveTitle] = useState<IActiveTitle>({
    activeIndex: 0,
    activeTitleId: undefined
  });
  const [titlesNodes, setTitlesNodes] = useState<IHeadingData[]>([]);

  const parseTitles = () => {
    const htmlNodes: HTMLElement[] = Array.from(document.querySelectorAll(selector));

    return htmlNodes.map((node) => ({
      id: node.id,
      htmlNode: node,
    }));
  };

  const findActiveNode = () => {
    if (titlesNodes.length) {

      const wrapper = container?.current;
      const offsets = titlesNodes.map((node) => node.htmlNode.getBoundingClientRect().top);

      let activeIndex = offsets.findIndex(offset => {
        return offset > (wrapper?.offsetTop || 0) + additionalOffset;
      });

      /** Активируем последний заголовок если вся страница проскролена */
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
        activeIndex = titlesNodes.length - 1;

        setActiveTitle({
          activeTitleId: titlesNodes[activeIndex].id,
          activeIndex
        });

        return;
      }

      if (activeIndex === -1) {
        activeIndex = titlesNodes.length - 1;
      } else if (activeIndex > 0) {
        activeIndex -= 1;
      }

      setActiveTitle({
        activeTitleId: titlesNodes[activeIndex].id,
        activeIndex
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTitlesNodes(parseTitles());
    });
  }, [selector, ...deps]);

  useEffect(() => {
    if (!activeTitle.activeTitleId && titlesNodes.length) {
      setActiveTitle({
        activeTitleId: titlesNodes[0].id,
        activeIndex: 0
      });
    }

    const subscription = fromEvent(window, 'scroll').pipe(
      debounceTime( 300),
      map(() => findActiveNode())
    ).subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [titlesNodes]);


  return activeTitle;
};

export default useTableOfContents;
