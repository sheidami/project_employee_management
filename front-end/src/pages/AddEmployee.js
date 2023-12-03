import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        firstname: "",
        lastname: "",
        email: "",
        salary: "", 
        gender: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !employee.firstname ||
            !employee.lastname ||
            !employee.email ||
            !employee.salary ||
            !employee.gender
          ) {
            setError("All fields are required");
            return;
          }

        axios.post('http://localhost:5000/api/v1/emp/employees', employee)
            .then(result => {
                if(result.data) {
                    alert('Employee updated successfully!');
                    navigate('/employee');
                } else {
                    alert(result.data.error);
                }
            })

    };

    const handleCancel = () => {
        
        navigate('/employee');
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h3 className="header">Add Employee</h3>
                <form className="form">
                    <div >
                        <label className="label">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            className="input-field"
                            placeholder="Enter First Name"
                            onChange={(e) =>
                                setEmployee({ ...employee, firstname: e.target.value })
                            }
                        />
                    </div>
                    <div >
                        <label className="label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="input-field"
                            placeholder="Enter Last Name"
                            onChange={(e) =>
                                setEmployee({ ...employee, lastname: e.target.value })
                            }
                        />
                    </div>
                    <div >
                        <label className="label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="input-field"
                            id="inputEmail"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="label">Salary</label>
                        <input
                            type="text"
                            className="input-field"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div>
                    <label className="label">Gender</label>
                    <select
                        id="inputGender"
                        className="select-field"
                        onChange={(e) =>
                            setEmployee({ ...employee, gender: e.target.value })
                        }
                    >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="submit-button" onClick={handleSubmit}>
                            Add Employee
                        </button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;