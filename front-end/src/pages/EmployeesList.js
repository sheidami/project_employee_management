import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./EmployeesList.css";
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`)
            .then(result => {
                if (result.data.length > 0) {
                    setEmployees(result.data);
                } else {
                    alert('Error deleting employee');
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/emp/employees")
            .then((result) => {
                setEmployees(result.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
    
        navigate('/');
      };

    return (
        <div className="employee-list-container">
            <h1>Employee List</h1>
            <Link to="/add_employee" className="add-employee-link">
                Add Employee
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td className="actions-column">
                                <Link to={`/view-employee/${employee._id}`} className="viewButton">View</Link>
                                <Link to={`/update-employee/${employee._id}`} className="editButton">Update</Link>
                                <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleLogout} className="logOutButton">Log Out</button>
        </div>
    );
}

export default EmployeeList;