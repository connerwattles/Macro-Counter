import React from 'react';
import './calendar.css';

import Button from 'react-bootstrap/Button';

export function Calendar() {
  const [calories, setCalories] = React.useState([]);

  async function loadCalories() {
      console.log('loadCalories');
      
      let calories = [];
      try {
          const response = await fetch('/api/calories');
          calories = await response.json();

          localStorage.setItem('calories', JSON.stringify(calories));
      } catch {
          const caloriesText = localStorage.getItem('calories');
          if (caloriesText) {
              calories = JSON.parse(caloriesText);
          }
      }

      // Sort the calories array in descending order by date
      calories.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Get only the 10 most recent entries
      const recentCalories = calories.slice(0, 10);

      displayCalories(recentCalories);
  }

  function displayCalories(calories) {
      console.log('displayCalories');

      const tableBodyElement = document.querySelector('#log');

      tableBodyElement.innerHTML = '';

      if (calories.length) {
          for (const [i, calorie] of calories.entries()) {
              const positionTdEl = document.createElement('td');
              const nameTdEl = document.createElement('td');
              const foodTdEl = document.createElement('td');
              const caloriesTdEl = document.createElement('td');
              const dateTdEl = document.createElement('td');

              positionTdEl.textContent = i + 1;
              nameTdEl.textContent = calorie.name;
              foodTdEl.textContent = calorie.food;
              dateTdEl.textContent = calorie.date;
              caloriesTdEl.textContent = calorie.calories;

              const rowEl = document.createElement('tr');
              rowEl.appendChild(positionTdEl);
              rowEl.appendChild(nameTdEl);
              rowEl.appendChild(foodTdEl);
              rowEl.appendChild(caloriesTdEl);
              rowEl.appendChild(dateTdEl);

              tableBodyElement.appendChild(rowEl);
          }
      } else {
          tableBodyElement.innerHTML = '<tr><td colspan="4">No calories logged</td></tr>';
      }
  }

  React.useEffect(() => {
    fetch('/api/calories')
      .then((response) => response.json())
      .then((calories) => {
        setCalories(calories);
        localStorage.setItem('calories', JSON.stringify(calories));
      })
      .catch(() => {
        const caloriesText = localStorage.getItem('calories');
        if (caloriesText) {
          setCalories(JSON.parse(caloriesText));
        }
      });
  }, []);

  const calorieRows = [];
  if (calories.length) {
    for (const [i, calorie] of calories.entries()) {
      calorieRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{calorie.name}</td>
          <td>{calorie.foodName}</td>
          <td>{calorie.totalCalories}</td>
          <td>{calorie.date}</td>
        </tr>
      );
    }
  }
  else {
    calorieRows.push(
      <tr key={0}>
        <td colSpan="5">No calories logged</td>
      </tr>
    );
  }

  function openChat() {
      var chatBox = document.getElementById("chat-box");
      chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";

      var messageField = document.getElementById("message-field");
      messageField.style.display = "none";
  }
    
  function startChat() {
      var messageField = document.getElementById("message-field");
      messageField.style.display = "flex";
  }

  function configureWebSocket() {
      socket.onopen = (event) => {
          appendMsg('system', 'websocket', 'connected');
      };
      socket.onclose = (event) => {
          appendMsg('system', 'websocket', 'disconnected');
      };
      socket.onmessage = async (event) => {
          const text = await event.data.text();
          const chat = JSON.parse(text);
          appendMsg('friend', chat.name, chat.msg);
      };
  }

  function sendMessage() {
      const msgEl = document.querySelector('#messageInput');
      const msg = msgEl.value;
      if (!!msg) {
        appendMsg('me', 'me', msg);
        const name = 'User';                                      //FIX THIS: get name from user
        socket.send(`{"name":"${name}", "msg":"${msg}"}`);
        msgEl.value = '';
      }
  }

  function appendMsg(cls, from, msg) {
      const messageBox = document.querySelector('#message-box');

      // Create a new div element
      const messageDiv = document.createElement('div');
      messageDiv.className = cls;

      // Set the text content of the div
      messageDiv.textContent = `${from}: ${msg}`;

      // Set the text color of the div
      messageDiv.style.color = 'black';

      // Append the new div to the message box
      messageBox.appendChild(messageDiv);
  }

  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  configureWebSocket();

  

  loadCalories();

  return (
    <main className='container-fluid text-center'>
      <br></br>
      <table className="table table-warning table-striped-columns">
        <thead>
          <tr className='first-row'>
            <th>#</th>
            <th>Name</th>
            <th>Food Name</th>
            <th>Total Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="log"></tbody>
      </table>

        
      <br></br>
  
      <Button variant='primary' onClick={() => openChat()}>Chat</Button>

      <div id="chat-box" style={{ display: 'none', width: '400px' }}>
        <h2>Chat with Friends</h2>
        <div id="message-box" style={{ height: '200px', overflowY: 'scroll' }}>
          {/*<!-- Messages will be appended here -->*/}
        </div>
        <Button variant="primary" onClick={startChat}>Start Chat</Button>
        <br></br>
        <div id="message-field" style={{ display: 'none', flexDirection: 'row' }}>
          <input type="text" id="messageInput" placeholder="Type your message here..."></input>
          <Button variant="primary" onClick={sendMessage}>Send</Button>
        </div>
      </div> 
    </main>
  );
}