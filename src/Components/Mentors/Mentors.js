import React, {useEffect, useState} from "react";
import Slider from 'react-slick'
import { getDocs, collection } from 'firebase/firestore'
import {db} from '../../firebase/firebase'

import './mentors.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Mentors(){

    const [mentors,setMentors] = useState("")

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    async function fetchMentors(){

        await getDocs(collection(db,'mentors'))
            .then(querySnapshot=>{
                const newData = querySnapshot.docs.map(item=>({...item.data(),id:item.id}))
                setMentors(newData)
            })
            .catch(error=>console.log(error.message))
    }

    useEffect(()=>{
        fetchMentors()
    },[])

    return(
        <section className="mentors-section my-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <Slider {...settings}>
                            {mentors && mentors.map(item => <div className={'slick-item font-montserrat'} key={item.id}>
                                <img src={item.imageUrl} alt={item.mentorName}/>
                                <div className={'mentor-info'}>
                                    <h3 className={'mentor-name'}>{item.mentorName}</h3>
                                    <p className={'mentor-job'}>{item.subject}</p>
                                    <p className={'mentor-desc'}>{item.bio}</p>
                                </div>
                            </div>)}
                            {/*<div className={'slick-item mx-auto text-center'}>*/}
                            {/*    <img src="data:image/jpeg;base64,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" alt="First slide" className={'rounded'}/>*/}
                            {/*    <div className={'mentor-info'}>*/}
                            {/*        <h3 className={'mentor-name'}>Asadbek Kazakov</h3>*/}
                            {/*        <p className={'mentor-job'}>Python dasturchi</p>*/}
                            {/*        <p className={'mentor-desc'}>Lorem ipsum dolor set amet.</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className={'slick-item'}>*/}
                            {/*    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5BtCPP1vNVBXmjwNjClHUxgRx968FZLZmQ&usqp=CAU" alt="First slide"/>*/}
                            {/*    <div className={'mentor-info'}>*/}
                            {/*        <h3 className={'mentor-name'}>Sardorbek Salimov</h3>*/}
                            {/*        <p className={'mentor-job'}>C++ dasturchi</p>*/}
                            {/*        <p className={'mentor-desc'}>Lorem ipsum dolor set amet.</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className={'slick-item'}>*/}
                            {/*    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEjsV7w0EPj4H9ScAV4sHlmpdTYt8QJeMWew&usqp=CAU" alt="First slide"/>*/}
                            {/*    <div className={'mentor-info'}>*/}
                            {/*        <h3 className={'mentor-name'}>Lochinbek Abdiyev</h3>*/}
                            {/*        <p className={'mentor-job'}>Python dasturchi</p>*/}
                            {/*        <p className={'mentor-desc'}>Lorem ipsum dolor set amet.</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Mentors