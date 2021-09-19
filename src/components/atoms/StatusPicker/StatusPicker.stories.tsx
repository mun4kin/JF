import React, { useRef, useState } from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';
import StatusPicker, { IPickerProps } from './StatusPicker';


export default {
  title: 'Form Controls/Status Picker',
  component: StatusPicker,
};


export const statusPicker = (args: IPickerProps) => {

  const indexRef = useRef([]);

  const statusHandler = (pos: number) => (value: number) => {
    setPosition(pos);

    if (pos === position) {
      indexRef.current[indexRef.current.length - 1] = {
        p: pos,
        v: value
      };
    } else {
      indexRef.current.push({
        p: pos,
        v: value
      });
    }

    const val = pickedValues.find(index => index === value);

    if (!val && !indexRef.current.find(item => item.p === pos)) {
      setPickedValues([...pickedValues, value]);
    } else if (!val) {
      console.log(indexRef.current);
      console.log('bbb');
      setPickedValues([value]);
    }


  };
  const [position, setPosition] = useState(-1);
  const [pickedValues, setPickedValues] = useState<Array<number>>([]);
  const [pickedId, setPickedId] = useState<number>(0);
  console.log(indexRef.current);

  return (
    <Story name='Status Picker' description='Status Picker элемент'>
      <StoryItem description='состояние оцeнщика'>
        <StoryRow >
          <StatusPicker {...args} getRate={statusHandler(0)} pickedValues={pickedValues} pickedId={position === 0 ? pickedId : pickedValues} />
          <StatusPicker {...args} getRate={statusHandler(1)} pickedValues={pickedValues} pickedId={position === 1 ? pickedId : pickedValues} />
          <StatusPicker {...args} getRate={statusHandler(2)} pickedValues={pickedValues} pickedId={position === 2 ? pickedId : pickedValues} />
          <StatusPicker {...args} getRate={statusHandler(3)} pickedValues={pickedValues} pickedId={position === 3 ? pickedId : pickedValues} />

        </StoryRow>
      </StoryItem>
    </Story>
  );
};
