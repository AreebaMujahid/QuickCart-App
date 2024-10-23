import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

// Validation schema using Yup
const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    phoneno: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
        .required("Phone number is required")
});

function MyForm() {
    return (
        <div className="container mt-5">
            <h1>QuickCart</h1>
            <h2>Login Here</h2>
            <Formik
                initialValues={{ email: "" ,phoneno:""}}
                validationSchema={FormSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values); // Handle form submission
                    setTimeout(() => {
                        alert("Form submitted successfully!");
                        setSubmitting(false);
                    }, 500); // Simulate an API request
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneno">Phone no</label>
                            <Field
                                type="phoneno"
                                name="phoneno"
                                placeholder="Enter phone no"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="phoneno"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default MyForm;
