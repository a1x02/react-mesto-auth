import React from 'react'
import headerLogo from '../images/header__logo.svg'
import {Route, Routes, Link} from "react-router-dom";

function Header ({logout, userEmail}) {
    return (
        <header className="header">
            <img className="header__logo" alt="логотип Mesto" src={headerLogo} />
            <Routes>
                <Route path="/sign-up" element={
                    <Link to="/sign-in" className="header__link">Войти</Link>} />
                <Route path="/sign-in" element={
                    <Link to="/sign-up" className="header__link">Регистрация</Link>} />
                <Route path="/" element={
                    <>
                        <div className="header__info">
                            <p className="header__email">{userEmail}</p>
                            <button onClick={logout} className="header__logout">Выйти</button>
                        </div>
                    </>
                } />
            </Routes>
        </header>
    )
}

export default Header