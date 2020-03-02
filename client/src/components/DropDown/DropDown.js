import React from "react";
import PropTypes from "prop-types";
import Select, {
  components,
  createFilter as rsCreateFilter
} from "react-select";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown as fasCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./DropDown.scss";

const createFilter = filter => {
  if (typeof filter === "object") {
    return rsCreateFilter(filter);
  }
  return filter;
};

const StyledSelect = styled(Select)`
  font-family: "Open sans";
  .ufg-dropdown__control {
    border-radius: 3px;
    height: 36px;
    min-height: 36px;
    border: 1px solid #dddddd;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap
  }
  .ufg-dropDown__value-container,
  .ufg-dropDown__value-container--has-value {
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap
  }
  .ufg-dropdown__control:hover,
  .ufg-dropdown__control--is-focused {
    border: 1px solid #002e5d;
    box-shadow: 0 0 1px 0 #002e5d;
  }
  .ufg-dropdown__indicator-separator {
    display: none;
  }
  .ufg-dropdown__menu {
    border-radius: 3px;
    font-family: "Open sans";
    position: absolute;
    top: 26px;
    width: 103%;
    option {
    }
  }
`;

const StyledDropdownIndicator = styled(FontAwesomeIcon)`
  color: #a2a2a2;
`;

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <StyledDropdownIndicator icon={fasCaretDown} />
    </components.DropdownIndicator>
  );
};

const Dropdown = props => {
  const {
    id,
    multi,
    name,
    options,
    value,
    placeholder,
    filter,
    onChange,
    ...rest
  } = props;

  // TODO: Handle support for multi select which could be array of strings or array of objects (map over them if strings?)
  const selection =
    typeof value === "string" ? options.find(o => o.value === value) : value;

  return (
    <StyledSelect
      id={id}
      name={name}
      options={options}
      value={selection}
      placeholder={placeholder}
      filterOption={createFilter(filter)}
      isMulti={multi}
      onChange={onChange}
      classNamePrefix={"ufg-dropdown"}
      components={{
        DropdownIndicator
      }}
      // eslint-disable-next-line react/jsx-no-bind
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#002e5d",
          // option hover background color
          primary25: "#f3f3f3",
          // option on select background color
          primary50: "#f3f3f3"
        }
      })}
      // TODO: Determine what all needs exposed for our usages
      {...rest}
    />
  );
};

Dropdown.propTypes = {
  /** css classes to apply to dropdown */
  className: PropTypes.string,
  /** Html id for the dropdown */
  id: PropTypes.string,
  /** Html name for the dropdown */
  name: PropTypes.string,
  /** Array of options */
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Current value of the dropdown. Can be either string value or an option object with value and label properties */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ]),
  /** Allow multiple selections */
  multi: PropTypes.bool,
  /** Function to handle value change event */
  onChange: PropTypes.func.isRequired,
  /** Filter config object or function to use for filtering options by text input
   * Default settings:
   * - ignoreCase: true,
   * - ignoreAccents:  true,
   * - stringify: option => `${option.label} ${option.value}`,
   * - trim: true,
   * - matchFrom: "any"
   *
   * Customer filter function needs to have the signature:
   * filter = (Option, String) => Bool
   */
  filter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      ignoreCase: PropTypes.bool,
      ignoreAccents: PropTypes.bool,
      stringify: PropTypes.func,
      trim: PropTypes.bool,
      matchFrom: PropTypes.oneOf(["any", "start"])
    })
  ]),
  /** Whether users are able to search via text input */
  isSearchable: PropTypes.bool
};

Dropdown.defaultProps = {
  placeholder: "-- Select One --"
};

export default Dropdown;