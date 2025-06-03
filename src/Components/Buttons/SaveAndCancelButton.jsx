import saveButton from "../images/Save.svg"
import cancelButton from "../images/Cancel.svg"


export default function SaveAndCancelButton({onCancel, onSave}){
    return (
        <>
        <button className="save" aria-label="save" onClick={onSave}>
            <img src={saveButton} />
        </button>
        <button className="cancel" aria-label="cancel" onClick={onCancel}>
            <img src={cancelButton} />
        </button>
        </>
    )
}