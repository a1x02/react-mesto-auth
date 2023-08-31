import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('')
    const [source, setSource] = React.useState('')

    React.useEffect(() => {
        if (isOpen) {
            setName('')
            setSource('')
        }
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault()

        onAddPlace({
            name: name,
            description: source
        })
    }

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleSourceChange(evt) {
        setSource(evt.target.value)
    }

    return (
        <PopupWithForm
        name='add'
        title='Новое место'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        children={
            <>
                <label className="popup__label">
                    <input value={name} onChange={handleNameChange} type="text" className="popup__input popup__input_subject_name" id="title-input"
                           placeholder="Название"
                           name="name" required minLength="2" maxLength="30"></input>
                    <span className="popup__input-error title-input-error"></span>
                </label>
                <label className="popup__label">
                    <input value={source} onChange={handleSourceChange} className="popup__input popup__input_subject_description" id="link-input"
                           placeholder="Ссылка на картинку" name="description" type="url" required></input>
                    <span className="popup__input-error link-input-error"></span>
                </label>
                <button className="popup__save-button" type="submit">Сохранить</button>
            </>
        }
        />
    )
}

export default AddPlacePopup