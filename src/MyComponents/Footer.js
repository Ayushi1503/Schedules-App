import React from 'react'

export const Footer = () => {
    let footerStyle = {
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        height: "50px",
    }
    return (
        <div className='footer bg-dark text-light py-3' style={footerStyle}>
            <p className='text-center'>Copyright &copy; Schedule App Ayushi</p>
        </div>
    )
}
