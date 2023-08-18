import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import pro from "../img/Bootlabs-logo.gif";
import lap from '../img/lap.png'
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
const Search = ({ responseData }) => {
    if (!responseData) {
        // return <div>Loading...</div>; // Add a loading state or return null/empty content if data is not available yet
    }
    // Use responseData to display the search results or handle the data as needed
    return (
        <div>
            {
                console.log("hi "+ responseData.name)
            }
        </div>
    );
};

export default Search;
