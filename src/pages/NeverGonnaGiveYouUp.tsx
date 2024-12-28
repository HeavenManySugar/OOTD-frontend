import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


const RickROll: React.FC = () => {

    return (
        <div className="container">
            <iframe width="1100" height="619" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    );
};

export default RickROll;