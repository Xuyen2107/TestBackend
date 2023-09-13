import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
   const [status, setStatus] = useState("");
   const [number, setNumber] = useState(0);
   const [inputValue, setInputValue] = useState("");
   const [list, setList] = useState([]);
   const [listNotActive, setListNotActive] = useState([]);

   useEffect(() => {
      const storageList = localStorage.getItem("ListDetail");

      if (storageList) {
         setList(JSON.parse(storageList));
      }
   }, []);

   useEffect(() => {
      if (list) {
         const newList = list?.filter((item) => item.active === false);
         setListNotActive(newList);
         setNumber(newList.length);
      }
   }, [list]);

   const inputChange = (e) => {
      setInputValue(e.target.value);
   };

   const addBtn = () => {
      if (inputValue) {
         const newUser = {
            id: genId(),
            active: false,
            name: inputValue,
         };
         const newList = [...list, newUser];
         newList.sort(customSort);
         setList(newList);
         setInputValue("");
         localStorage.setItem("ListDetail", JSON.stringify(newList));
      } else {
         alert("Không được để trống");
      }
   };

   const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      const newList = [...list];

      newList.forEach((item, index) => {
         if (item.id === parseInt(value)) {
            newList[index] = { ...item, active: checked };
         }
      });

      newList.sort(customSort);

      setList(newList);
      localStorage.setItem("ListDetail", JSON.stringify(newList));
   };

   const customSort = (a, b) => {
      if (a.active === b.active) {
         return 0;
      }
      if (a.active === true) {
         return 1;
      }
      return -1;
   };

   const genId = () => {
      const Id = Math.floor(Math.random() * 100);
      const check = list?.find((x) => x.id === Id);
      if (check) {
         genId();
      }
      return Id;
   };
   return (
      <div className="App">
         <div className="container">
            {status === "more" ? (
               <div className="header">
                  <p> Not finished have {number} task</p>
                  <button
                     className="button"
                     onClick={() => {
                        setStatus("");
                     }}
                  >
                     Close
                  </button>
               </div>
            ) : (
               <div className="header">
                  <p>You have {number} tasks left!</p>
                  <button
                     className="button"
                     onClick={() => {
                        setStatus("more");
                     }}
                  >
                     Not finished only
                  </button>
               </div>
            )}

            <div className="todo-list-container">
               {status === "more"
                  ? listNotActive &&
                    listNotActive.map((item, idx) => (
                       <div key={item.id} className="todo-item-container">
                          <input
                             type="checkbox"
                             checked={item.active}
                             value={item.id}
                             onChange={handleCheckboxChange}
                          />
                          <div className="item-title">{item.name}</div>
                       </div>
                    ))
                  : list &&
                    list.map((item, idx) => (
                       <div key={item.id} className="todo-item-container">
                          <input
                             type="checkbox"
                             checked={item.active}
                             value={item.id}
                             onChange={handleCheckboxChange}
                          />
                          <div className={`item-title ${item.active ? "item" : ""}`}>
                             {item.name}
                          </div>
                       </div>
                    ))}
            </div>

            <form
               className="form"
               onSubmit={(e) => {
                  e.preventDefault();
               }}
            >
               <input onChange={inputChange} value={inputValue} placeholder="Enter task ..." />
               <button type="submit" onClick={addBtn}>
                  Submit
               </button>
            </form>

            <div>
               <h3>Made by MindX 🔥</h3>
               <div>
                  <span>Available on:</span>
                  <span className="languague-picker">🇻🇳</span>
                  <span className="languague-picker selected">🇺🇸</span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
