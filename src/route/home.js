import { useEffect, useState } from "react";
import pro from './img/Bootlabs-logo.gif';
import slide1 from "./img/slide1.webp"
import slide2 from './img/slide2.webp'
import slide3 from './img/slide3.jpg'
import lap from './img/lap.png'
import phone from './img/phone.png'
import tv from './img/tv.png'
import profile from './img/profile2.png'
import headset from './img/headset.png'
import f1 from './img/shoes.png'
import f2 from './img/mob.png'
import display from './img/display.png'
import hdd from './img/hdd.png'
import upc from './img/upc.png'
import tools from './img/tools.png'
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import {
    faTwitter,
    faFacebookF,
    faInstagram,
    faYoutube,
    faApple,
    faWindows,
    faAndroid,
} from "@fortawesome/free-brands-svg-icons";

import { ReactComponent as IconTelephone } from "bootstrap-icons/icons/telephone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";

export default function Home()

{
    // useEffect(()=>{
    //     axios.get(`http://127.0.0.1:8888/users/productview`)
    //         .then((response) => {
    //             setData(response.data)
    //         });
    //
    // },[])

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

    // let slideIndex = 1;
    // showSlides(slideIndex);
    //
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }
    //
    // function currentSlide(n) {
    //     showSlides(slideIndex = n);
    // }
    //
    // function showSlides(n) {
    //     let i;
    //     let slides = document.getElementsByClassName("mySlides");
    //     let dots = document.getElementsByClassName("dot");
    //     if (n > slides.length) {slideIndex = 1}
    //     if (n < 1) {slideIndex = slides.length}
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     for (i = 0; i < dots.length; i++) {
    //         dots[i].className = dots[i].className.replace(" active", "");
    //     }
    //     slides[slideIndex-1].style.display = "block";
    //     dots[slideIndex-1].className += " active";
    // }

    let bool;
    return (
        <React.Fragment>
<body>
            <header className="p-3 border-bottom bg-light" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }} >
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
            </header><br/><br/><br/>
            <div className="p-3 border-bottom bg-light" style={{marginTop:5}}>
                <div className="rows">
                    <div className="col-md-2 text-center">
                        <Link className="link-" to="/products"><p className="links">All Products</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link className="link-" to="/laptop"><p>Laptop</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link className="link-" to="/mobile"><p>Mobile</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link className="link-" to="/homeappliances"><p>Home Appliances</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link className="link-" to="/fashion"><p>Fashion</p></Link>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link className="link-" to="/"><p>Customer Service</p></Link>
                    </div>
                </div>

            </div>
            <br/>
            {/*<div className="slideshow-container">*/}

            {/*    <div className="mySlides fade">*/}
            {/*        <div className="numbertext">1 / 3</div>*/}
            {/*        <img src={slide3} />*/}
            {/*            <div className="text">Caption Text</div>*/}
            {/*    </div>*/}

            {/*    <div className="mySlides fade">*/}
            {/*        <div className="numbertext">2 / 3</div>*/}
            {/*        <img src={slide1} />*/}
            {/*            <div className="text">Caption Two</div>*/}
            {/*    </div>*/}

            {/*    <div className="mySlides fade">*/}
            {/*        <div className="numbertext">3 / 3</div>*/}
            {/*        <img src={slide2} />*/}
            {/*            <div class="text">Caption Three</div>*/}
            {/*    </div>*/}


            {/*</div>*/}

            <div id="slideshow">
                <div className="slide-wrapper">
                    <div className="slide">
                        <img className="slideimg" src={slide1} />
                    </div>
                    <div className="slide">
                        <img className="slideimg" src={slide2} />
                    </div>
                    <div className="slide">
                        <img className="slideimg" src={slide3} />
                    </div>
                </div>
            </div>
