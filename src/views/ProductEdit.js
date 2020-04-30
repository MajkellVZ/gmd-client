import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProduct, updateProduct} from "../actions/products";
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const ProductEdit = ({getProduct, updateProduct, id, products}) => {
    useEffect(() => {
        getProduct(id);
    }, [getProduct]);

    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        description: '',
        category: '',
        isImportant: ''
    });

    const {name, quantity, price, description} = formData;

    console.log(products.product);

    useEffect(() => {
        products.product && setFormData(products.product);
    }, [products]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onUpdate = id => {
        // console.log(id);
        // console.log(formData)
        updateProduct(id, formData)
    };

    return (
        <div>
            <NavBar/>
            <Alert/>
            <div className={'container'}>
                <input type="text" name={'name'} onChange={e => onChange(e)} value={name}/>
                <br/>
                <input type="text" name={'description'} onChange={e => onChange(e)} value={description}/>
                <br/>
                <input type="number" name={'quantity'} onChange={e => onChange(e)} value={quantity}/>
                <br/>
                <input type="number" name={'price'} onChange={e => onChange(e)} value={price}/>
                <br/>
                <input type="submit" onClick={() => onUpdate(id)} value={'Modifiko'}/>
            </div>
        </div>
    )
};

ProductEdit.propTypes = {
    id: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    products: state.products
});

export default connect(mapStateToProps, {getProduct, updateProduct})(ProductEdit);