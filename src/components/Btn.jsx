import React, { PureComponent } from 'react';

function Btn({
    type="Button",
    children,
    className="",
    bgcolor="bg-blue-400",
    textcolor="text-white",
    ...props}

){
    return (
        <>
        <button type={type} className={`px-4 py-2 rounded-lg ${className} ${bgcolor} ${textcolor} `} {...props}>
            {children}
        </button>
        </>
    )
}
export default Btn