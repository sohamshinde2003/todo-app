import React, { useEffect, useState } from 'react'
import { getAllTask, getUserStatus, signOutUser } from '../api-firebase/api-config'
import { useNavigate } from 'react-router-dom';
import AddTaskDialog from '../components/AddTaskDialog';
import Card from '../components/Card';

export default function Dashboard() {
  const navigator = useNavigate();
  const [isAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const checkUserStatus = async () => {
      const isLoggedIn = await getUserStatus();

      if (!isLoggedIn) {
        navigator('/login');
      }
    };
    
    checkUserStatus();
    fetchData();
    console.log(taskList);
  }, [navigator]);

  const  fetchData =async ()=>{
    let data  = await getAllTask()
    setTaskList(data);
  }
  const handleLogout = () => {
    signOutUser();
    navigator('/login');
  };

  const handleAddTaskClick = () => {
    setAddTaskDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setAddTaskDialogOpen(false);
    fetchData();
  };


  return (
    <> <nav class="navbar">
      <div class="title">Todo Application</div>
    </nav>       <div class="container-1">
        <div class="top-menu">
          <div>
            <button class="btn" onClick={handleLogout}>
              <i class="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
          <div>
            <button className="btn" onClick={handleAddTaskClick}>
              <i className="bi bi-plus"></i>
              Add Task
            </button>
          </div>
        </div>

        <div class="data-container">
        {
          taskList && taskList.map(item => {
            return (
              <Card key={item.id} data={item} reload={()=>{fetchData()}}/>
            )
          }
          )
        }
        </div>
        {isAddTaskDialogOpen && <AddTaskDialog onClose={handleCloseTaskDialog} />}
      </div></>
  )
}
