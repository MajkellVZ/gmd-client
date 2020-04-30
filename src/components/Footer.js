import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer className="mainfooter" role="contentinfo">
                    <div className="footer-middle">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <ul className="social-network social-circle">
                                        <li><a href="https://www.instagram.com/_gmd_shop_/" target={"_blank"} className="icoInstagram" title="Instagram"><i
                                            className="fa fa-instagram"></i></a></li>
                                        <li><a href="https://api.whatsapp.com/send?phone=+355699767618&text=Pershendetje" target={"_blank"} className="icoWhatsapp" title="Whatsapp"><i
                                            className="fa fa-whatsapp"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col copy">
                                    <p className="text-center">&copy; Copyright 2020 - GMD Shop. All rights
                                        reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer