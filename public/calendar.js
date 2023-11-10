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
}
  
function startChat() {
    var friendSelect = document.getElementById("friend-select");
    var friend = friendSelect.value;
    // code to start chat with selected friend

    var chatBox = document.getElementById("chat-box");
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
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