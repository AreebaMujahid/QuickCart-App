import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

// Validation schema using Yup
const FormSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("First Name is required"),
    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Last Name is required"),
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
            <h2>Sign Up</h2>
            <Formik
                initialValues={{ firstName: "", lastName: "", email: "" ,phoneno:""}}
                validationSchema={FormSchema}
                onSubmit={(values, { setSubmitting , resetForm }) => {
                    console.log(values); // Handle form submission
                    let signup = JSON.parse(localStorage.getItem("signup")) || [];
                    // Check if the email already exists in the users array
                    const userExists = signup.some(signup => signup.email === values.email);

                    if (userExists) {
                        alert("You already have an account, please login instead of signing up.");
                        setSubmitting(false);
                    }
                    else{
                        // Add the new signup data to the users array
                    signup.push(values);

                    // Store the updated users array in localStorage
                    localStorage.setItem("signup", JSON.stringify(signup));

                    console.log("Signup users stored in local storage:", signup); // For debugging

                    setTimeout(() => {
                        alert("Form submitted successfully and data stored in localStorage!");
                        setSubmitting(false);
                        resetForm(); // Reset form after submission
                    }, 500); // Simulate API request
                
                }}

                    }

                    
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-danger"
                            />
                        </div>

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
