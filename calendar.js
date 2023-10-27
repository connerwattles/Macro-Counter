function generateCalendar(month, year) {
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
});


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