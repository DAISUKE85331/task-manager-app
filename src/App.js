// タブ機能付きタスク管理アプリ
// 事前に firebase.js を設定しておく必要があります
// react-beautiful-dnd, lucide-react をインストールしてください

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTabs = [
  { title: "日", tasks: [] },
  { title: "週", tasks: [] },
  { title: "月", tasks: [] },
];

export default function App() {
  const [tabs, setTabs] = useState(initialTabs);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [input, setInput] = useState("");

  const currentTasks = tabs[selectedTabIndex].tasks;

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      text: input, // 空でもOK
      completed: false,
    };
    const updatedTabs = [...tabs];
    updatedTabs[selectedTabIndex].tasks.push(newTask);
    setTabs(updatedTabs);
    setInput(""); // 入力欄をクリア
  };
  

  const toggleTask = (index) => {
    const updatedTabs = [...tabs];
    const task = updatedTabs[selectedTabIndex].tasks[index];
    task.completed = !task.completed;
    setTabs(updatedTabs);
  };

  const updateTask = (index, text) => {
    const updatedTabs = [...tabs];
    updatedTabs[selectedTabIndex].tasks[index].text = text;
    setTabs(updatedTabs);
  };

  const deleteTask = (index) => {
    const updatedTabs = [...tabs];
    updatedTabs[selectedTabIndex].tasks.splice(index, 1);
    setTabs(updatedTabs);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(currentTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedTabs = [...tabs];
    updatedTabs[selectedTabIndex].tasks = items;
    setTabs(updatedTabs);
  };

  const updateTabTitle = (index, title) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].title = title;
    setTabs(updatedTabs);
  };

  const progress = currentTasks.length
    ? (currentTasks.filter((t) => t.completed).length / currentTasks.length) * 100
    : 0;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">タスク管理</h1>

      {/* タブ切り替え */}
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTabIndex(index)}
            className={`px-3 py-1 rounded ${
              selectedTabIndex === index ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <input
              value={tab.title}
              onChange={(e) => updateTabTitle(index, e.target.value)}
              className="bg-transparent border-none outline-none text-center"
            />
          </button>
        ))}
      </div>

      {/* タスク入力欄 */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力"
          className="border p-2 rounded flex-grow"
        />
        <button onClick={handleAddTask} className="bg-blue-600 text-white px-3 py-2 rounded">
          ＋
        </button>
      </div>

      {/* 進捗バー */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm mt-1">{Math.round(progress)}%</p>
      </div>

      {/* タスクリスト */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasklist">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {currentTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="flex items-center space-x-2 mb-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(index)}
                      />
                      <input
                        value={task.text}
                        onChange={(e) => updateTask(index, e.target.value)}
                        className={`border-none outline-none bg-transparent flex-grow ${
                          task.completed ? "line-through text-gray-400" : ""
                        }`}
                      />
                      <button onClick={() => deleteTask(index)}>
                        <Trash2 className="text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
