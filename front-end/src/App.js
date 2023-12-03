import AddEmployee from './pages/AddEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeList from './pages/EmployeesList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage'
import UpdateEmployee from './pages/UpdateEmployee';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom';


function App() {
  const PrivateRoute = ({children}) => {
    return localStorage.getItem("valid") ? children : <Navigate to="/" />
  }
  
  return (
    <BrowserRouter>
    <div className="App">
     
      <div id="page-body">
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/employee' element={<PrivateRoute><EmployeeList/></PrivateRoute>}/>
          <Route path='/view-employee/:eid' element={<PrivateRoute><EmployeeDetails/></PrivateRoute>}/>
          <Route path='/add_employee' element={<PrivateRoute><AddEmployee/></PrivateRoute>}/>
          <Route path='/update-employee/:eid' element={<PrivateRoute><UpdateEmployee/></PrivateRoute>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
