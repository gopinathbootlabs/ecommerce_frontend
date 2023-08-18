import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../style.css";
import {Link, useNavigate} from "react-router-dom";
import pro from "../img/Bootlabs-logo.gif";
import lap from '../img/lap.png'
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
export default function Product()
{
    const history = useNavigate();
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [data,setData] = useState([])
    const [search, setSearch] = useState("")
    const [searchdata, setSearchdata] = useState("")
    const prodid = [];
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8888/users/productview`)
            .then((response) => {
                setData(response.data)
            });
    },[])
    function sign()
    {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
        return cookies.some((cookie) => cookie.startsWith(`_id`));
    }
    function logout()
    {
        document.cookie = `_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        alert("Successfully logged out ")
    }
    const searchData = (e) =>
    {
        e.preventDefault();
        let errors = {};
        if (Object.keys(errors).length === 0) {
            axios.get(`http://127.0.0.1:8888/users/search?name=${search}`)
                .then(data => {
                    console.log(data.data.length);
                    if(data.statusText==="OK"){
                        setSearchdata(data.data)
                        setShowSearchResults(true);
                        // setResponse(data.data);
                        // history('/');
                    }
                    else{
                        alert("Please check your credentials");
                    }
                })
        }
    }
    return (
        <React.Fragment>
            <header className="p-3 border-bottom bg-light" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-md-3 text-center">

                            <img className="img" src={pro} ></img>

                        </div>
                        <div className="col-md-5">

                            <form onSubmit={searchData} className="search">
                                <div className="input-group">
                                    <input
                                        id="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)} required
                                        name="search"
                                        type="text"
                                        className="form-control"
                                        placeholder="Search"
                                        required
                                    />
                                    <label className="visually-hidden" htmlFor="search"></label>
                                    <button
                                        className="btn btn-primary text-white"
                                        type="submit"
                                        aria-label="Search"
                                    >
                                        <IconSearch />
                                    </button>
                                </div>
                            </form>
                            {/*<Search responseData={response} />*/}
                        </div>
                        <div className="col-md-4">

                            <div className="position-relative d-inline me-3">
                                <Link to="/cart" className="btn btn-primary">
                                    <IconCart3 className="i-va" />
                                    <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                                        {/*2*/}
                                    </div>
                                </Link>
                            </div>&emsp;
                            {
                                (
                                    sign()?(
                                            <>
                                                <div className="dropdown">
                                                    <button className="dropbtn">My Account</button>
                                                    <div className="dropdown-content">
                                                        <Link to="/">My Profile</Link>
                                                        <Link to="/">Orders</Link>
                                                        <Link to="/">Notification</Link>
                                                        <a onClick={logout} href="/" >Log out</a>
                                                    </div>
                                                </div>
                                            </>
                                        ):
                                        (
                                            <>
                                                <div className="btn-group">
                                                    <button className="buttons"><Link to="/signin">Sign In</Link></button>
                                                </div>
                                            </>
                                        )
                                )
                            }

                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );

}