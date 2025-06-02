import editButton from "../images/edit-button.svg"
import deteleButton from "../images/delete-button.svg"
import checkmarkIcon from "../images/checkmark.svg"

export default function AddTasks({text, isCompleted, onComplete, onDelete}){
    
    function handleCheckmarkClick() {
        if (!isCompleted && onComplete) {
            onComplete(text);
        }
    }

    function handleDeleteClick() {
        if (onDelete) {
            onDelete(text, isCompleted);
        }
    }

    if (isCompleted) {
        return(
            <div className="completed-tasks">
                <button className="check-icon" aria-label="checked">
                    <img src={checkmarkIcon} />
                </button>
                <p className="text">{text}</p>
                <div className="function-buttons">
                    <button className="delete-completed" aria-label="delete" onClick={handleDeleteClick}>
                        <img src={deteleButton}/>
                    </button>
                </div>
            </div>
        )
    }

    return(
        <div className="pending-tasks">
            <button className="checkmark" onClick={handleCheckmarkClick}></button>
            <p className="pending-text">{text}</p>
            <div className="function-buttons">
                <button className="edit" aria-label="edit">
                    <img src={editButton} />
                </button>
                <button className="delete-pending" aria-label="delete" onClick={handleDeleteClick}>
                    <img src={deteleButton}/>
                </button>
            </div>
        </div>
    )
}