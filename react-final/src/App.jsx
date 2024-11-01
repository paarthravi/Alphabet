import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Cart from "./Cart";
import PurchaseHistory from "./PurchaseHistory";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
    // Access cart from the Redux store
    const cartItems = useSelector((state) => state.cart);

    // Calculate total items in the cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
        <GoogleOAuthProvider clientId="906951849990-aga1f4remf58ios1gbe66jc9gk6g63e0.apps.googleusercontent.com">
        <GoogleLoginComponent/>
        </GoogleOAuthProvider>
        
            <BrowserRouter>
                <Link to="/Home">Home</Link>
                <Link to="/Veg">Veg</Link>
                <Link to="/NonVeg">NonVeg</Link>
                <Link to="/Cart">Cart ({totalItems})</Link>
                <Link to="/PurchaseHistory">PurchaseHistory</Link>
                <Link to="/ContactUs">ContactUs</Link>
                <Link to="/AboutUs">AboutUs</Link>

                

                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Veg" element={<Veg />} />
                    <Route path="/Nonveg" element={<NonVeg />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/PurchaseHistory" element={<PurchaseHistory />} />
                    <Route path="/ContactUs" element={<ContactUs />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                </Routes>
            </BrowserRouter>
            
        </>
    );
}

export default App;
