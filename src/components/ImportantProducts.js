import React, {useEffect} from "react";
import {getImportantProducts} from "../actions/important_products";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ProductImage from "./ProductImage";
import {Link} from "react-router-dom";

const ImportProducts = ({getImportantProducts, important_products}) => {
    useEffect(() => {
        getImportantProducts()
    }, [getImportantProducts]);

    return (
        <div className={'important-prod'} id={'important_product2'}>
            <div className={'container'}>
                <h1>Mund te te pelqeje:</h1>
                <div className="row justify-content-center">
                    <div className="card-deck">
                        {important_products.important_products.map(product => (
                            <Link to={`/product/${product.id}`}>
                                <a href={''}>
                                    <div className="col">
                                        <div className="card card-body h-100" id={'card'} style={{width: '18rem'}}>
                                            <ProductImage id={product.id} key={product.id}/>
                                            <div className="card-body">
                                                <h4 className="card-title"><strong>{product.name}</strong></h4>
                                                <p className="card-text"><strong>Çmimi: {product.price} Lek</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

ImportProducts.propTypes = {
    getImportantProducts: PropTypes.func.isRequired,
    important_products: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    important_products: state.important_products,
});

export default connect(mapStateToProps, {getImportantProducts})(ImportProducts);