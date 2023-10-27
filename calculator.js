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
    mealEntries.appendChild(mealEntry);

    const mealTotalCalories = document.getElementById('meal-total-calories');
    const currentTotalCalories = parseInt(mealTotalCalories.textContent.split(':')[1]);
    mealTotalCalories.textContent = `Calories: ${currentTotalCalories + totalCalories}`;

    updatePieChart();
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