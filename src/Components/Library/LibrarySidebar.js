import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import sidebarLogo from '../../images/header-logo.png'
import MyCourses from "../Courses/MyCourses";
import CoursesList from "../Courses/CoursesList";
import Tasks from "../Classroom/Tasks";

import './sidebar.css'

function LibrarySidebar({handleClick,userId}){

    const [active,setActive] = useState('mycourses')
    const navigate = useNavigate()

    function changeComponent(component,id){
        setActive(id)
        handleClick(component)
    }

    return(
        <div className={'sidebar'}>
            <div className={'sidebar-box'}>
                <div className={'sidebar-logo'}>
                    <img src={sidebarLogo} alt="Sidebar"/>
                </div>
                <ul className={'sidebar-list'}>
                    <li className={`sidebar-list-item ${active==='mycourses' ? 'active' : ''}`} id={'mycourses'} onClick={()=>changeComponent(<MyCourses/>,'mycourses')}>
                        Mening kurslarim
                    </li>

                    <li className={`sidebar-list-item ${active==='allcourses' ? 'active' : ''}`} id={'allcourses'} onClick={()=>changeComponent(<CoursesList/>,'allcourses')}>
                        Barcha kurslar
                    </li>

                    <li className={`sidebar-list-item ${active==='tasks' ? 'active' : ''}`} id={'tasks'} onClick={()=>changeComponent(<Tasks userId={userId}/>,'tasks')}>
                        Topshiriqlar
                    </li>

                    <li className={`sidebar-list-item ${active==='home' ? 'active' : ''}`} id={'home'} onClick={() => navigate('/')}>
                        <Link to={'/'}>Home</Link>
                    </li>

                    <li className={`sidebar-list-item ${active==='account' ? 'active' : ''}`} id={'account'} onClick={() => navigate('/account')}>
                        <Link to={'/account'}>Account</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LibrarySidebar