<br/>
            <div className="container-fluid bg-light mb-3">
                <div className="row g-3">
                    <div className="col-md-9">
                        <img className="im" src={f1}/>
                    </div>
                    <div className="col-md-3">
                        <img className="imm" src={f2}/>
                    </div>
                </div>
            </div>
            <br/>
            <h1 className="deal">Deal's of the day</h1>
            <button className="buttonss"><Link to="/signin">View</Link></button>
            <br/><br/>

            <div class="container">
                <br/>
                <Link to="/signin">
                <div class="first">
                    <img className="imgs" src={lap}/>
                    <p className="pc">Upto 20% off</p>
                    <p className="pc1">Dell,HP</p>
                </div>
                </Link>
                <Link to="/signin">
                <div class="second">
                    <img className="imgs" src={phone}/>
                    <p className="pc">Upto 10% off</p>
                    <p className="pc1">Samsung,Realme</p>
                </div>
                </Link>
                <Link to="/signin">
                <div class="second">
                    <img className="imgs" src={tv}/>
                    <p className="pc">Upto 30% off</p>
                    <p className="pc1">Sony,Videocon</p>
                </div>
                </Link>
                <Link to="/signin">
                <div class="second">
                    <img className="imgs" src={headset}/>
                    <p className="pc">Upto 25% off</p>
                    <p className="pc1">Boat,Skull Candy</p>
                </div>
                </Link>
            </div>

            <div className="container">
                <br/>
                <Link to="/signin">
                    <div className="fifth">
                        <img className="imgs" src={display}/>
                        <p className="pc">Upto 5% off</p>
                        <p className="pc1">Dell</p>
                    </div>
                </Link>
                <Link to="/signin">
                    <div className="sixth">
                        <img className="imgs" src={hdd}/>
                        <p className="pc">Upto 25% off</p>
                        <p className="pc1">Lenovo</p>
                    </div>
                </Link>
                <Link to="/signin">
                    <div className="sixth">
                        <img className="imgs" src={upc}/>
                        <p className="pc">Upto 15% off</p>
                        <p className="pc1">Yanceo,Irvine</p>
                    </div>
                </Link>
                <Link to="/signin">
                    <div className="sixth">
                        <img className="imgs" src={tools}/>
                        <p className="pc">Upto 10% off</p>
                        <p className="pc1">Stanlley</p>
                    </div>
                </Link>
                <br/><br/>
            </div>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="container-fluid bg-primary">
                <div className="row">
                    <div className="col-md-7 py-3 text-white">
                        Get connected with us on social networks!
                    </div>
                    <div className="col-md-5 py-3 text-center text-white">
                        <Link to="/" title="Twitter">
                            &emsp;<FontAwesomeIcon
                                icon={faTwitter}
                                className="text-light ms-3 me-3"
                            />
                        </Link>
                        <Link to="/" title="Facebook">
                            &emsp; <FontAwesomeIcon
                                icon={faFacebookF}
                                className="text-light me-3"
                            />
                        </Link>
                        <Link to="/" title="Instagram">
                            &emsp;<FontAwesomeIcon
                                icon={faInstagram}
                                className="text-light me-3"
                            />
                        </Link>
                        <Link to="/" title="Youtube">
                            &emsp; <FontAwesomeIcon icon={faYoutube} className="text-light me-3" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-white">
                <div className="row ">
                    <div className="col-md-3 py-3">
                        <div className="h6">Bootlabs</div>
                        <hr />
                        <p>
                            Bootlabs Private Limited is an Indian e-commerce company, headquartered in Bangalore, and incorporated in Bangalore as a private limited company. The company initially focused on online book sales before expanding into other product categories such as consumer electronics, fashion, home essentials, groceries, and lifestyle products.
                        </p>
                    </div>
                    <div className="col-md-3 py-3">
                        <div className="h6">Products</div>
                        <hr />
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Electronics
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Mobiles
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Laptop
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Fashion
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Appliance
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 py-3">
                        <div className="h6">Policy</div>
                        <hr />
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Return Policy
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Terms Of Use
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Security
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    Privacy
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark text-white border-light">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-white stretched-link"
                                >
                                    EPR Compliance
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 py-3">
                        <div className="h6">Address</div>

                        <address>

                            <br />
                            Novel Office, Subbaiah Reddy Colony, Marathahalli Village
                            <br />
                            Marathahalli, Bangalore.
                            <br />
                            Phone: 9876543210
                        </address>
                        <div className="h6">Customer Care</div>
                        <hr />
                        <IconTelephone /> +1800 100 1000
                        <br />
                        <IconEnvelope /> info@email.com
                    </div>
                </div>
            </div>
</body>
        </React.Fragment>

    );

}