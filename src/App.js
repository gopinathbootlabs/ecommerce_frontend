import logo from './logo.svg';
import './App.css';
import Home from './route/home'
import MobileView from './route/mobileview'
import Signin from './route/myaccount/signin'
import Signup from './route/myaccount/signup'
import Products from './route/product/product'
import Laptop from './route/product/laptop'
import Mobile from './route/product/mobile'
import Homeappliances from './route/product/homeappliances'
import Fashion from './route/product/fashion'
import View from './route/product/view'
import Cart from './route/cart/cart'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useMediaQuery} from "@mui/material";


function App() {

  const match = useMediaQuery("(max-width:1100px)")

  return (
      <>

        {/*{*/}
        {/*  match*/}
        {/*      ? <MobileView />:*/}
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={< Home />}></Route>
                  <Route path='/signin' element={< Signin />} ></Route>
                  <Route path='/signup' element={< Signup />} ></Route>
                  <Route path='/products' element={< Products />} ></Route>
                  <Route path='/laptop' element={< Laptop />} ></Route>
                  <Route path='/mobile' element={< Mobile />} ></Route>
                  <Route path='/homeappliances' element={< Homeappliances />} ></Route>
                  <Route path='/fashion' element={< Fashion />} ></Route>
                  <Route path='/view' element={< View />} ></Route>
                  <Route path='/cart' element={< Cart />} ></Route>
                </Routes>
              </BrowserRouter>
        {/*}*/}
      </>

  );
}

export default App;
