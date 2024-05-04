import React from "react";
import FormikInput from "../Formik/FormikInput";
import { Form, Formik } from "formik";

const MovieTicket = ({
  buttonName = "Create Movie Ticket",
  onSubmit = () => {},
  movieTicket = {},
  isLoading = false,
}) => {
  let initialValues = {
    movieName: movieTicket.movieName || "",
    person: movieTicket.person || 1,
    price: movieTicket.price || 1,
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <FormikInput
                name="movieName"
                label="Movie Name"
                type="text"
                required={true}
                onChange={(e) => {
                  formik.setFieldValue("movieName", e.target.value);
                }}
              ></FormikInput>
              <FormikInput
                name="person"
                label="Person"
                type="number"
                required={true}
                onChange={(e) => {
                  formik.setFieldValue("person", e.target.value);
                }}
              ></FormikInput>
              <FormikInput
                name="price"
                label="Price"
                type="number"
                required={true}
                onChange={(e) => {
                  formik.setFieldValue("price", e.target.value);
                }}
              ></FormikInput>
              <button type="submit">
                {isLoading ? (
                  <div>{buttonName}...</div>
                ) : (
                  <div>{buttonName}</div>
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MovieTicket;
