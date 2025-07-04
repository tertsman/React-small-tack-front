import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import './App.css'
import { useState } from "react";
import TaskManager from "./component/TaskManager";
// import PriorityDropdown from "./component/PriorityDropdown";

function App() {
  const [activeSize, setActiveSize] = useState(null);
  const isActive = (index) => {
    setActiveSize(index);
  };
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">
            <h1>TaskFlow</h1>
          </div>
          <div className="headRight">
            <div className="datepicker">
              <span>June 13, 2025</span>
              <div className="dot"></div>
              <div className="dayHead">Friday</div>
            </div>
            <button className='plus'><FaPlus /></button>
          </div>
        </div>
        <div className="searchContainer">
          <div className="SearchBox">
            <div className="SearchIcon"><IoIosSearch/></div>
            <input type="text" placeholder="Search tasks ....!" className="SearchField" />
          </div>
          <div className="SortBox">
            <span className="borderCircle"></span>
            <p>Sort</p>
          </div>
        </div>
          <div className="TabContainer">
            <button className={`tag ${activeSize === 0 ? "active" : ""}`}
                        onClick={() => isActive(0)}>ALL</button>
            <button className={`tag ${activeSize === 1 ? "active" : ""}`}
                        onClick={() => isActive(1)}>Today</button>
            <button className={`tag ${activeSize === 2 ? "active" : ""}`}
                        onClick={() => isActive(2)}>Upcoming</button>
            <button className={`tag ${activeSize === 3 ? "active" : ""}`}
                        onClick={() => isActive(3)}>Completed</button>
          </div>
          <div className="addTack">

          <TaskManager filter={activeSize}/>
          </div>
        {/* <div className="TaskContainer">
            <div className="TaskForm">
              <div className="InputTask">
                <input type="text" placeholder="add task..." />
                <div class="ml-4 flex items-center space-x-2">
                        <div class="relative">
                          
                        </div>
                        <button id="add-btn" >
                            Add Task
                        </button>
                    </div>
              </div>
              
            </div>
        </div> */}
      </div>
    </>
  )
}

export default App
