import React, { Component } from 'react';
import logo from '../../assets/img/brand/logo.png';

/**
 * Displays full JSOAGGER Logo inside a row and column justified.
 */
class JSoaggerLogo extends Component {

  render() {
    return (
        <React.Fragment>
                <div className="clearfix animated fadeIn">
                    <img src={logo} className="img-avatar" alt="JSOAGGER logo"/>
                </div>
        </React.Fragment>
    );
  }
}

export default JSoaggerLogo;
