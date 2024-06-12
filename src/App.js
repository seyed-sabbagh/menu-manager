import React, { useState } from 'react';
import axios from 'axios';
import menuData from './data/menuData.ts'; // Assuming you have the initial data stored in a JSON file

function EditableMenu() {
  const [menu, setMenu] = useState(menuData);
  const [newItem, setNewItem] = useState({ category: "", name: "", description: "", price: "" });

  const addItem = () => {
    if (newItem.category && newItem.name && newItem.description && newItem.price) {
      const newMenu = { ...menu };

      // Check if the category exists in the menu; if not, initialize it as an empty array
      if (!newMenu[newItem.category]) {
        newMenu[newItem.category] = [];
      }

      newMenu[newItem.category] = [
        ...newMenu[newItem.category],
        {
          id: newMenu[newItem.category].length + 1,
          name: newItem.name,
          description: newItem.description,
          price: newItem.price
        }
      ];

      setMenu(newMenu);
      setNewItem({ category: "", name: "", description: "", price: "" });
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleNewItemChange = (field, value) => {
    setNewItem(prevNewItem => ({
      ...prevNewItem,
      [field]: value
    }));
  };

  const saveMenu = () => {
    axios.post('http://localhost:3001/save-menu', menu) // Assuming backend is running on localhost port 3001
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving menu:", error);
      });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Menu</h1>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
      <input 
          type="text" 
          placeholder="Category" 
          value={newItem.category} 
          onChange={(e) => handleNewItemChange("category", e.target.value)} 
          style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        <input 
          type="text" 
          placeholder="Name" 
          value={newItem.name} 
          onChange={(e) => handleNewItemChange("name", e.target.value)} 
          style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newItem.description} 
          onChange={(e) => handleNewItemChange("description", e.target.value)} 
          style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        <input 
          type="text" 
          placeholder="Price" 
          value={newItem.price} 
          onChange={(e) => handleNewItemChange("price", e.target.value)} 
          style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        <button onClick={addItem} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Add Item</button>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={saveMenu} style={{ padding: '8px 16px', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>Save Menu</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(menu).map((category, index) => (
            <>
              {index > 0 && <tr key={`separator-${index}`}><td colSpan="4" style={{ height: '10px' }}></td></tr>}
              {menu[category].map(item => (
                <tr key={item.id}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{category}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.description}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.price}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}></table>
export default EditableMenu;
