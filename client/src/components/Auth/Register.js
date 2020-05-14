import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/Alert/alertContext';
import AuthContext from '../../context/AuthContext/authContext';
import Alert from '../Layout/Alert';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';
import regPic from '../../images/regPic.svg';

const Register = (props) => {

  const [user, setUser] = useState({
    studentId: '',
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'Student'
  })

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push('/login')
    }

    authContext.clearErrors();
  }, [authContext.error, authContext.isAuthenticated, props.history])

  const { studentId, name, email, password, password2, role } = user;

  const onChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault();
    if (studentId === '' || name === '' || email === '' || password === '' || password2 === '') {
      alertContext.setAlert('danger', 'Please enter all fields')
    } else if (password !== password2) {
      alertContext.setAlert('danger', 'Passwords do not match')
    } else {
      authContext.register({
        studentId,
        name,
        email,
        password,
        role
      })
    }

  }

  return (
    <div className='register'>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: '900px' }} >
        <Alert />
        <h2 className="text-center py-5 font-weight-bold">Account <span className="text-primary">Register</span></h2>
        <div className="row registerCard m-2">
          <div className="col-sm-6">
            <h3 className="text-center text-light py-3">Type In Your Details</h3>
            <form className="form-group" autoComplete="off" onSubmit={onSubmit}>

              <input type="text" className="form-control my-3" name='studentId' value={studentId} placeholder="Student ID" onChange={onChange} />

              <input type="text" className="form-control mb-3" name='name' value={name} placeholder="Full Name" onChange={onChange} />

              <input type="email" className="form-control mb-3" name='email' value={email} placeholder="Email" onChange={onChange} />

              <input type="password" className="form-control mb-3" name='password' value={password} minLength="6" placeholder="Password" onChange={onChange} />

              <input type="password" className="form-control mb-3" name='password2' value={password2} placeholder="Confirm Password" onChange={onChange} />


              <p className="text-light">Role</p>
              <select class="custom-select mb-3 rounded-pill" name="role" value={role} onChange={onChange}>
                <option disabled>Choose...</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
              <button type="submit" className="btn btn-block btn-secondary text-primary">Register Now</button>
            </form>
          </div>
          <div className="col-sm-6 d-none d-sm-block align-self-center">
            <img src={regPic} alt="reg image" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register
