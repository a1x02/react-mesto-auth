import '../index.css';
import React from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
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
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from  "./Login";
import InfoTooltip from "./InfoTooltip";
import {authorize, register, checkToken} from "../utils/auth"

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [cards, setCards] = React.useState([])
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({})
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [answer, setAnswer] = React.useState({
        status: false,
        text: ""
    })
    const [userEmail, setUserEmail] = React.useState("")

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([resUser, resCard]) => {
                setCurrentUser(resUser);
                setCards(resCard);
            })
            .catch((err) => console.log(err))


    }, []);

    React.useEffect(() => {
        handleTokenCheck()
    }, [])
    const navigate = useNavigate()

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            checkToken(jwt)
                .then((res) => {
                    setLoggedIn(true)
                    setUserEmail(res.data.email)
                    navigate('/', {replace: true})
                })
                .catch(err => console.log(err))
        }
    }

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

    function handleRegister(data) {
        register(data.email, data.password)
            .then(() => {
                setIsInfoTooltipOpen(true)
                setAnswer({
                    status: true,
                    text: 'Вы успешно зарегистрировались!'
                })
                navigate('/sign-in', {replace: true})

            })
            .catch(() => {
                setAnswer({
                    status: false,
                    text: "Что-то пошло не так! Попробуйте еще раз."
                })
                setIsInfoTooltipOpen(true)
            })
    }

    function handleLogin(data) {
        authorize(data.email, data.password)
            .then((res) => {
                setAnswer({
                    status: true,
                    text: 'Вы успешно авторизовались!'
                })
                localStorage.setItem('jwt', res.token)
                setLoggedIn(true)
                setUserEmail(data.email)
                navigate('/', {replace: true})
                setIsInfoTooltipOpen(true)
            })
            .catch(() => {
                setAnswer({
                    status: false,
                    text: "Что-то пошло не так! Попробуйте еще раз."
                })
                setIsInfoTooltipOpen(true)
            })
    }

    function handleLogout() {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        setUserEmail('')
        navigate('/sign-in')
    }

    function closeAllPopups() {
        setSelectedCard(null)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsImagePopupOpen(false)
        setIsPopupConfirmationOpen(false)
        setIsInfoTooltipOpen(false)
    }

    // if (!currentUser) {
    //     return null
    // }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <Header logout={handleLogout} userEmail={userEmail}/>
                <Routes>
                    <Route path="/sign-up" element={<Register title="Регистрация" name="register" handleRegister={handleRegister} />} />
                    <Route path="/sign-in" element={<Login title="Вход" name="login" handleLogin={handleLogin} />} />
                    <Route path="/" element={
                        <ProtectedRoute
                            component={Main}
                            loggedIn={loggedIn}
                            cards={cards}
                            onEditProfile={handleEditProfileClick}
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardDelete={handleCardDelete}
                            onCardLike={handleCardLike}
                        />
                    } />
                    <Route path="*" element={<Navigate to="/sigh-in" replace />} />
                </Routes>
                {/*<Main*/}
                {/*    onEditProfile={handleEditProfileClick}*/}
                {/*    onEditAvatar={handleEditAvatarClick}*/}
                {/*    onAddPlace={handleAddPlaceClick}*/}
                {/*    onCardClick={handleCardClick}*/}
                {/*    onCardDelete={handleCardDelete}*/}
                {/*    onCardLike={handleCardLike}*/}
                {/*    cards={cards}*/}
                {/*    // setCards={setCards}*/}
                {/*    // currentUser={currentUser}*/}
                {/*/>*/}
                <Footer/>
                {/*<EditProfilePopup*/}
                {/*    isOpen={isEditProfilePopupOpen}*/}
                {/*    onClose={closeAllPopups}*/}
                {/*    onUpdateUser={handleUpdateUser}*/}
                {/*    // name={currentUser.name}*/}
                {/*    // about={currentUser.about}*/}
                {/*/>*/}
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

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    answer={answer} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
