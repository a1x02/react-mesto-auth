import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')


    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onUpdateUser({
            name,
            about: description,
        })
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name)
            setDescription(currentUser.about)
        }
        
    }, [currentUser, props.isOpen])

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <label className="popup__label">
                        <input className="popup__input popup__input_subject_name" id="name-input" name="name"
                               placeholder="Имя"
                               required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange}></input>
                        <span className="popup__input-error name-input-error"></span>
                    </label>
                    <label className="popup__label">
                        <input className="popup__input popup__input_subject_description" id="description-input"
                               name="description"
                               placeholder="Вид деятельности" required minLength="2" maxLength="200" value={description || ''}
                               onChange={handleDescriptionChange}></input>
                        <span className="popup__input-error description-input-error"></span>
                    </label>
                    <button className="popup__save-button" type="submit">Сохранить</button>
                </>
            }
        />
    )
}

export default EditProfilePopup