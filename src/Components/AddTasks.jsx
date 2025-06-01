import editButton from "../images/edit-button.svg"
import deteleButton from "../images/delete-button.svg"

export default function AddTasks(text){

    return(
    <div className="pending-tasks">
        <button className="checkmark"></button>
        <p className="pending-text">{text.text}</p>
        <div className="function-buttons">
            <button className="edit" aria-label="edit"> <img src={editButton} />
            </button>
            <button className="delete-pending" aria-label="delete"> <img src={deteleButton}/>
            </button>
        </div>
    </div>
    )
}