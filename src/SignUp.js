import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()
    const myFormik = useFormik({
       initialValues: {
          username: "",
          email: "",
         password:"",
        
       },
       validate: (values) => {
          let errors = {}
 
          if (!values.username) {
             errors.username = "please enter a Name";
          } else if (values.username.length < 3) {
             errors.username = "Length should be greater than 3";
          } else if (values.username.length >= 20) {
             errors.username = "Length should be less than 20";
          }
 
           


          if (!values.email) {
             errors.email = "please enter a email"
          }
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
             errors.email = "please enter a valid email"
          }

          if (!values.password) {
            errors.password = "please enter a Password";
         } else if (values.password.length < 6) {
            errors.password = "Length should be greater than 6";
         } else if (values.password.length >= 20) {
            errors.password = "Length should be less than 20";
         }
 
          return errors
       },
       onSubmit: async (values) => {
 
          try {
             setLoading(true)
             await axios.post("https://diary-w5bq.onrender.com/register", values)
             
             navigate("/")
 
          }
          catch (error) {
             console.log(error);
             alert("validation Error");
             setLoading(false)
          }
 
 
 
       },
    })
 
 
 
    return (
<div className='signup'>
<div className="shadow-lg">
                <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form className="user" onSubmit={myFormik.handleSubmit}>
                        <div className="form-group row">
                            <div className="col-sm-12 mb-3 mb-sm-0">
                                <input name='username' value={myFormik.values.username} onChange={myFormik.handleChange} type={"text"} className={`form-control form-control-user ${myFormik.errors.username ? "is-invalid" : "is-valid"}`}  id="exampleFirstName"
                                    placeholder="Enter Your Name"  autoComplete='off'/>
                                    <span style={{ color: "red" }}>{myFormik.errors.username}</span>
                            </div>
                            
                        </div>
                        <div className="form-group">
                            <input name='email' value={myFormik.values.email} onChange={myFormik.handleChange} type={"text"} className={`form-control form-control-user ${myFormik.errors.email ? "is-invalid" : "is-valid"}`}  id="exampleInputEmail"
                                placeholder="Email Address"  autoComplete='off'/>
                                <span style={{ color: "red" }}>{myFormik.errors.email}</span>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12 mb-3 mb-sm-0">
                                <input  name='password' value={myFormik.values.password} onChange={myFormik.handleChange} type={"text"} className={`form-control form-control-user ${myFormik.errors.password ? "is-invalid" : "is-valid"}`} 
                                    id="exampleInputPassword" placeholder="Password"  autoComplete='off'/>
                                    <span style={{ color: "red" }}>{myFormik.errors.password}</span>
                            </div>
                        </div>
                        <input disabled={isLoading} type={"submit"} value={isLoading ? "Loding..." : "Register Account"} className='btn btn-primary btn-user btn-block' />
                        {/* <Link to="login.html" className="btn btn-primary btn-user btn-block">
                            Register Account
                        </Link> */}
                    </form>
                    <hr/>
                    <div className="text-center">
                        
                        <Link className="small" to="/">Already have an account? Login!</Link>
                    </div>
                </div>
            </div>

</div>

    )
}

export default SignUp