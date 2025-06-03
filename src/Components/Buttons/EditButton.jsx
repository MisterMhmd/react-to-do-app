import editButton from "../images/edit-button.svg"


export default function EditButton({onEdit}){
    return(
        <button className="edit" aria-label="edit" onClick={onEdit}>
            <img src={editButton} />
        </button>
    )
}