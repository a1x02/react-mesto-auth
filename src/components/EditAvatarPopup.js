import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const ref = React.useRef()

    function handleSubmit(evt) {
        evt.preventDefault()

        onUpdateAvatar({
            avatar: ref.current.value
        })
    }

    React.useEffect(() => {
        ref.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
            children={
                <>
                    <input ref={ref} className="popup__input popup__input_subject_avatar" name="input-avatar"
                           id="avatar-input" type="url"
                           placeholder="Ссылка на аватар" required></input>
                    <span className="popup__input-error avatar-input-error"></span>
                </>
            }
        />
    )
}

export default EditAvatarPopup