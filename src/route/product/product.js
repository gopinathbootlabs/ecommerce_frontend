import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import pro from "../img/Bootlabs-logo.gif";
import lap from '../img/lap.png'
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { useNavigate } from 'react-router-dom';

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

    function addToCart(prod_id)
    {
        if(sign()){
            console.log("product_id"+prod_id);

            function getCookieValue(cookieName) {
                const cookieString = document.cookie;
                const cookies = cookieString.split(";").map((cookie) => cookie.trim());

                for (const cookie of cookies) {
                    if (cookie.startsWith(`${cookieName}=`)) {
                        return cookie.substring(cookieName.length + 1); // Extract the value after the "=" sign
                    }
                }
                return null;
            }
            const user_id = getCookieValue("_id");
            console.log("user : "+user_id)

            function getCookieValueToken(cookieName) {
                const cookieString = document.cookie;
                const cookies = cookieString.split(";").map((cookie) => cookie.trim());

                for (const cookie of cookies) {
                    if (cookie.startsWith(`${cookieName}=`)) {
                        return cookie.substring(cookieName.length + 1); // Extract the value after the "=" sign
                    }
                }
                return null;
            }
            const token = getCookieValueToken("token");
            console.log("token : "+token)

            axios.get(`http://127.0.0.1:8888/listcart?id=${user_id}`, {
                headers: {
                    token: `${token}`, // Add the token to the Authorization header
                },
            })
                .then((response) => {
                    response.data.map((data)=>{
                        prodid.push(data.Product_ID);
                      }
                    )
                    console.log(prodid)
                });

            if(prodid.includes(prod_id)) {
                alert("Product is already in cart")
            }
            else
            {
                axios.get(`http://127.0.0.1:8888/addtocart?id=${prod_id}&userID=${user_id}`, {
                    headers: {
                        token: `${token}`, // Add the token to the Authorization header
                    },
                })
                    .then(data => {
                        console.log(data.statusText);
                        if (data.statusText === "OK") {
                            alert("Product added successfully")
                        } else {
                            alert("Please check your credentials");
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 500) {
                            alert("An error occurred while processing your request. Please Re-Login");
                        } else {
                            alert("An error occurred while processing your request.");
                        }

                    })
            }
        }
        else{
            alert("Please log in");
            history('/signin');
        }
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
                                                <div class="dropdown">
                                                    <button class="dropbtn">My Account</button>
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
            <br/><br/><br/>
            <div className="p-3 border-bottom bg-light" style={{marginTop:5}}>

                {/*<div className="rows" style={{marginTop:12}}>*/}
                    <div className="rows" >
                    <div className="col-md-2 text-center">
                        <Link to="/products"><p className="links">All Products</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/laptop"><p>Laptop</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/mobile"><p>Mobile</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/homeappliances"><p>Home Appliances</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/fashion"><p>Fashion</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/"><p>Customer Service</p></Link>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="row-s">
                {showSearchResults ? (
                        <div className="row-s">
                            {searchdata.map((data)=>
                            (
                            <div className="column-s">
                                <div className="card">
                                    <img className="cardimage" src={lap}/>
                                    <p className="ps">{data.oneline}</p>
                                    <p className="ps-star">
                                        {data.rating === 1 ? (
                                            <>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                            </>
                                        ) : data.rating === 2 ? (
                                            <>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>

                                            </>
                                        ) : data.rating === 3 ? (
                                            <>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                            </>
                                        ) : data.rating === 4 ? (
                                            <>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star"></span>
                                            </>
                                        ) : data.rating === 5 ? (
                                            <>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                            </>
                                        ) : null}

                                        <span className="ps-s">price : <span className="spans">&#8377;</span>{ data.product_name }</span></p>
                                    {/*<p className="ps-ss">price : <span className="spans">&#8377;</span>{ data.price }</p>*/}
                                    <div className="row">
                                        <div className="column">
                                            <button className="cart-1" onClick={() => addToCart(data.Product_ID)}>Add to cart</button>
                                            <button  className="view-1" >
                                                {/*<Link to="/view">*/}
                                                View
                                                {/*</Link>*/}
                                            </button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            ))}
                        </div>
                    ):
                    data.map((data)=>
                    (
                        <div className="column-s">
                            <div className="card">
                                <img className="cardimage" src={lap}/>
                                <p className="ps">{data.oneline}</p>
                                <p className="ps-star">
                                    {data.rating === 1 ? (
                                        <>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                        </>
                                    ) : data.rating === 2 ? (
                                        <>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>

                                        </>
                                    ) : data.rating === 3 ? (
                                        <>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>
                                        </>
                                    ) : data.rating === 4 ? (
                                        <>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>
                                        </>
                                    ) : data.rating === 5 ? (
                                        <>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                        </>
                                    ) : null}

                                    <span className="ps-s">price : <span className="spans">&#8377;</span>{ data.price }</span></p>
                                {/*<p className="ps-ss">price : <span className="spans">&#8377;</span>{ data.price }</p>*/}
                                <div className="row">
                                    <div className="column">
                                        <button className="cart-1" onClick={() => addToCart(data.Product_ID)}>Add to cart</button>
                                        <button  className="view-1" >
                                            <Link to="/view">
                                                View
                                            </Link>
                                        </button>

                                </div>
                                </div>

                            </div>
                        </div>
                    ))}
            </div>

        </React.Fragment>

    );

}