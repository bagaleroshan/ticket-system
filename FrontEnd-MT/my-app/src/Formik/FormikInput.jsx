import React from "react";
import { Field } from "formik";
const FormikInput = ({ name, label, type, onChange, required, ...props }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
          return (
            <div>
              <label htmlFor={name}>
                {label}
                {required ? <span style={{ color: "red" }}>*</span> : null}
              </label>
              <input
                {...field}
                {...props}
                id={name}
                type={type}
                value={meta.value}
                onChange={onChange ? onChange : field.onChange}
              ></input>
              {meta.touched && meta.error ? (
                <div style={{ color: "red" }}>{meta.error}</div>
              ) : null}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default FormikInput;
