import React from 'react';
import Tasks from './Tasks';
import { v4 as uuid } from 'uuid';


export default function Main(){
    const [pendingTasks, setPendingTasks] = React.useState([]);
    const [completedTasks, setCompletedTasks] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    function HandlePendingTask(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const newTask = formData.get("Task");
        if (newTask === "") {
            console.log("String empty!");
        } else {
            const task = {
                id: uuid(),
                taskName: newTask
            }
            setPendingTasks(prevTasks => [...prevTasks, task]);
        }
    }

    function HandleCompleteTask(id) {
            const taskToComplete = pendingTasks.find(task => task.id === id);
            if(taskToComplete) {
                setPendingTasks(prevTasks => prevTasks.filter(task => task.id !== id));
                setCompletedTasks(prevTasks => [...prevTasks, taskToComplete]);
            }
    }

    function HandleDeleteTask(id, isCompleted = false) {
        if (isCompleted) {
            setCompletedTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } else {
            setPendingTasks(prevTasks => prevTasks.filter(currentTask => currentTask.id !== id));
        }
    }

    function HandleFilterChange(filter){
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
            <form id="form" className="input-container" onSubmit={HandlePendingTask}>
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
                        <button className={"all" + (filter === "all" ? "active" : "")} onClick={() => HandleFilterChange("all")}> All </button>
                        <button className={"pending" + (filter === "pending" ? "active" : "")} onClick={() => HandleFilterChange("pending")} > Pending </button>
                        <button className={"completed" + (filter === "completed" ? "active" : "")} onClick={() => HandleFilterChange("completed")}> Completed </button>
                    </div>
                    <div className="task-input">
                        {filteredTasks.pendingTasks.map((taskName, index) => (
                            <Tasks
                                key={index}
                                id= {taskName.id} 
                                text={taskName.taskName}
                                isCompleted={false}
                                onComplete={HandleCompleteTask}
                                onDelete={HandleDeleteTask}
                            />
                        ))}
                        {filteredTasks.completedTasks.map((taskName) => (
                            <Tasks 
                                key={taskName.id} 
                                id= {taskName.id}
                                text={taskName.taskName}
                                isCompleted={true}
                                onComplete={HandleCompleteTask}
                                onDelete={HandleDeleteTask}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}