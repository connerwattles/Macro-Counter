/*function generateCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let currentDay = 1;
    let currentWeekday = new Date(year, month, 1).getDay();
    let calendarHTML = '<table>';
    calendarHTML += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>';
    calendarHTML += '<tbody>';
    calendarHTML += '<tr>';
    for (let i = 0; i < currentWeekday; i++) {
        calendarHTML += '<td></td>';
    }
    while (currentDay <= daysInMonth) {
        if (currentWeekday === 7) {
            calendarHTML += '</tr><tr>';
            currentWeekday = 0;
        }
        calendarHTML += `<td>${currentDay}</td>`;
        currentDay++;
        currentWeekday++;
    }
    calendarHTML += '</tr></tbody></table>';
    document.getElementById('calendar').innerHTML = calendarHTML;
}

const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
monthSelect.addEventListener('change', () => {
    const month = monthSelect.selectedIndex;
    const year = yearSelect.value;
    generateCalendar(month, year);
});

monthSelect.onload = initialCalendar(() => {
    const month = monthSelect.selectedIndex;
    const year = yearSelect.value;
    generateCalendar(month, year);
});*/


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

    displayCalories(calories);
}

function displayCalories(calories) {
    console.log('displayCalories');

    const tableBodyElement = document.querySelector('#log');

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

loadCalories();

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

    // Append the new div to the message box
    messageBox.appendChild(messageDiv);
}

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
configureWebSocket();