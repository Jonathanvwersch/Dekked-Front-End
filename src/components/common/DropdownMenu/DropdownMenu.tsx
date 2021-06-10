import React, { useContext } from "react";
import Select, { ActionMeta, OptionTypeBase } from "react-select";
import { ThemeContext } from "styled-components";
import { DropDownType } from "../../../shared";
import { customStyles } from "./DropdownMenu.styles";

export interface DropdownMenuProps {
  options: DropDownType[];
  value?: OptionTypeBase | readonly OptionTypeBase[] | null | undefined;
  onChange?: (
    value: OptionTypeBase | null,
    actionMeta: ActionMeta<OptionTypeBase>
  ) => void;
  defaultValue?: OptionTypeBase | readonly OptionTypeBase[] | null | undefined;
  id?: string;
  label?: string;
  error?: boolean;
  message?: string;
  disabled?: boolean;
  ariaLabel?: string;
  selectMessage?: string;
  selectMessageRaw?: string;
  isLoading?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  onChange,
  value,
  isLoading,
  defaultValue,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <Select
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      value={value}
      defaultValue={defaultValue}
      styles={customStyles(theme)}
    />
  );
};

export default DropdownMenu;
