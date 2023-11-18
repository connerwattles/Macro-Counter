# Macro-Counter
Web program for Macro Counter CS260

## Description Deliverable

### Elevator Pitch
We would all agree that a healthier lifestyle starts with what you eat. For many of us, it is so difficult to eat better and achieve our healthier lifestyle goals because of how difficult it can be to track your progress. The macro counter application aims to make those difficult and tedious tasks of tracking macronutrients so much simpler. It will allow you to log into a profile and log the total grams of macronutrients you have consumed for each meal of the day. The app will then allow you to easily view the total number of calories you have consumed and the data from previous days. You can even link profiles with a friend so you can help each other reach their goals.

### Key Features
1. Sign in page to load users' data previously logged.
2. Calendar view to load data logged from previous days.
3. Data entry page where the user can select a meal of the day and enter the macronutrients of that meal.
4. Friends page to track another user's progress.

### Technologies Description
**_Authentication_**  
A user can create a profile and log into an existing profile with a username and password that will then allow them to load previously logged data.

**_Database Data_**  
Previously logged meals will be stored in a database and then shown when the user enters the calendar view.

**_WebSocket Data_**  
Users will be able to chat with their friends to encourage and congratulate them on their goals and progress.

### Design Images
![IMG_3537](https://github.com/connerwattles/Macro-Counter/assets/70725683/99e41f1a-9675-4f8f-8abc-e71c594f95a9)

## HTML Deliverable

I implemented the basic outline into HTML for my startup for this deliverable.

- **HTML Pages** Four HTML pages that represent the ability to login, enter macronutrients consumed that day for which meal, a calendar view for history, and an about page.
- **Links** The login page automatically links to the calculator page. Each page also has a link to this GitHub in the footer.
- **Text** The calculator page has text in each input type. There is also paragraph text in the about page describing the startup app.
- **Images** A simple image related to the app was added in the about page.
- **Login** Input box and submit button for login
- **Database** In the future logged data from the user will be shown in the calendar view as well as in the calculator page for the history of that user's day.
- **WebSocket** An option to compare progress with friends will be implemented as well as a chat to encourage them in their nutrition goals.

## CSS Deliverable

I used CSS to add styling to the basic HTML I previously had.

- **Header, Footer, and main content body**
- **Navigation Elements** I changed the plain menu items to more visually appealing buttons
- **Responsive to Window Sizing** The elements on each page respond and look well on any window size
- **Application Elements** The elements unique to my application were styled and placed in a way that would allow the user to understand their purposes such as the calendar and chat button.
- **Application Text Content** The text in my app is consistent in styling
- **Application Image** The image in my about page is formatted and styled to look visually appealing on that page and shares traits such as shadowing with the text beneath

## JavaScript Deliverable

For this deliverable I implemented JavaScript into my startup so the application has functionality to the login, calculator, and calendar. I also have placeholders for future websocket and database data.

- **login** When you press the login button it takes you to the calculator page and saves your username in local data
- **database** Database data will be implemented through the calendar view. As the user selects a day their history of inputted macronutrients will be displayed as a piechart
- **WebSocket** I implemented a popup chat box in the calendar page that will eventually allow the user to select a friend and chat with them
- **Application Logic** The majority of the JavaScript added to my application was in the calculator page. The application now logs food entries in the meal log box and below that a total calorie
                        number will be shown that is calculated based on how many calories are in a gram of each macro. I also implemented a dynamic pie chart that will update with the total calories
                        from each of the three macronutrients based on the total calories.

## Service Deliverable

For this deliverable I added backend endpoints that receive inputted calories for food items and the calendar view displays them in a list.

- **Node.js/Express HTTP service** Done!
- **Static middleware for frontend** Done!
- **Third party endpoints** Called in the about page to load a random image
- **Backend service endpoints** Endpoints for post on calories and get on calories
- **Frontend calls service endpoints** Fetch!

## DB Deliverable
- **MongoDB Atlas database created** Done!
- **Endpoints for data** My endpoints now store the data in my mongo database
- **Stores data in MongoDB** Done!

## Login Deliverable
- **User Registration** Creates a new account in the database
- **Existing User** Attaches logged calories to the user if they relogin
- **Use MongoDB to Store Credentials**
- **Restricts Functionality** User cannot do anything before creating an account or logging in
