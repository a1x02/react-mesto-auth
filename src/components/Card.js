import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id
    const isLiked = props.card.likes.some((like) => like._id === currentUser._id)
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    )
    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    return (
        <div className="element">
            <img className="element__image"
                 src={props.card.link}
                 alt={props.card.name}
                 onClick={handleClick}
            />
            <div className="element__description">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <h3 className="element__like-counter">{props.card.likes.length}</h3>
                </div>
                {isOwn && <button className="delete-button" type="button" onClick={handleDeleteClick}></button>}
            </div>
        </div>
    )
}

export default Card