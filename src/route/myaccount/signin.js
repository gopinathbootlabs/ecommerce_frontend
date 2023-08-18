import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../style.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import pro from "../img/Bootlabs-logo.gif";
import dell from "../img/Dell.webp"
import lap from "../img/Laptops.webp"
import { GoogleLogin } from '@react-oauth/google';
import {useGoogleLogin} from "@react-oauth/google"
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { useNavigate } from 'react-router-dom';
import googleimg from "../img/google.png"

export default function Signin()
{
    const history = useNavigate();
    const [pass, setPass] = useState("")
    const [mail, setMail] = useState("")
    const [formErrors, setFormErrors] = useState({
        pass:'',
    });
    const handleSubmit = (e) =>
   {
    e.preventDefault();
    let errors = {};
    if (pass.length < 8) {
        errors.pass = 'Password must be at least 8 characters long';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
        axios.post(`http://127.0.0.1:8888/users/login` ,{ email:mail,password:pass})
            .then((data) => {
                console.log(data)
                console.log(data.status);
                console.log(data.data._id);
                console.log(data.data.token)
                if(data.statusText==="OK"){
                    alert("Signed in Successfully");
                    document.cookie = `_id=${data.data._id}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/;`;
                    document.cookie = `token=${data.data.token}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/;`;
                    history('/');
                }
                else{
                    alert("Please check your credentials");
                }
            })
            .catch((error) => {
                // Handle incorrect login response here
                if (error.response.status === 500) {
                    alert("Incorrect email or password. Please check your credentials.");
                } else {
                    alert("An error occurred while processing your request.");
                }
            });
    }
     }


    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => setUser(tokenResponse.access_token),
    });

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    setProfile(res.data);
                    console.log(profile.email);
                })
                .catch((err) => console.log(err));

            const responsedata={
                id:profile.id,
                email:profile.email,
                verified_email:profile.verified_email,
                name:profile.name,
                given_name:profile.given_name,
                family_name:profile.family_name,
                picture:profile.picture,
                locale:profile.locale,
                hd:profile.hd
            }

            axios.post('http://127.0.0.1:8888/callback',responsedata)
        }
    },[user]);
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

                            <img
                                src={dell}
                                alt="..."
                                className="img-fluid"
                            />
                           <img
                                src={lap}
                                alt="..."
                                className="img-fluid"
                            />
                    </div>
                    <div className="col-md-6 p-3">
                        <form onSubmit={handleSubmit} autoComplete="on">

                        <h4 className="text-center">Log In</h4>

                        <label className="labels">Email: </label><br/> <input className="labeldata" value={mail} type="email" onChange={(e) => setMail(e.target.value)} required placeholder="Enter your email-id"
                                             // onChange={(e) => setName(e.target.value)} required
                        />
                        <label className="labelss">Password: </label><br/> <input className="labeldata" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required placeholder="*********"
                        // onChange={(e) => setName(e.target.value)} required
                    />
                            {formErrors.pass && <p className="error">{formErrors.pass}</p>}
                            <button type ="submit" className="signinbutton">
                           Log In
                            </button>
                                {/*<hr className="hrtag"/>*/}
                                {/*    <span style="font-weight: bold;">or</span>*/}
                                {/*    <hr className="hrtag1"/>*/}
                            <hr style={{width:380, marginLeft:90}}/>
                        </form>
                        <button type ="submit" className="googlesigninbutton" onClick={() => login()}>
                            <span><img className="googleimg" src={googleimg}/></span>
                            &nbsp;&nbsp;Continue with Google
                        </button>


                        <Link to="/">
                            <p className="forgot"><u>Forgotten your password?</u></p>
                        </Link>
                        <span className="createaccount">Don't have an account?</span>
                        <Link to="/signup">
                            <p className="createaccounts"><u>Sign up</u></p>
                        </Link>
<br/>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
  
}