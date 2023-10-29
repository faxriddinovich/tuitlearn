import React, {useState} from "react";
import LibrarySidebar from "./LibrarySidebar";
import MyCourses from "../Courses/MyCourses";

import './library.css'

function Library({userId}){

    const [activeComponent,setActiveComponent] = useState(<MyCourses/>)

    function handleClick(component){
        setActiveComponent(component)
    }

    return(
        <>
            <LibrarySidebar handleClick={handleClick} userId={userId}/>
            <div className={'library-wrapper'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            {activeComponent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Library