import React from 'react'
import AddTasks from './Addtasks';

export default function Main(){
    const addedTasks = [];
    const [Pendingtasks, setPendingTasks] = React.useState([]);

    function HandleAddTask(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newTask = formData.get("Task");

        if (newTask == "") {
            console.log("String empty!")
        } else {
            setPendingTasks(prevTasks => [...prevTasks, newTask])
        }


    }


    return (
        <>
        <form id="form" className="input-container" onSubmit={HandleAddTask}>
            <div className="Adding-Tasks"> 
                <input className="adding" placeholder="Attend Meetings" size="300" id="task" name="Task"/>
            </div>
            <div className="button">
                <input className="add" type="submit" value="Add task" />
            </div>
        </form>
        <div className="task-container">
            <div className="task-list">
                <div className="rectangle-header">
                    <p className="task-header"> Tasks </p>
                </div>
                <div className="filters">
                    <button className="all" > All </button>
                    <button className="pending" > Pending </button>
                    <button className="completed"> Completed </button>
                </div>
                <div className="task-input">
                    {Pendingtasks.map((taskName, index) => (
                    <AddTasks key={index} text={taskName}/>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}