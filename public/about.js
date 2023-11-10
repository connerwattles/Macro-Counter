function displayPicture() {
    console.log('displayPicture')

    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');
  
        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;

        const imgUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', imgUrl);
        containerEl.appendChild(imgEl);
      });
  }

  function displayRecipe() {
    console.log('displayRecipe')

    const random = Math.floor(Math.random() * 1000);
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8e9f7f4b4c3d4b5e9a2a7a9a4a3a1a0a&number=1&offset=${random}`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#recipe');
  
        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;

        const imgUrl = `https://spoonacular.com/recipeImages/${data.results[0].id}-312x231.jpg`;
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', imgUrl);
        containerEl.appendChild(imgEl);
      });
  }

  displayPicture();
  //displayRecipe();