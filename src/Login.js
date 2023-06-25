import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate=useNavigate();
const formik = useFormik({
    initialValues:{
        email :"",
        password:""
    },
    onSubmit:async(values)=>{
        try {
            const login =await axios.post("https://diary-w5bq.onrender.com/login",values);
        
            window.localStorage.setItem("token",login.data.token)
            navigate("/portal")
        } catch (error) {
            alert("Enter Email And Password wrong")
        }
    }
})

  return (
    <div className="login-page">
            <div className=" shadow-lg">
            <div>
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="user">
                                    <div className="form-group">
                                        <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} className="form-control form-control-user"
                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                            placeholder="Enter Email Address..."  autoComplete='off'/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password"  autoComplete='off'/>
                                    </div>

            

                                    <input type={"submit"} value="submit" className="btn btn-primary btn-user btn-block"/>
                                       
                                    <hr/>
                                    
                                </form>
                                <hr/>
                                <div className="text-center">
                                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                                </div>
                                <div className="text-center">
                                    <Link className="small" to="/signup">Create an Account!</Link>
                                </div>
                            </div>
                        </div>
            </div>
</div>

  )
}

export default Login;