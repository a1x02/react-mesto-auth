import React from "react";
import authPass from '../images/auth-true.svg'
import authFail from '../images/auth-false.svg'

function InfoTooltip({isOpen, answer, onClose}) {
    return(
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <img
                    className="popup__auth-image"
                    alt={answer.status ? "Авторизация успешна" : "Что-то пошло не так"}
                    src={answer.status ? authPass : authFail}>
                </img>
                <h2 className="popup__title popup__title_auth">{answer.text}</h2>
                <button
                    className="popup__close"
                    type="button"
                    onClick={onClose}>
                </button>
            </div>
        </div>
    )
}

export default InfoTooltip