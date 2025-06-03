import CheckMarkButton from "./Buttons/CheckMarkButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import SaveAndCancelButton from "./Buttons/SaveAndCancelButton";

export default function Tasks({text, id, isCompleted, isEditing, editedText, onComplete, onDelete, onStartEdit, onSaveEdit, onCancelEdit, onEditTextChange}){

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

    function editTask() {
        if (!isCompleted && onStartEdit) {
            onStartEdit(id, text);
        }
    }

    function saveTask() {
        if (onSaveEdit) {
            onSaveEdit();
        }
    }

    function cancelTask() {
        if (onCancelEdit) {
            onCancelEdit();
        }
    }

    function changeText(event) {
        if (onEditTextChange) {
            onEditTextChange(event.target.value);
        }
    }

    function onKeyPress(event) {
        if (event.key === "Enter") {
            saveTask();
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
            {isEditing ? (
                <input type="text" className="pending-text" id="edited-text" value={editedText} onChange={changeText} onKeyDown={onKeyPress}/>
            ) : (
                <p className="pending-text">{text}</p>
            )}  
            <div className="function-buttons">
            {isEditing ? (
                <SaveAndCancelButton onCancel={cancelTask} onSave={saveTask}/>
            ) : (          
                <>
                    <EditButton onEdit={editTask}/>
                    <DeleteButton onDelete={deleteTask} id={id} isCompleted={isCompleted}/>  
                </>     
            )
            }
            </div>
        </div>
    )
}