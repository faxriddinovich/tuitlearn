import React from 'react'
import Header from "../Header/Header";
import Intro from "./Intro";

import './home.css'
import CoursesList from "../Courses/CoursesList";
import Mentors from "../Mentors/Mentors";

function Home(){
    return(
        <>
            <Header/>
            <Intro/>
            <CoursesList/>
            <Mentors/>
        </>
    )
}

export default Home