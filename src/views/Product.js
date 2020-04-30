import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProduct,} from "../actions/products";
import {buy} from "../actions/orders";
import CarouselImage from "../components/CorouselImage";
import Modal from 'react-modal';
import Cookies from 'universal-cookie';
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const cookies = new Cookies();

const customStyles = {
    content: {
        color: 'white',
        background: '#2d545e',
        background: '#2d545e'
    }
};

const Product = ({id, getProduct, buy, products}) => {
    useEffect(() => {
        getProduct(id);
        window.scrollTo(0, 0);
    }, [getProduct]);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        quantity: 1,
        emptyQuantity: false,
        inCart: false,
        showArrows: true,
        no_email: false
    });

    const [modalIsOpen, setIsOpen] = useState(false);

    const {full_name, email, phone, address, quantity, emptyQuantity, inCart, showArrows, no_email} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onCheck = () => {
        setFormData({...formData, no_email: !no_email});
    };

    const onBuy = () => {
        setIsOpen(true);
        setFormData({...formData, showArrows: false})
    };

    const onFinishBuy = () => {
        const data = {
            product_id: [{id: id, product_name: products.product.name, quantity: quantity}],
            full_name,
            email: no_email ? 'xxx@gmd.com' : email,
            phone,
            address
        };

        buy(data);

        getProduct(id);

        setIsOpen(false);
    };

    const onCart = () => {
        if (quantity === '' || quantity === null) {
            setFormData({...formData, emptyQuantity: true});
            setTimeout(() => setFormData({...formData, emptyQuantity: false}), 5000);
        } else {
            if (!cookies.get('product')) {
                cookies.set('product', [], {path: '/'});
            }

            const cookie_product = cookies.get('product');
            let data = {
                id: id,
                product_name: products.product.name,
                product_price: products.product.price,
                quantity: quantity,
                amount: (parseInt(products.product.price) * parseInt(quantity)),
                quantity_allowed: products.product.quantity
            };
            let new_data = true;

            cookie_product.forEach((product) => {
                if (product.id === data.id) {
                    product.quantity = parseInt(product.quantity) + parseInt(data.quantity);
                    product.amount = parseInt(product.amount) + parseInt(data.amount);
                    new_data = false
                }
            });

            if (new_data) cookie_product.push(data);

            cookies.set('product', cookie_product, {path: '/'});

            const cookies_quantity = cookies.get('quantity') ? cookies.get('quantity') : 0;
            cookies.set('quantity', parseInt(cookies_quantity) + parseInt(quantity), {path: '/'});

            console.log(new_data);
            console.log(cookies.get('quantity'));
            console.log(cookies.get('product'));

            setFormData({...formData, inCart: true});
            setTimeout(() => setFormData({...formData, emptyQuantity: false}), 5000);

            getProduct(id);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setFormData({...formData, showArrows: true})
    };

    console.log(products);

    return (
        <div className={'main-container'}>
            <NavBar type={products.product && products.product.category}/>
            <br/>
            <Alert/>
            {emptyQuantity && <div className={'container'}>
                <div key={5432} className={`alert alert-danger`}>
                    {`Kerkohet Sasia`}
                </div>
            </div>}
            {inCart && <div className={'container'}>
                <div key={5434} className={`alert alert-success`}>
                    {`U shtua ne shporte.`}
                </div>
            </div>}
            <div className={'row'}>
                <br/>
                <div className={'col'}>
                    <CarouselImage id={id} key={id} showArrows={showArrows}/>
                </div>
                <div className={'col'}>
                    {products.product &&
                    <div>
                        <h2>{products.product.name}</h2>
                        <h3>{products.product.description}</h3>
                        <h3>Çmimi: {products.product.price} Lek (te reja)</h3>
                        <input type={'number'} name={'quantity'} value={quantity} min={1}
                               max={products.product.quantity}
                               onChange={e => onChange(e)}/>
                        {quantity &&
                        <h3>Çmimi total: {(products.product.price * quantity).toFixed(2)} Lek (te reja)</h3>}
                    </div>
                    }
                    <br/>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                    >
                        <br/>
                        <div className={'row'}>
                            <div className={'col-md-4 offset-md-4 about-us'}>
                                <label>Emri i plote</label>
                                <p><input type={'text'} className={'w3-input'} name={'full_name'} value={full_name}
                                          onChange={e => onChange(e)}/></p>
                                {!no_email && <p><label>Email</label>
                                    <input type={'email'} className={'w3-input'} name={'email'} value={email}
                                           onChange={e => onChange(e)} disabled={no_email}/></p>}
                                <p>
                                    <input type="checkbox" id="fruit1" value="Apple" checked={no_email}
                                           name={'no_email'}
                                           onClick={onCheck}/>
                                    <label htmlFor="fruit1" className={'label-check'}>Nuk kam email</label>
                                </p>
                                <p><label>Numri Celularit</label>
                                    <input type={'text'} className={'w3-input'} name={'phone'} value={phone}
                                           onChange={e => onChange(e)}/></p>
                                <p><label>Adresa</label>
                                    <input type={'text'} className={'w3-input'} name={'address'} value={address}
                                           onChange={e => onChange(e)}/></p>
                                <div className={'row justify-content-center align-items-center'}>
                                    <button onClick={onFinishBuy} className={'btn btn-white'}>Perfundo</button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <button onClick={onCart} className={'btn btn-yellow'}>Shto ne Shport</button>
                    <button onClick={onBuy} className={'btn btn-yellow'}>Blej</button>
                </div>
            </div>
            <br/>
            <div className={'container'}>
                <hr/>
                <p>
                    Produktet do mberrijne prane jush brenda 24 oreve. Transporti falas.
                    <br/>
                    Pagesat behet cash ne duar.
                    <br/>
                    Per cdo paqartesi mund te na kontaktoni ne rrjetet sociale qe mund t'i gjeni ne fund te faqes.
                    <br/>
                    Faleminderit</p>
            </div>
            <br/>
        </div>
    )
};

Product.propTypes = {
    id: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    buy: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    products: state.products
});

export default connect(mapStateToProps, {getProduct, buy})(Product);