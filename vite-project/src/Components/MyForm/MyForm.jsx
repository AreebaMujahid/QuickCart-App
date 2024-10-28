import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setRole } from "../../redux/slices/role";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from 'react-router-dom';


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
        .required("Phone number is required"),
    role: Yup.string().required("Role is required") // Add role to validation schema
});

function MyForm() {
    const dispatch = useDispatch(); // Use dispatch to set role in Redux
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1>QuickCart</h1>
            <h2>Sign Up</h2>
            <Formik
                initialValues={{ firstName: "", lastName: "", email: "", phoneno: "", role: "" }} // Add role to initial values
                validationSchema={FormSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        const response = await fetch("http://localhost:4001/Signup", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                        });

                        if (response.ok) {
                            const result = await response.json();
                            dispatch(setRole(values.role)); // Dispatch role to Redux store
                            console.log("Role set in Redux:", values.role);

                            alert("Form submitted successfully and data stored on the server!");
                            resetForm();
                            navigate("/Home");
                        } else {
                            alert("Signup failed. Please try again.");
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        alert("There was an error submitting the form.");
                    }
                    setSubmitting(false);
                }}
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
                            <label htmlFor="phoneno">Phone Number</label>
                            <Field
                                type="text"
                                name="phoneno"
                                placeholder="Enter phone number"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="phoneno"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <Field as="select" name="role" className="form-control">
                                <option value="">Select role</option>
                                <option value="Admin">Admin</option>
                                <option value="Merchant">Merchant</option>
                                <option value="User">User</option>
                            </Field>
                            <ErrorMessage
                                name="role"
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
