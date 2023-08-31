import '../index.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api.js"
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [cards, setCards] = React.useState([])
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({})

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([resUser, resCard]) => {
                setCurrentUser(resUser);
                setCards(resCard);
            })
            .catch((err) => console.log(err))


    }, []);

    function handleCardClick(card) {
        setSelectedCard(card)
        // setIsImagePopupOpen(true)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((like) => like._id === currentUser._id)

        if (!isLiked) {
            api.putCardLike(card._id).then((newCard) => {
                setCards((state) => state.map((item) => item._id === card._id ? newCard : item))
            }).catch((err) => console.log(err))
        } else {
            api.deleteCardLike(card._id).then((newCard) => {
                setCards((state) => state.map((item) =>item._id === card._id ? newCard : item))
            }).catch((err) => console.log(err))
        }

    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((item) => item.filter((i) => i._id !== card._id && i))
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateUser({name, about}) {
        api
            .patchUserInfo({name, about})
            .then((userData) => {
                setCurrentUser(userData)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleUpdateAvatar(data) {
        api.patchProfileImage(data)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups()
            }).catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            }).catch((err) => console.log(err))
    }

    function closeAllPopups() {
        setSelectedCard(null)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsImagePopupOpen(false)
        setIsPopupConfirmationOpen(false)
    }

    // if (!currentUser) {
    //     return null
    // }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    cards={cards}
                    // setCards={setCards}
                    // currentUser={currentUser}
                />
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    // name={currentUser.name}
                    // about={currentUser.about}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
                />

                <PopupWithForm
                    name="confirmation"
                    title="Вы уверены?"
                    isOpen={isPopupConfirmationOpen}
                    onClose={closeAllPopups}
                    children={
                        <>
                            <button type="submit" className="popup__save-button popup__save-button_delete-card">Да</button>
                        </>
                    }
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
