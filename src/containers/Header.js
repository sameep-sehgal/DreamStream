import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GoogleAuth from './GoogleAuth';

const Header = (props) => {
    return (
        <div className='ui secondary pointing menu'>
            <Link to='/' className='item'>
                <p style={{fontFamily:'verdana',color:'#B71C1C'}}><strong>DreamStream</strong></p>
            </Link>
            <div className='right menu'>
                <Link to='/' className='item'>
                    {props.userEmail}
                </Link>
                <GoogleAuth />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.auth.userEmail,
    };
}

export default connect(mapStateToProps)(Header);