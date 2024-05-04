import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "./FormikInput";
import * as yup from "yup";

const FullFormikForm = () => {
  let initialValues = {
    fullName: "",
  };
  let onSubmit = (value, other) => {
    console.log(value);
  };
  let validationSchema = yup.object({
    fullName: yup.string().required("Full Name is required."),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <FormikInput
                name="firstName"
                label="First Name"
                type="text"
                onChange={(e) => {
                  Formik.setFieldValue("firstName", e.target.value);
                }}
                placeholder="firstName"
                required={true}
              ></FormikInput>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FullFormikForm;
