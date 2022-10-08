import React, { memo, useState, useMemo } from 'react';
import Divider from '@Components/Common/Divider';
import InputText from '@Components/Common/InputText';
import InputSwitch from '@Components/Common/InputSwitch';
import InputCheckbox from '@Components/Common/InputCheckbox';
import Stack from '@Components/Layout/Stack';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import {
  FavoriteIcon,
  FavoriteBorderIcon,
  StarBorderIcon,
  StarFillIcon,
} from '@Assets/icons';

function InputTextDemo(): React.ReactElement {
  /* States */
  const [textInput, setTextInput] = useState<string>('');
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const validAccount = useMemo(
    () => (!textInput ? true : textInput.length > 5 && textInput.length < 17),
    [textInput]
  );
  const hint = useMemo(
    () => (validAccount ? '' : 'not valid account'),
    [validAccount]
  );

  /* Functions */
  const handleInputChange = (e: React.ChangeEvent): void => {
    const input = e.target as HTMLInputElement;
    setTextInput(input.value);
  };
  const handleSwitchOn = (): void => {
    setSwitchOn((prev) => !prev);
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsCheck(e.target.checked);
  };

  /* Main */
  return (
    <SpaceWrapper padding={24}>
      <Stack divider={<Divider />}>
        <InputText
          labelText="account (length between 6 to 16 characters)"
          placeholder="here is the placeholder"
          value={textInput}
          error={!validAccount}
          helperText={hint}
          onChange={handleInputChange}
        />
        <Stack direction="row">
          <InputSwitch
            labelPosition="top"
            checked={switchOn}
            onChange={handleSwitchOn}
          >
            label top
          </InputSwitch>
          <InputSwitch
            labelPosition="right"
            checked={switchOn}
            onChange={handleSwitchOn}
          >
            label right
          </InputSwitch>
          <InputSwitch
            labelPosition="bottom"
            checked={switchOn}
            onChange={handleSwitchOn}
          >
            label bottom
          </InputSwitch>
          <InputSwitch checked={switchOn} onChange={handleSwitchOn}>
            label left
          </InputSwitch>
        </Stack>
        <Stack direction="row">
          <InputCheckbox checked={isCheck} onChange={handleCheck} />
          <InputCheckbox
            checked={isCheck}
            onChange={handleCheck}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            iconSvgFill={{ icon: 'LightCoral', checkedIcon: 'LightPink' }}
          />
          <InputCheckbox
            checked={isCheck}
            onChange={handleCheck}
            icon={<StarBorderIcon />}
            checkedIcon={<StarFillIcon />}
            iconSvgFill={{ icon: 'GoldenRod', checkedIcon: 'DarkGoldenRod' }}
          />
        </Stack>
        <Stack direction="row">
          <InputCheckbox
            checked={isCheck}
            onChange={handleCheck}
            labelPosition="top"
          >
            label top
          </InputCheckbox>
          <InputCheckbox
            checked={isCheck}
            onChange={handleCheck}
            labelPosition="right"
          >
            label right
          </InputCheckbox>
          <InputCheckbox
            checked={isCheck}
            onChange={handleCheck}
            labelPosition="bottom"
          >
            label bottom
          </InputCheckbox>
          <InputCheckbox
            checked={isCheck}
            onChange={handleCheck}
            labelPosition="left"
          >
            label left
          </InputCheckbox>
        </Stack>
      </Stack>
    </SpaceWrapper>
  );
}

export default memo(InputTextDemo);
