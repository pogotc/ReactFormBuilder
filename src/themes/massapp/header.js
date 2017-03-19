import React from 'react';

const Header = (props) =>
    <div>
        <header role="banner" className="global-header">
        <div className="global-header__inner js-nav-peek headroom headroom--not-bottom is-pinned headroom--top">
            <div className="global-header__navigation u-constrained">
                    <ul className="global-navigation" role="navigation" id="global-navigation">
                        <li className="global-navigation__item ">
                        <a href="https://www.masseyhall.com/?_ga=1.109756421.1641918762.1488266899" title="Massey Hall" className="global-navigation__link">Massey Hall</a>
                        </li>
                        <li className="global-navigation__item ">
                        <a href="https://www.roythomsonhall.com/?_ga=1.88795035.1641918762.1488266899" title="Roy Thomson Hall" className="global-navigation__link">Roy Thomson Hall</a>
                        </li>
                        <li className="global-navigation__item ">
                        <a href="https://www.masseyhallandroythomsonhall.com/" title="The Corporation" className="global-navigation__link">The Corporation</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div className="global-sidebar" role="navigation">
        <div className="global-sidebar__inner">
            
            <div className="global-sidebar__branding">
                <span className="global-branding u-ir">Branding</span>
            </div>
        </div>
    </div>
    </div>

export default Header;