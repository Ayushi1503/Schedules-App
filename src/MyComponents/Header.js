import React from 'react'
import PropTypes from 'prop-types'

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/"><h2>{props.title}</h2></a>
        </nav>
    )
}

Header.defaultProps = {
    title: "Your title here"
}

Header.propTypes = {
    title: PropTypes.string
}
