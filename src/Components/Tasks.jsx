import CheckMarkButton from "./Buttons/CheckMarkButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

export default function Tasks({text, id, isCompleted, onComplete, onDelete}){

    function deleteTask() {
        if(onDelete){
            onDelete(id, isCompleted);
        }
    }


    function completeTask() {
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
                    <DeleteButton onDelete={deleteTask} id={id} isCompleted={isCompleted}/>
                </div>
            </div>
        )
    }

    return(
        <div className="pending-tasks">
            <button className="checkmark" onClick={completeTask}></button>
            <p className="pending-text">{text}</p>
            <div className="function-buttons">
                <EditButton />
                <DeleteButton onDelete={deleteTask} id={id} isCompleted={isCompleted}/>
            </div>
        </div>
    )
}