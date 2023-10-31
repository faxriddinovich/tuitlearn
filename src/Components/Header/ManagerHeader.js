import React from 'react'
import {Link} from "react-router-dom";
import logo from '../../images/header-logo.png'

import './header.css'

function ManagerHeader(){
    return(
        <header className={'header'}>
            <div className={'container'}>
                <div className={'header_inner'}>
                    <div className={'header-logo'}>
                        <img src={logo} alt="Header logo"/>
                    </div>

                    <div className={'header-links'}>
                        <nav className={'navbar'}>
                            <ul className={'header_links-list'}>
                                <li className={'header_links-list-item'}>
                                    <Link to={'/'}>Home</Link>
                                </li>

                                <li className={'header_links-list-item'}>
                                    <Link to={'/manager-library'}>Kutubxona</Link>
                                </li>

                                <li className={'header_links-list-item'}>
                                    <Link to={'/manager-classroom'}>Sinfxonam</Link>
                                </li>

                                <li className={'header_links-list-item'}>
                                    <Link to={'/manager-contracts'}>Shartnomalar</Link>
                                </li>

                                <li className={'header_links-list-item'}>
                                    <Link to={'/account'}>Akkaunt</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ManagerHeader