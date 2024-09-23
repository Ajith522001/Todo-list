import React from 'react'
import{ useState } from 'react';

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  
  const addItem = () => {
    if (inputValue.trim() === '') return;
    setItems([...items, { id: Date.now(), text: inputValue }]);
    setInputValue('');
  };


  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  
  const startEditItem = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  
  const saveEditItem = (id) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, text: editValue } : item
    );
    setItems(updatedItems);
    setEditId(null); 
  };

  return (
    <main>
      
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={addItem} className="add">Add</button>
      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <>
                <input 
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEditItem(item.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{item.text}</span>
                <button onClick={() => startEditItem(item.id, item.text)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TodoList;


