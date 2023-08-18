import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import pro from "../img/Bootlabs-logo.gif";
import dell from "../img/Dell.webp"
import lap from "../img/Laptops.webp"
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { useNavigate } from 'react-router-dom';
export default function Signin()
{
    const history = useNavigate();
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [pass, setPass] = useState("")
    const [cpass, setCpass] = useState("")
    const [formErrors, setFormErrors] = useState({
        fname: '',lname:'',mail:'',phone:'',pass:'',
    });
    var pattern = /^\S+$/;
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        let errors = {};
        if (fname.length < 3) {
            errors.fname = 'First name must be at least 3 characters long.';
        }
        if(fname[0] ==' ')
        {
            errors.fname = 'whitespace not allowed';
        }
        if (lname.length < 1) {
            errors.fname = 'Last name must be at least 1 character long.';
        }
        if(lname[0] ==' ')
        {
            errors.lname = 'whitespace not allowed';
        }
        if (phone.length < 10) {
            errors.phone = 'Phone number must be 10 digit';
        }
        if (phone.length > 10) {
            errors.phone = 'Phone number must be 10 digit';
        }
        if(mail[0] ==' '){
            errors.mail ='whitespace not allowed'
        }
        if (pass.length < 8) {
            errors.pass = 'Password must be at least 8 characters long';
        }
        if (pass !== cpass)
        {
            errors.cpass = 'Password not match'
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            axios.post(`http://127.0.0.1:8888/users/signup` ,{ first_name:fname,last_name:lname,email:mail,phone:phone,password:pass})
                .then((data) => {
                    console.log(data.status);
                    if(data.status===201){
                        alert("Signed Up Successfully");
                        history('/signin');
                    }
                    else{
                        alert("Please check your email and phone number");
                    }
                })
                .catch((error) => {
                    // Handle incorrect login response here
                    if (error.response.status === 401) {
                        alert("User or phone number already in use");
                    } else {
                        console.log(error.response.data);
                        alert("User or phone number already in use");
                    }
                });
        }
    }
    return (
        <React.Fragment>
            <header className="p-3 border-bottom bg-light">
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-md-7 text-center">

                            <img className="img" src={pro} ></img>

                        </div>

                    </div>
                </div>
            </header>
            <div className="container my-3">
                <div className="row border">
                    <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
                        <Link to="/">
                            <img
                                src={dell}
                                alt="..."
                                className="img-fluid"
                            />
                        </Link>
                        <Link to="/">
                            <img
                                src={lap}
                                alt="..."
                                className="img-fluid"
                            />
                        </Link>
                    </div>
                    <div className="col-md-6 p-3">
                        <form onSubmit={handleSubmit} autocomplete="on">
                        <h4 className="text-center">Sign Up</h4>

                        <label className="labelss">First Name: </label> <input className="uplabeldata" type="text" value={fname} onChange={(e) => setFname(e.target.value)} required placeholder="First name"
                        // onChange={(e) => setName(e.target.value)} required
                    /><br/>
                        {formErrors.fname && <p className="error">{formErrors.fname}</p>}
                        <label className="labelss">Last Name: </label> <input className="uplabeldata" type="text" value={lname} onChange={(e) => setLname(e.target.value)} required placeholder="Last name"
                     /><br/>
                            {formErrors.lname && <p className="error">{formErrors.lname}</p>}
                        <label className="labelss">Email Id: </label> <input className="uplabeldata" type="email" value={mail} onChange={(e) => setMail(e.target.value)} required placeholder="Mail Id"
                    /><br/>
                            {formErrors.mail && <p className="error">{formErrors.mail}</p>}
                        <label className="labelss">Mobile No: </label> <input className="uplabeldata" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Mobile no"
                    /><br/>
                            {formErrors.phone && <p className="error">{formErrors.phone}</p>}
                        <label className="labelss">Enter Password: </label><input className="uplabeldata" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required placeholder="********"
                    />
                            {formErrors.pass && <p className="error">{formErrors.pass}</p>}
                            <label className="labelss">Confirm Password: </label><input className="uplabeldata" type="password" value={cpass} onChange={(e) => setCpass(e.target.value)} required placeholder="********"
                        />
                            {formErrors.cpass && <p className="error">{formErrors.cpass}</p>}
                        <button type="submit" className="signinbutton">
                            {/*<Link className="sign" to="/">*/}
                                Sign Up
                            {/*</Link>*/}
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );

}