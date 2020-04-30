import React from 'react';
import About from "../components/About";
import {Link} from "react-router-dom";
import ImportProducts from "../components/ImportantProducts";
import {Link as Scroll} from "react-scroll";

const Home = () => {
    return (
        <div>
            <div className="header">
                <div className="text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary-main">GMD Shop</span>
                        <span className="heading-primary-sub">General Merchandise Distributor</span>
                    </h1>
                    <Scroll
                        to="important_products"
                        spy={true}
                        smooth={true}
                        duration={500}
                    >
                        <a href="" className='btn btn-white btn-animated'>produkte</a></Scroll>
                </div>
            </div>
            <About/>
            <div id={"important_products"}>
                <ImportProducts/>
                <Link to={'/shop'}><a href={''} className={'btn btn-square btn-yellow im-prod'}>Zbulo me shume</a></Link>
            </div>
        </div>
    )
};

export default Home;