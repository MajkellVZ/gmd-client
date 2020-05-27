import React, {useEffect, useState} from 'react';
import About from "../components/About";
import {Link} from "react-router-dom";
import ImportProducts from "../components/ImportantProducts";
import {Link as Scroll} from "react-scroll";
import Modal from 'react-modal';
import {css} from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 100px;
  border-color: yellow;
`;

const customLoadingStyles = {
    content: {
        color: 'white',
        background: '#00303F',
        background: '#00303F',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'hidden'
    }
};

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, []);

    return (
        <div>
            <Modal
                isOpen={loading}
                style={customLoadingStyles}
            >
                <br/>
                <div className={'row'}>
                    <BarLoader
                        css={override}
                        width={500}
                        height={4}
                        color={"rgba(242, 211, 73, 0.8)"}
                        loading={loading}
                    />
                </div>
            </Modal>
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