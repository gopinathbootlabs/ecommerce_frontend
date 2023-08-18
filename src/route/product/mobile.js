import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import pro from "../img/Bootlabs-logo.gif";
import dell from "../img/Dell.webp"
import mobile from '../img/mob.png'
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
export default function Product()
{
    const [data,setData] = useState([])
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
    return (
        <React.Fragment>
            <header className="p-3 border-bottom bg-light" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-md-3 text-center">

                            <img className="img" src={pro} ></img>

                        </div>
                        <div className="col-md-5">

                            <form action="#" className="search">
                                <div className="input-group">
                                    <input
                                        id="search"
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
                                                        <a href="#">Link 1</a>
                                                        <a href="#">Link 2</a>
                                                        <a href="#">Link 3</a>
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
            </header>            <br/><br/><br/>

            <div className="p-3 border-bottom bg-light" style={{marginTop:5}} >
                <div className="rows">
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
                {data.map((data)=>
                    (
                        data.category === "mobile" ?(
                            <>
                                <div className="column-s">
                                    <div className="card">
                                        <img className="cardimage" src={mobile}/>
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

                                            <span className="ps-s">price : <span
                                                className="spans">&#8377;</span>{data.price}</span></p>
                                        {/*<p className="ps-ss">price : <span className="spans">&#8377;</span>{ data.price }</p>*/}
                                        <div className="row">
                                            <div className="column">
                                                <button className="cart-1"><Link to="/">Add to cart</Link></button>
                                                <button className="view-1"><Link to="/view">View</Link></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        ): null
                    ))}
            </div>

        </React.Fragment>

    );

}