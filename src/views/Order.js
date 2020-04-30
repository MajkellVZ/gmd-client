import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getOrders, deleteOrders, filterOrders} from "../actions/orders";
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const Orders = ({getOrders, deleteOrders, filterOrders, auth, orders}) => {
    useEffect(() => {
        getOrders(1)
    }, [getOrders]);

    const [formData, setFormData] = useState({
        page: 1,
        search_term: ''
    });

    const {search_term} = formData;

    const onDelete = (id) => {
        deleteOrders(id);
        getOrders();
    };

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onFilter = () => {
        console.log(search_term);
        filterOrders(search_term);
    };

    const onNextPage = (e) => {
        e.preventDefault();
        filterOrders(search_term, parseInt(orders.orders.page) + 1);
        setFormData({...formData, page: parseInt(orders.orders.page) + 1});
    };

    const onPreviousPage = (e) => {
        e.preventDefault();
        filterOrders(search_term, parseInt(orders.orders.page) - 1);
        setFormData({...formData, page: parseInt(orders.orders.page) - 1})
    };

    const onFirstPage = (e) => {
        e.preventDefault();
        filterOrders(search_term, 1);
        setFormData({...formData, page: 1})
    };

    const onLastPage = (e) => {
        e.preventDefault();
        filterOrders(search_term, orders.orders.total_pages);
        setFormData({...formData, page: orders.orders.total_pages});
    };

    return (
        <div>
            <NavBar auth={auth.isAuthenticated}/>
            <br/>
            <Alert/>
            <br/>
            <div className={'container'}>
                <input type={'text'} name={'search_term'} placeholder={'Kerko...'} onChange={e => onChange(e)}
                       onKeyUp={() => onFilter()}/>
                <div className={'table-responsive'}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Produkti</th>
                            <th scope="col">Sasia</th>
                            <th scope="col">Emri Plote</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefoni</th>
                            <th scope="col">Adresa</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.orders.orders && orders.orders.orders.map(order => (
                            <tr>
                                <td>{order.name}</td>
                                <td>{order.quantity}</td>
                                <td>{order.full_name}</td>
                                <td>{order.email}</td>
                                <td>{order.phone}</td>
                                <td>{order.address}</td>
                                <td>
                                    <button className={'btn btn-danger'}
                                            onClick={() => window.confirm('Je i sigurt qe doni te fshini porosine?') && onDelete(order.id)}>x
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {orders.orders && orders.orders.total > 10 &&
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={orders.orders && parseInt(orders.orders.page) === 1 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" tabIndex="-1" onClick={e => onFirstPage(e)}>First</a>
                        </li>
                        <li className={orders.orders && parseInt(orders.orders.page) === 1 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={e => onPreviousPage(e)}>Previous</a></li>
                        <li className="page-item"><a className="page-link"
                                                     href="#">{orders.orders && orders.orders.page}</a>
                        </li>
                        <li className={orders.orders && parseInt(orders.orders.page) === parseInt(orders.orders.total_pages) ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={e => onNextPage(e)}>Next</a></li>
                        <li className={orders.orders && parseInt(orders.orders.page) === parseInt(orders.orders.total_pages) ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={e => onLastPage(e)}>Last</a>
                        </li>
                    </ul>
                </nav>}
            </div>
        </div>
    )
};

Orders.propTypes = {
    getOrders: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    deleteOrders: PropTypes.func.isRequired,
    filterOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders
});

export default connect(mapStateToProps, {getOrders, deleteOrders, filterOrders})(Orders);