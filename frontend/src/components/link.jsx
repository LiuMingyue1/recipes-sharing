import React from 'react';
import { Link as RouterLink } from "react-router-dom";


const AllLink = ({ to, className, children }) => {
    return (
        <RouterLink to={to} className={className}>
            {children}
        </RouterLink>
    );
}

export default AllLink;
