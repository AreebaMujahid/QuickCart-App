import React, { useState, useEffect } from "react";

const SignupDetails = () => {
    //const [users, setUsers] = useState([]);
    const [signup, setSignup] = useState([]);
    


    // Function to get users from localStorage
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("signup")) || [];
        setSignup(storedUsers);
    }, []); // This runs once when the component mounts

    return (
        <div className="container mt-5">
            <h2>Signup Details</h2>
            {signup.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {signup.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneno}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No signups yet.</p>
            )}
        </div>
    );
};

export default SignupDetails;
