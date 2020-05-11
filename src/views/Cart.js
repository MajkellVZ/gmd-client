import React, {useCallback, useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import {buy} from "../actions/orders";
import Modal from 'react-modal';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProduct} from "../actions/products";
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";
import ImportProducts from "../components/ImportantProducts";

const cookies = new Cookies();

const customStyles = {
    content: {
        color: 'white',
        background: '#2d545e',
        background: '#2d545e'
    }
};

const Cart = ({buy}) => {

    useEffect(() => {
        getCookieProducts();
    }, []);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        products: null,
        quantity_error: false,
        no_email: false
    });

    const getCookieProducts = () => {
        setFormData({...formData, products: cookies.get('product')});
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    const {full_name, email, phone, address, products, quantity_error, no_email} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onCheck = () => {
        setFormData({...formData, no_email: !no_email, email: !no_email ? 'xxx@gmd.com' : ''});
    };

    const onBuy = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    const onFinishBuy = () => {

        const data = {
            product_id: products,
            full_name,
            email,
            phone,
            address
        };

        buy(data);

        var quantity_error = false;

        for (var product of products) {
            if (product.quantity == 0 || product.quantity == null || product.quantity == '') {
                quantity_error = true;
                setFormData({...formData, quantity_error: true,});
                setTimeout(() => setFormData({...formData, quantity_error: false}), 5000);
            }
        }

        if (!quantity_error && full_name !== '' && email !== '' && phone !== '' && address !== '') {
            cookies.set('quantity', 0, {path: '/'});
            cookies.set('product', [], {path: '/'});
        }

        setIsOpen(false);
        getCookieProducts();

        window.scrollTo(0, 0);
    };

    const onDelete = (id) => {
        const deleted_product = products.filter(product => product.id === id);
        const current_cookie_quantity = cookies.get('quantity');
        const new_products = products.filter(product => parseInt(product.id) !== parseInt(id));

        // console.log(products);
        // console.log(id)
        // console.log(deleted_product);
        // console.log(new_products);

        if (parseInt(deleted_product[0].quantity) > 0) {
            cookies.set('quantity', (parseInt(current_cookie_quantity) - parseInt(deleted_product[0].quantity)), {path: '/'});
        }

        cookies.set('product', new_products, {path: '/'});
        getCookieProducts();
    };

    const onQuantityChange = (e, id) => {
        const current_quantity = cookies.get('quantity');
        const {value} = e.target;
        const new_quantity = value;
        let old_quantity = 0;

        if (new_quantity == 0 || new_quantity == '' || new_quantity == null) {
            // setFormData({...formData, quantity_error: true,});
            // setTimeout(() => setFormData({...formData, quantity_error: false}), 5000);
            // cookies.set('quantity', current_quantity, {path: '/'});
            products.map(product => {
                if (product.id === id) {
                    old_quantity = product.quantity;
                    product.quantity = current_quantity;
                    // product.amount = parseInt(new_quantity) * product.product_price;
                }
            });
            getCookieProducts();
        } else {
            products.map(product => {
                if (product.id === id) {
                    old_quantity = product.quantity;
                    product.quantity = new_quantity;
                    product.amount = parseInt(new_quantity) * product.product_price;
                }
            });

            const quantity_difference = parseInt(new_quantity) - parseInt(old_quantity);

            // console.log(parseInt(current_quantity) + quantity_difference);
            // console.log(products);
            if (parseInt(current_quantity) + quantity_difference > 0) {
                cookies.set('quantity', (parseInt(current_quantity) + quantity_difference), {path: '/'});
            } else {
                cookies.set('quantity', 0, {path: '/'});
            }

            cookies.set('product', products, {path: '/'});
            getCookieProducts();
        }

    };

    let total = 0;

    products && products.forEach(product => {
        total += product.amount
    });

    return (
        <div className={'cart main-container'}>
            <NavBar/>
            <br/>
            <Alert/>
            <br/>
            {quantity_error && <div className={'container'}>
                <div key={5439} className={`alert alert-danger`}>
                    {`Kerkohet Sasia`}
                </div>
            </div>}
            <div className={'container'}>
                {products && total !== 0 ?
                    <div className={'table-responsive'}>
                        <table className="table table-borderless ">
                            <tbody>
                            {products && products.map(product => (
                                <tr>
                                    <td>{product.product_name}</td>
                                    <td>{product.product_price}</td>
                                    <td><input type={'number'} name={'quantity'} value={product.quantity} min={1}
                                               max={product.quantity_allowed}
                                               key={product.id}
                                               onChange={(e) => onQuantityChange(e, product.id)}/></td>
                                    <td>{product.amount.toFixed(2)} Lek (te reja)</td>
                                    <td>
                                        <button
                                            onClick={() => window.confirm('Je i sigurt qe doni te fshini produktin?') && onDelete(product.id)}
                                            className={'btn btn-danger'}>X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <h1>Total: {total.toFixed(2)} Lek (te reja)</h1>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                            <div className={'row'}>
                                <div className={'col-md-4 offset-md-4 about-us'}>
                                    <p><label>Emri i plote</label>
                                        <input type={'text'} className={'w3-input'} name={'full_name'} value={full_name}
                                               onChange={e => onChange(e)}/></p>
                                    {!no_email && <p><label>Email</label>
                                        <input type={'text'} className={'w3-input'} name={'email'} value={email}
                                               onChange={e => onChange(e)} disabled={no_email}/></p>}
                                    <p>
                                        <input type="checkbox" id="fruit1" value="Apple" checked={no_email}
                                               name={'no_email'}
                                               onClick={onCheck}/>
                                        <label htmlFor="fruit1" className={'label-check'}>Nuk kam email</label>
                                    </p>
                                    {/*<p><input type="checkbox" name={'no_email'} onClick={onCheck} checked={no_email}/>Nuk*/}
                                    {/*    kam email</p>*/}
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
                        <button onClick={onBuy} className={'btn btn-yellow'}>Blej</button>
                    </div>
                    : <h1 className={'nothing-cart'}>Nuk ka gje ne shporte</h1>
                }
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
            <ImportProducts/>
            <br/>
        </div>
    )
};

Cart.propTypes = {
    buy: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    products: state.products
});

export default connect(mapStateToProps, {getProduct, buy})(Cart);