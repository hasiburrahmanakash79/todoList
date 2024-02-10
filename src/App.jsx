import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [taskInput, setTaskInput] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: taskInput,
        completed: false,
        priority: taskPriority,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  const saveEditing = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText('');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className='flex justify-between items-center'>
            <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">Task Manager</div>
            <button onClick={deleteAllTasks} className=" bg-red-500 text-sm text-white p-1 mt-1 rounded">
              Delete All
            </button>
          </div>
          <div className="md:flex  justify-between mb-4">
            <div className="">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="border p-2 mr-2 mt-4"
                placeholder="Enter task..."
              />
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className="border p-2 mr-2 mt-4"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button onClick={addTask} className="bg-blue-500 text-white p-2 mt-4 rounded">
                Add Task
              </button>
            </div>
            <div className="md:flex items-center justify-center">
              <label className="mr-2 mt-4">Filter :</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2 mr-2 mt-4"
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          {tasks
            .filter((task) => filter === 'all' || task.priority === filter)
            .map((task) => (
              <div key={task.id} className={`border p-2 mt-2 ${task.completed ? (task.priority === 'low' ? 'border-green-500' : task.priority === 'medium' ? 'border-yellow-500' : 'border-red-500') : ''}`}>
                {editingTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="border p-2 mr-2"
                    />
                    <button onClick={saveEditing} className="bg-blue-500 text-white p-2 mt-4 rounded mr-2">
                      Save
                    </button>
                  </>
                ) : (
                  <p className={`${task.completed ? 'line-through' : ''} ${task.priority === 'low' ? 'text-green-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {task.text}
                  </p>
                )}
                <button onClick={() => toggleTask(task.id)} className="bg-green-500 text-white p-2 mt-4 rounded mr-2">
                  {task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                </button>
                {editingTaskId !== task.id && (
                  <button onClick={() => startEditing(task.id, task.text)} className="bg-yellow-500 text-white p-2 mt-4 rounded mr-2">
                    Edit
                  </button>
                )}
                <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-2 mt-4 rounded">
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;