import editButton from "../images/edit-button.svg"


export default function EditButton(props){
    return(
    <button className="edit" aria-label="edit">
        <img src={editButton} />
    </button>
    )
}