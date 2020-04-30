import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ProductImage from "./ProductImage";
import {Link} from "react-router-dom";

const Products = ({products}) => {
    return (
        <div className={'important-prod'}>
            <div className={'container'}>
                <div className="row justify-content-center">
                    <div className="card-deck">
                        {products.products.data && products.products.data.map(product => (
                            <Link to={`/product/${product.id}`}>
                                <div className="col">
                                    <div className="card card-body" id={'card'} style={{width: '18rem'}}>
                                        <ProductImage id={product.id} key={product.id}/>
                                        <div className="card-body">
                                            <h4 className="card-title"><strong>{product.name}</strong></h4>
                                            <p className="card-text"><strong>Çmimi: {product.price} Lek</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

Products.propTypes = {
    products: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    products: state.products,
});

export default connect(mapStateToProps)(Products);