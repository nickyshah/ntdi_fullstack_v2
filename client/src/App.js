import { useEffect, useState } from 'react';
import './App.css';
import { Form } from './Components /Form';
import { Message, Spinner } from './Components /Message';
import { Tables } from './Components /Tables';
import { getTasks } from './Helper/axiosHelper';

function App() {

  const [resp, setResp] = useState({})
  const [showSpinner, setShowSpinner] = useState(false)
 const [taskList, setTaskList] = useState([])

useEffect(()=>{
  fetchTask()
}, [])
  const fetchTask = async () => {
    const data = await getTasks()
    console.log(data)
    if (data.status === 'success') {
      setTaskList(data.taskLists)
      // console.log(data.taskList)
    }
  }

  const ttlhr = taskList.reduce((a, i) => a + +i.hr, 0)
  const msg = {
      status: "success",
      message: `You Could have Saved ${ttlhr} Hours.`
  }

  return (
   <div className="wrapper">
    <div className="container">
      <div className="row">
        <div className="col mt-4 text-center mb-4">
          <h1>Not To-Do List</h1>
        </div>
      </div>
      <Message resp={resp} />
      {showSpinner && <Spinner />}
      {/* form here  */}
      <Form ttlhr={ttlhr} fetchTask={fetchTask} setResp={setResp} setShowSpinner={setShowSpinner}/>
      <hr />
      {/* table Here  */}

      <Tables 
      fetchTask={fetchTask} taskList={taskList} setResp={setResp} />
      {/* Delete Button Here */}
    </div>
   </div>
)
}

export default App;
