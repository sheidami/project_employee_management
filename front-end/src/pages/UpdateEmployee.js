import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateEmployee.css";

const UpdateEmployee = () => {
    const { eid } = useParams();
    const [employee, setEmployee] = useState({
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
       
        axios.get(`http://localhost:5000/api/v1/emp/employees/${eid}`)
            .then(result => {
                setEmployee(result.data); 
                
            })
            .catch(err => console.log(err));
    }, [eid]);

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
        axios.put(`http://localhost:5000/api/v1/emp/employees/${eid}`, employee)
            .then(result => {
                if(result.data) {
                    alert('Employee updated successfully!');
                    navigate('/employee');
                } else {
                    alert(result.data.error);
                }
            })
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
       
        navigate('/employee');
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h3 className="header">Update Employee</h3>
                <form  onSubmit={handleSubmit} className="form">
                    <div>
                        <label className="label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            id="inputFirstName"
                            placeholder="Enter First Name"
                            value={employee.firstname}
                            onChange={(e) =>
                                setEmployee({ ...employee, firstname: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label className="label">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            id="inputLastName"
                            placeholder="Enter Last Name"
                            value={employee.lastname}
                            onChange={(e) =>
                                setEmployee({ ...employee, lastname: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label className="label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="input-field"
                            id="inputEmail"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={employee.email}
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="label">Salary:</label>
                        <input
                            type="text"
                            className="input-field"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            value={employee.salary}
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div>
                    <label className="label">Gender:</label>
                    <select
                        className="select-field"
                        id="inputGender"
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
                        <button type="submit" onClick={handleSubmit} className="submit-button">
                            Update Employee
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployee;