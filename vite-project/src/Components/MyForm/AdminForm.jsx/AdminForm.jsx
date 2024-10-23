import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

// Validation schema using Yup
const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .matches(/^\d{4}$/, "your password is four digits")
        .required("password is required")
});

function AdminForm() {
    return (
        <div className="container mt-5">
            <h1>QuickCart</h1>
            <h2>Login Here</h2>
            <Formik
                initialValues={{ email: "" ,password:""}}
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
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="password"
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

export default AdminForm;
