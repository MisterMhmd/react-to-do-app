import React from 'react';
import Tasks from './Tasks';
import { v4 as uuid } from 'uuid';


export default function Main(){
    const [pendingTasks, setPendingTasks] = React.useState([]);
    const [completedTasks, setCompletedTasks] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    function handlePendingTask(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const taskText = formData.get("Task");
        if (taskText === "") {
            alert("String empty!")
        } else {
            const newTask = {
                id: uuid(),
                taskName: taskText
            }
            setPendingTasks(prevTasks => [...prevTasks, newTask]);
        }
    }

    function handleDeletedTask(id, isCompleted = false) {
        if (isCompleted) {
            setCompletedTasks(prevTasks => prevTasks.filter(currentTask => currentTask.id !== id));
        } else {
            setPendingTasks(prevTasks => prevTasks.filter(currentTask => currentTask.id !== id));
        }
    }

    function handleCompletedTask(id) {
        const completedTask = pendingTasks.find(currentTask => currentTask.id === id);
        if(completedTask) {
            setPendingTasks(prevTasks => prevTasks.filter(currentTask => currentTask.id !== id));
            setCompletedTasks(prevTasks => [...prevTasks, completedTask]);
        }
    }

    function handleFilterChange(filter){
        setFilter(filter);
    }

    function getFilteredTasks() {
        if (filter === "pending") {
            return {
                pendingTasks: pendingTasks ,
                completedTasks: []
            };
        } else if (filter === "completed") {
            return {
                pendingTasks: [],
                completedTasks: completedTasks
            };
        } else  if (filter === "all") {
            return {
                pendingTasks: pendingTasks,
                completedTasks: completedTasks
            };
        }
    }


    const filteredTasks = getFilteredTasks();


    return (
        <>
            <form id="form" className="input-container" onSubmit={handlePendingTask}>
                <div className="Adding-Tasks">
                    <input className="adding" placeholder="Attend Meetings" id="task" name="Task"/>
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
                        <button className={"all" + (filter === "all" ? "active" : "")} onClick={() => handleFilterChange("all")}> All </button>
                        <button className={"pending" + (filter === "pending" ? "active" : "")} onClick={() => handleFilterChange("pending")} > Pending </button>
                        <button className={"completed" + (filter === "completed" ? "active" : "")} onClick={() => handleFilterChange("completed")}> Completed </button>
                    </div>
                    <div className="task-input">
                        {filteredTasks.pendingTasks.map((task, index) => (
                            <Tasks
                                key={index}
                                id= {task.id} 
                                text={task.taskName}
                                isCompleted={false}
                                onComplete={handleCompletedTask}
                                onDelete={handleDeletedTask}
                            />
                        ))}
                        {filteredTasks.completedTasks.map((task) => (
                            <Tasks 
                                key={task.id} 
                                id= {task.id}
                                text={task.taskName}
                                isCompleted={true}
                                onComplete={handleCompletedTask}
                                onDelete={handleDeletedTask}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}