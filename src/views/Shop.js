import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import ImportProducts from "../components/ImportantProducts";
import Products from "../components/Products";
import {getProducts, getProductsAll, getProductsByCategory, filterProductsNameCategory} from "../actions/products";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link as Scroll, Link} from 'react-scroll';
import Modal from 'react-modal';
import {css} from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 150px;
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

const Shop = ({getProducts, getProductsByCategory, getProductsAll, filterProductsNameCategory, products}) => {
    useEffect(() => {
        getProducts();
        window.scrollTo(0, 0);
        setTimeout(() => {
            setFormData({...formData, loading: false})
        }, 2000)
    }, [getProducts]);

    const [formData, setFormData] = useState({
        type: '',
        name: '',
        loading: true
    });

    const {name, type, loading} = formData;

    const onClickAll = e => {
        e.preventDefault();
        getProductsAll();
        setFormData({...formData, type: '', loading: true})
        setTimeout(() => {
            setFormData({...formData, type: '', loading: false})
        }, 1500)
    };

    const onClickHouse = e => {
        e.preventDefault();
        getProductsByCategory("household");
        setFormData({...formData, type: 'household', loading: true})
        setTimeout(() => {
            setFormData({...formData, type: 'household', loading: false})
        }, 1500)
    };

    const onClickPool = e => {
        e.preventDefault();
        getProductsByCategory("pool");
        setFormData({...formData, type: 'pool', loading: true})
        setTimeout(() => {
            setFormData({...formData, type: 'pool', loading: false})
        }, 1500)
    };

    const onClickToys = e => {
        e.preventDefault();
        getProductsByCategory("toys");
        setFormData({...formData, type: 'toys', loading: true})
        setTimeout(() => {
            setFormData({...formData, type: 'toys', loading: false})
        }, 1500)
    };

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    const onFilter = () => {
        filterProductsNameCategory(name, type);
    };

    return (
        <div>
            <NavBar type={type}/>
            <Modal
                isOpen={loading}
                style={customLoadingStyles}
            >
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
            <div className={'container'}>
                <div className={'row justify-content-center align-items-center'}>
                    <div className="w3-padding-32">
                        <div className="w3-bar w3-border">
                            <a href=""
                               className={type === '' ? "w3-bar-item w3-button w3-light-grey" : "w3-bar-item w3-button"}
                               onClick={onClickAll}>Te gjitha</a>
                            <a href=""
                               className={type === 'household' ? "w3-bar-item w3-button w3-light-grey" : "w3-bar-item w3-button"}
                               onClick={onClickHouse}>Elektro Shtepiake</a>
                            <a href=""
                               className={type === 'pool' ? "w3-bar-item w3-button w3-light-grey" : "w3-bar-item w3-button"}
                               onClick={onClickPool}>Bilardo</a>
                            <a href=""
                               className={type === 'toys' ? "w3-bar-item w3-button w3-light-grey" : "w3-bar-item w3-button"}
                               onClick={onClickToys}>🎁 Lodra 🧸</a>
                            <Link
                                to="important_product2"
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                <a href="" className="w3-bar-item w3-button">Sugjerojme</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={'row justify-content-center align-items-center'}>
                    <div className={'col-md-4 offset-md-0 about-us'}>
                        <input type="text" name={'name'} className={'w3-input'} placeholder={'Kerko produktin...'}
                               onChange={e => onChange(e)} onKeyUp={() => onFilter()}/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <div className={'list-menu'}>
                            <Products/>
                        </div>
                    </div>
                </div>
                <br/>
                <ImportProducts/>
            </div>
        </div>
    )
};

Shop.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getProductsByCategory: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    filterProductsNameCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    products: state.products
});

export default connect(mapStateToProps, {
    getProducts,
    getProductsByCategory,
    getProductsAll,
    filterProductsNameCategory
})(Shop);