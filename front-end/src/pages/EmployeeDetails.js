import React, { useState, useEffect } from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import "./EmployeeDetails.css"
import axios from 'axios';

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({});
    const { eid } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/emp/employees/${eid}`)
            .then(result => {
                setEmployee(result.data);
            })
            .catch(err => console.log(err));
    }, [eid]);

    const handleLogout = () => {
        axios.get('http://localhost:5000/api/v1/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="employee-details-container">
            <div >
                <h3>Employee Details</h3>
            </div>
            <div>
                <div className="details-section">
                    <h4>First Name: {employee.firstname}</h4>
                    <h4>Last Name: {employee.lastname}</h4>
                    <h4>Email: {employee.email}</h4>
                    <h4>Salary: {employee.salary}</h4>
                    <h4>Gender: {employee.gender}</h4>
                    
                </div>
                <div>
                   <Link to="/employee" className="employeeList-link">
                       Employee List 
                   </Link>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;