import CheckMarkButton from "./Buttons/CheckMarkButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

export default function AddTasks({text, id, isCompleted, onComplete, onDelete}){

    function handleDeleteClick() {
        if(onDelete){
            onDelete(id, isCompleted);
        }
    }


    function handleCheckmarkClick() {
        if (!isCompleted && onComplete) {
            onComplete(id);
        }
    }

    if (isCompleted) {
        return(
            <div className="completed-tasks">
                <CheckMarkButton />
                <p className="text">{text}</p>
                <div className="function-buttons">
                    <DeleteButton onDelete={handleDeleteClick} id={id} isCompleted={isCompleted}/>
                </div>
            </div>
        )
    }

    return(
        <div className="pending-tasks">
            <button className="checkmark" onClick={handleCheckmarkClick}></button>
            <p className="pending-text">{text}</p>
            <div className="function-buttons">
                <EditButton />
                <DeleteButton onDelete={handleDeleteClick} id={id} isCompleted={isCompleted}/>
            </div>
        </div>
    )
}