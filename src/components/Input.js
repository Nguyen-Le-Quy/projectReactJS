import React from "react";
import PropTypes from "prop-types";
import Validators from "./../helpers/propTypeValidatiors";

const Input = (props) => {
  const {
    type,
    inputRef,
    id,
    label,
    labelSize = 3,
    lastRow = false,
    required = false,
    formField,
    errMessage,
    ...others
  } = props;

  let labelClass = `col-sm-${labelSize} col-form-label ${
    required ? "required" : ""
  }`;

  const inputClass = `form-control ${errMessage ? "is-invalid" : ""}`;

  return (
    <div className={`row ${lastRow ? " " : "mb-2"}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      <div className="col-sm">
        {others["rows"] > 1 ? (
          <textarea
            ref={inputRef}
            id={id}
            {...others}
            {...formField}
            className={inputClass}
          ></textarea>
        ) : (
          <input
            type={type}
            ref={inputRef}
            id={id}
            {...others}
            {...formField}
            className={inputClass}
          />
        )}

        {errMessage ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "email",
    "tel",
    "url",
    "password",
    "number",
    "search",
  ]),
  inputRef: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
  labelSize: Validators.numberBetween(1, 12, false),
  lastRow: PropTypes.bool,
  required: PropTypes.bool,
  formField: PropTypes.object,
  errMessage: PropTypes.string,
  rows: PropTypes.number,
};

export default Input;
