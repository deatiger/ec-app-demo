import React from 'react';

const Footer = () => {
    return (
        <footer>
            <ul className="l-footer">
                <a className="u-text__link-none" href="https://torahack.web.app/" target="_blank" rel="noreferrer noopener">
                    <li>運営会社</li>
                </a>
                <a className="u-text__link-none" href="https://torahack.web.app/terms/" target="_blank" rel="noreferrer noopener">
                    <li>利用規約</li>
                </a>
                <a className="u-text__link-none" href="https://torahack.web.app/privacy/" target="_blank" rel="noreferrer noopener">
                    <li>プライバシーポリシー</li>
                </a>
                <a className="u-text__link-none">
                    <li>Copyright &copy; 2019 Torahack</li>
                </a>
            </ul>
        </footer>
    );
};

export default Footer;