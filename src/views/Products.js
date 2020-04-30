import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    insertProduct,
    getProductsAdmin,
    deleteProducts,
    filterProducts,
    makeImportant,
    makeUnimportant
} from "../actions/products";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import Alert from "../components/Alert";
import NavBar from "../components/NavBar";

const customStyles = {
    content: {
        color: 'white',
        background: '#2d545e',
        background: '#2d545e'
    }
};

const Products = ({
                      insertProduct, getProductsAdmin, deleteProducts, filterProducts, makeImportant, makeUnimportant, auth, products
                  }) => {
        useEffect(() => {
            getProductsAdmin(1)
        }, [getProductsAdmin]);

        const [formData, setFormData] = useState({
            search_term: '',
            name: '',
            quantity: '',
            price: '',
            description: '',
            category: 'household',
        });

        const {search_term, name, description, price, quantity, category} = formData;

        const onDelete = (id) => {
            deleteProducts(id);
            getProductsAdmin(1);
        };

        const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

        const onFilter = () => {
            console.log(search_term);
            filterProducts(search_term);
        };

        const onNextPage = (e) => {
            e.preventDefault();
            filterProducts(search_term, parseInt(products.products.page) + 1);
        };

        const onPreviousPage = (e) => {
            e.preventDefault();
            filterProducts(search_term, parseInt(products.products.page) - 1);
        };

        const onFirstPage = (e) => {
            e.preventDefault();
            filterProducts(search_term, 1);
        };

        const onLastPage = (e) => {
            e.preventDefault();
            filterProducts(search_term, products.products.total_pages);
        };

        const important = (id) => {
            makeImportant(id);
            getProductsAdmin(1);
        };

        const unimportant = (id) => {
            makeUnimportant(id);
            getProductsAdmin(1);
        };

        const [modalIsOpen, setIsOpen] = useState(false);

        const openModal = () => setIsOpen(true);

        const closeModal = () => setIsOpen(false);

        const addProduct = () => {
            const data = {
                name, description, price, quantity, category
            };

            insertProduct(data);
            getProductsAdmin(1);
        };

        return (
            <div>
                <NavBar auth={auth.isAuthenticated}/>
                <Alert/>
                <div className={'container'}>
                    <br/>
                    <button onClick={openModal} className={'btn btn-warning'}>Shto Produkt</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                    >
                        <div className={'row'}>
                            <div className={'col-md-4 offset-md-4 about-us'}>
                                <Alert/>
                                <p><label>Emri</label><input type={'text'} className={'w3-input'} name={'name'} value={name}
                                                             onChange={e => onChange(e)}/></p>
                                <p><label>Pershkrimi</label><input type={'text'} className={'w3-input'} name={'description'}
                                                                   value={description}
                                                                   onChange={e => onChange(e)}/></p>
                                <p><label>Sasia</label><input type={'number'} className={'w3-input'} name={'quantity'}
                                                              value={quantity} onChange={e => onChange(e)}/>
                                </p>
                                <p><label>Çmimi</label><input type={'number'} className={'w3-input'} name={'price'}
                                                              value={price} onChange={e => onChange(e)}/></p>
                                <p><label>Kategoria</label><select name="category" className={'w3-input'} id=""
                                                                   onChange={e => onChange(e)}>
                                    <option value="household">Elektro Shtepiake</option>
                                    <option value="pool">Bilardo</option>
                                    <option value="toys">Lodra</option>
                                </select></p>
                                <div className={'row justify-content-center align-items-center'}>
                                    <button onClick={addProduct} className={'btn btn-white'}>Shto</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <br/>
                    <br/>
                    <input type={'text'} name={'search_term'} placeholder={'Kerko...'} onChange={e => onChange(e)}
                           onKeyUp={() => onFilter()}/>
                    <div className={'table-responsive'}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Produkti</th>
                                <th scope="col">Sasia</th>
                                <th scope="col">Çmimi</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.products.products && products.products.products.map(product => (
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Link to={`/edit/product/${product.id}`}>
                                            <button className={'btn btn-warning'}><i
                                                className="fa fa-edit"></i></button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/media/product/${product.id}`}>
                                            <button className={'btn btn-warning'}><i
                                                className="fa fa-image"></i></button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className={'btn btn-danger'}
                                                onClick={() => window.confirm('Je i sigurt qe doni te fshini produktin?') && onDelete(product.id)}>x
                                        </button>
                                    </td>
                                    <td>
                                        <button className={product.isImportant === 0 ? 'btn btn-danger' : 'btn btn-success'}
                                                onClick={product.isImportant === 0 ? () => important(product.id) : () => unimportant(product.id)}>
                                            <i
                                                className="fa fa-star" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {products.products && products.products.total > 10 &&
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={products.products && parseInt(products.products.page) === 1 ? "page-item disabled" : "page-item"}>
                                <a className="page-link" href="#" tabIndex="-1" onClick={e => onFirstPage(e)}>First</a>
                            </li>
                            <li className={products.products && parseInt(products.products.page) === 1 ? "page-item disabled" : "page-item"}>
                                <a className="page-link" href="#" onClick={e => onPreviousPage(e)}>Previous</a></li>
                            <li className="page-item"><a className="page-link"
                                                         href="#">{products.products && products.products.page}</a>
                            </li>
                            <li className={products.products && parseInt(products.products.page) === parseInt(products.products.total_pages) ? "page-item disabled" : "page-item"}>
                                <a className="page-link" href="#" onClick={e => onNextPage(e)}>Next</a></li>
                            <li className={products.products && parseInt(products.products.page) === parseInt(products.products.total_pages) ? "page-item disabled" : "page-item"}>
                                <a className="page-link" href="#" onClick={e => onLastPage(e)}>Last</a>
                            </li>
                        </ul>
                    </nav>}
                </div>
            </div>
        )
    }
;

Products.propTypes = {
    getProductsAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    deleteProducts: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired,
    makeImportant: PropTypes.func.isRequired,
    makeUnimportant: PropTypes.func.isRequired,
    insertProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    products: state.products
});

export default connect(mapStateToProps, {
    getProductsAdmin,
    deleteProducts,
    filterProducts,
    makeImportant,
    makeUnimportant,
    insertProduct
})(Products);