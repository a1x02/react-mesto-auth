import React from "react";
import profileAvatar from '../images/profile__avatar.jpg'
import {api} from '../utils/api.js'
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext.js";


function Main(props) {
    // const [cards, setCards] = React.useState([])
    const currentUser = React.useContext(CurrentUserContext)

    // React.useEffect(() => {
    //     api.getInitialCards()
    //         .then((response) => {
    //             props.setCards(response)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-edit" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="аватар пользователя" />
                </button>
                <div className="profile-info">
                    <div className="profile__top">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onDeleteCardClick={props.onDeleteCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main