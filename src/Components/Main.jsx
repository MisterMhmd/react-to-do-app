import React from 'react';
import Tasks from './Tasks';

export default function Main(){
    const [pendingTasks, setPendingTasks] = React.useState([]);
    const [completedTasks, setCompletedTasks] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    function HandlePendingTask(formData) {
        const newTask = formData.get("Task");
        if (newTask == "") {
            console.log("String empty!");
        } else {
            setPendingTasks(prevTasks => [...prevTasks, newTask]);
        }
    }

    function HandleCompleteTask(taskName) {
        setPendingTasks(prevTasks => prevTasks.filter(task => task !== taskName));
        setCompletedTasks(prevTasks => [...prevTasks, taskName]);
    }

    function HandleDeleteTask(taskName, isCompleted = false) {
        if (isCompleted) {
            setCompletedTasks(prevTasks => prevTasks.filter(task => task !== taskName));
        } else {
            setPendingTasks(prevTasks => prevTasks.filter(task => task !== taskName));
        }
    }

    function HandleFilterChange(filter){
        setFilter(filter);
    }

    function getFilteredTasks() {
        if (filter === "pending") {
            return {
                pendingTasks: pendingTasks,
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
            <form id="form" className="input-container" action={HandlePendingTask}>
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
                        <button className={"all" + (filter === "all" ? "active" : "")} onClick={() => HandleFilterChange("all")}> All </button>
                        <button className={"pending" + (filter === "pending" ? "active" : "")} onClick={() => HandleFilterChange("pending")} > Pending </button>
                        <button className={"completed" + (filter === "completed" ? "active" : "")} onClick={() => HandleFilterChange("completed")}> Completed </button>
                    </div>
                    <div className="task-input">
                        {filteredTasks.pendingTasks.map((taskName, index) => (
                            <Tasks
                                key={index} 
                                text={taskName}
                                isCompleted={false}
                                onComplete={HandleCompleteTask}
                                onDelete={HandleDeleteTask}
                            />
                        ))}
                        {filteredTasks.completedTasks.map((taskName, index) => (
                            <Tasks 
                                key={index} 
                                text={taskName}
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