import { useEffect, useState } from "react";
import pro from '../img/Bootlabs-logo.gif';
import lap from '../img/lap.png'
import profile from '../img/profile2.png'
import mobile from '../img/mob.png'
import homeappliances from '../img/tv.png'
import React from "react";
import "../style.css";
import {Link, useNavigate} from "react-router-dom";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import axios from "axios";

export default function Home()

{
    const history = useNavigate();
    const [data,setData] = useState([])
    const [count, setCount] = useState(); // State to hold the count
    const [totalPrice, setTotalPrice] = useState(); // State to hold the count
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

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8888/listcart?id=${user_id}`, {
            headers: {
                token: `${token}`, // Add the token to the Authorization header
            },
        })
            .then((response) => {
                setData(response.data)
                console.log("data"+response.data)
                setCount(response.data.length);
                var a=0;
                if(response.data.length >0){
                response.data.map((data)=>{
                    a=a+data.price;
                    setTotalPrice(a);}
                )}
                // const prices = response.data.map(product => product.price);
                // console.log("l"+prices);
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
    function removeProduct(id)
    {
        const user_id = getCookieValue("_id");
        const token = getCookieValueToken("token");
        axios.delete(`http://127.0.0.1:8888/removeitem?id=${id}&userID=${user_id}`,{
        headers: {
            token: `${token}`, // Add the token to the Authorization header
        },
        })
            .then(data => {
                // console.log(data);
                if(data.statusText==="OK"){
                    // setData(data.data)
                    alert(data.data)
                }
                else{
                    alert("Please check your credentials");
                }
            })
        history('/cart');
        axios.get(`http://127.0.0.1:8888/listcart?id=${user_id}`, {
            headers: {
                token: `${token}`, // Add the token to the Authorization header
            },
        })
            .then((response) => {
                setData(response.data)
                console.log("data"+response.data)
                setCount(response.data.length);
                var a=0;
                if(response.data.length >0){
                    response.data.map((data)=>{
                        a=a+data.price;
                        setTotalPrice(a);}
                    )}
            });

    }

    let bool;
    return (
        <React.Fragment>
            <body >
            <header className="p-3 border-bottom bg-light"style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <div className="container-fluid" >
                    <div className="row g-3" >
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
                                        {}
                                    </div>
                                </Link>
                            </div>&emsp;
                            {
                                (
                                    sign()?(
                                            <>
                                                <div class="dropdown">
                                                    <button class="dropbtn_profile"><img className="profile_image" src={profile}/></button>
                                                    <div className="dropdown-content">
                                                        <Link to="/">My Profile</Link>
                                                        <Link to="/">Orders</Link>
                                                        <Link to="/">Notification</Link>
                                                        <a href="/" onClick={logout}>Log out</a>
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
            </header><br/><br/><br/><br/>
            {/*<div className="container my-3">*/}
            <div className="row m-4">
                    <div className="col-md-8 bg-light bg-gradient p-3 d-none d-md-block w-50 ">
                       <div className="row">{
                           data.map((data)=>
                           (
                            <div className="cartcard" >
                                <img className="cartimg" src={homeappliances}/>
                                <p className="cartpn">{data.product_name}</p>
                                <p className="cartdelivery">Delivery by Thu Aug 10 | <span style={{color:"forestgreen"}}>Free&nbsp;</span><del>₹40</del></p>
                                <br/><br/>
                                <p className="cartprice"><span className="spans">&#8377;</span>{data.price}<span className="cartdiscount"> 6% OffGet at <span className="spans">&#8377;</span>{Math.floor(data.price * 0.96)} with bank offers..</span></p>
                                <p className="cartstar">
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
                                </p>
                                <p className="cartdis">+ ₹49 Secured Packaging Fee</p>
                                <br/><br/>
                                <br/> <br/>
                               <Link className="cartlink" to="/">SAVE FOR LATER</Link>
                                <Link className="cartlink1" onClick={() => removeProduct(data.Product_ID)} > REMOVE</Link>

                            </div>
                           ))
                       }
                        </div>
                    </div>

                    <div className="col-md-3 p-3 bg-light bg-gradient"style={{ height: "530px",width:"500px",right: "100px",position:"fixed"}}>
                    <h>PRICE DETAILS</h>
                        <hr></hr>
                        <p className="cart-l">Price ({count} items)</p>
                        <p className="cart-r"><span className="spans">&#8377;</span>{totalPrice}</p><br/><br/>
                        <p className="cart-l">Discount</p>
                        <p className="cart-r-green"><span className="spans">-&#8377;</span>{Math.floor(totalPrice * 0.009)}</p><br/><br/>
                        <p className="cart-l">Coupons for you</p>
                        <p className="cart-r-green"><span className="spans">-&#8377;</span>20</p><br/><br/>
                        <p className="cart-l">Delivery Charges</p>
                        <p className="cart-r-green">Free</p><br/><br/>
                        <p className="cart-l">Secured Package Fee</p>
                        <p className="cart-r"><span className="spans">&#8377;</span>{count*49}</p><span className="dotted-underline"></span><br/>
                        <p className="cart-l-m"><b>Total Amount</b></p>
                        <p className="cart-r-m"><b><span className="spans">&#8377;</span>{totalPrice-(Math.floor(totalPrice * 0.009))-20+count*49}</b></p>
                        <span className="dotted-underline"></span>
                        <p className="cart-r-green" style={{float:"left"}}>You will save ₹{(Math.floor(totalPrice * 0.009))+20-count*49} on this order</p>
                        <button className="buttons-card-3">Place Order</button>


                    </div>

            </div>

            {/*</div>*/}
            </body>
        </React.Fragment>

    );

}