import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('')
  const [Edit, setEdit] = useState(null)
  const [input2, setInput2] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Tasks'));
    if (data.length > 0) {
      console.log("running")
      setTasks(data);
    }
    else{
      localStorage.setItem("Tasks", [])
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
    console.log(tasks)
  }, [tasks]);
  
  const handleAdd = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, input]);
    setInput('');
  }
  const handleDelete = (indexD) => {
    setTasks(tasks.filter((_, index) => index != indexD))
    setEdit(null)
  }
  const handleEdit = (index) => {
    setEdit(index)
    setInput2(tasks[index])
  } 
  const updateEdit = (index) => {
    let taskList = [...tasks]
    taskList[parseInt(index)] = input2
    setTasks(taskList)
    setEdit(null)
    setInput2('')
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-72 h-96 bg-white rounded flex flex-col p-3 border border-gray-400 shadow-2xl gap-1">
          <div className='w-full flex justify-around items-center border-b-gray-400 border-b h-14'>
            <input type="text" value={input} name="" id="" placeholder="Add Task" className='border border-gray-300 rounded outline-0 p-1 text-[12px] w-52' onChange={(e) => setInput(e.target.value)}/>
            <button className='bg-blue-500 text-white rounded px-2 py-0.5 text-[14px]' onClick={handleAdd}>Add</button>
          </div>
          <div className='w-full h-96 overflow-auto flex flex-col justify-start gap-2 p-1'>
            {
              tasks.map((data, index) => {
                return(
                  <div key={index} className='w-full min-h-12 border border-gray-400 rounded flex justify-between items-center p-2'>
                      {Edit === index ?<input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} className="border border-gray-300 rounded p-1 text-[12px] w-40 outline-0"/> : <label className='w-46 truncate'>{data}</label>}
                    <div className='flex gap-2'>
                      {
                        Edit === index ? 
                        <div className='text-green-500 cursor-pointer' onClick={() => updateEdit(index)}> 
                          <FontAwesomeIcon icon={faFloppyDisk} />
                        </div>
                        :
                        <div className='text-green-500 cursor-pointer' onClick={() => handleEdit(index)}>
                          <FontAwesomeIcon icon={faPenToSquare}/>
                        </div> 
                      }
                      <div className='text-red-500 cursor-pointer' onClick={() => handleDelete(index)}> 
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
      </div>
    </div>
  );
};

export default App;
