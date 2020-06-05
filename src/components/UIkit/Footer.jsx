import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="main c-section">
                <div className="main-inner">
                    <section className="foot">
                        <ul>
                            <a className="u-text__link" href="https://torahack.web.app/terms/">
                                <li>利用規約</li>
                            </a>
                            <a className="u-text__link" href="https://torahack.web.app/privacy/"
                               target="_blank" rel="noreferrer noopener">
                                <li>プライバシーポリシー</li>
                            </a>
                            <a className="u-text__link">
                                <li>Copyright &copy; 2019 Torahack</li>
                            </a>
                        </ul>
                    </section>
                </div>
            </div>
        </footer>
    );
};

export default Footer;