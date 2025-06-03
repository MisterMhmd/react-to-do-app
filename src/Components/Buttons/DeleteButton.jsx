import deleteButton from "../images/delete-button.svg"

export default function DeleteButton({id, onDelete, isCompleted}){


    function handleDeleteClick() {
        if(onDelete){
            onDelete(id, isCompleted);
        }
    }

    return (
    <button className="delete" aria-label="delete" onClick={handleDeleteClick}>
        <img src={deleteButton}/>
    </button>
    )
}