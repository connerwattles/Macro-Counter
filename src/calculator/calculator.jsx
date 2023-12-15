import React from 'react';
import './calculator.css';

export function Calculator() {
  let totalFat = 0;
  let totalCarbs = 0;
  let totalProtein = 0;

  function addMeal() {
      const foodName = document.getElementById('Food').value;
      const fatGrams = document.getElementById('fat').value;
      const carbGrams = document.getElementById('carbs').value;
      const proteinGrams = document.getElementById('protein').value;

      const totalCalories = (fatGrams * 9) + (carbGrams * 4) + (proteinGrams * 4);

      totalFat += parseInt(fatGrams);
      totalCarbs += parseInt(carbGrams);
      totalProtein += parseInt(proteinGrams);

      const mealEntry = document.createElement('div');
      mealEntry.innerHTML = `${foodName}: ${fatGrams}g fat, ${carbGrams}g carbs, ${proteinGrams}g protein, ${totalCalories} calories`;

      const mealEntries = document.getElementById('meal-entries');
      mealEntry.style.color = 'black';
      mealEntries.appendChild(mealEntry);

      const mealTotalCalories = document.getElementById('meal-total-calories');
      const currentTotalCalories = parseInt(mealTotalCalories.textContent.split(':')[1]);
      mealTotalCalories.textContent = `Calories: ${currentTotalCalories + totalCalories}`;

      updatePieChart();

      saveCalories(totalCalories);
  }

  function updatePieChart() {
      console.log('updatePieChart');
      const mealTotalCalories = document.getElementById('meal-total-calories');

      console.log(mealTotalCalories);
      console.log(totalFat);
      console.log(totalCarbs);
      console.log(totalProtein);

      const fatPercentage = (totalFat * 9) / parseInt(mealTotalCalories.textContent.split(':')[1]) * 100;
      const carbPercentage = (totalCarbs * 4) / parseInt(mealTotalCalories.textContent.split(':')[1]) * 100;
      const proteinPercentage = (totalProtein * 4) / parseInt(mealTotalCalories.textContent.split(':')[1]) * 100;

      console.log(fatPercentage);
      console.log(carbPercentage);
      console.log(proteinPercentage);
      
      const macroChartElements = document.querySelectorAll('.macro-chart');
      macroChartElements.forEach(el => {
          el.style.background = `conic-gradient(red 0% ${fatPercentage}%,
              blue ${fatPercentage}% ${fatPercentage + carbPercentage}%,
              yellow ${fatPercentage + carbPercentage}% 100%)`;
      });
  }

  const saveCalories = async (calories) => {
      console.log('saveCalories');

      const userName = localStorage.getItem('userName');
      const foodName = document.getElementById('Food').value;
      const date = new Date().toLocaleDateString();
      const newCalories = { name: userName, food: foodName, date: date, calories: calories };

      try {
          const response = await fetch('/api/calories', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newCalories)
          });

          const allCalories = await response.json();
          localStorage.setItem('calories', JSON.stringify(allCalories));
      } catch {
          updateCaloriesLocal(newCalories);
      }
  }

  function updateCaloriesLocal(newCalorie) {
      let calories = [];
      const caloriesText = localStorage.getItem('calories');
      if (caloriesText) {
          calories = JSON.parse(caloriesText);
      }

      calories.push(newCalorie);

      localStorage.setItem('calories', JSON.stringify(calories));
  }
  
  
  
  return (
    <main>
      <br />
      <div className="meal-input">
        <h2>Enter Macronutrient Values</h2>

        <form>
          <label htmlFor="meal">Select a Meal:</label>
          <select id="meal" name="meal">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </form>

        <form>
          <label htmlFor="Food">Food Name:</label>
          <input type="text" id="Food" name="Food" required />
        </form>

        <div>
          <label className='fat-label' htmlFor="fat">Fat (g):</label>
          <input type="number" id="fat" name="fat" required />

          <label className='carbs-label' htmlFor="carbs">Carbs (g):</label>
          <input type="number" id="carbs" name="carbs" required />

          <label className='protein-label' htmlFor="protein">Protein (g):</label>
          <input type="number" id="protein" name="protein" required />

          <button type="submit" onClick={addMeal}>Submit</button>
        </div>
      </div>

      <div className="meal-log">
        <h2>Meal Log</h2>
        <div id="meal-entries-container">
          <div id="meal-entries"></div>
        </div>
      </div>

      <br />
      <div className="calories">
        <h2>Calories</h2>
        <p id="meal-total-calories">Calories: 0</p>
      </div>

      <div className="macro-chart" id="macro-chart">
        <canvas id="myChart" width="600" height="200"></canvas>
      </div>
      <br />
    </main>
  );
}