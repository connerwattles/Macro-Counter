import React from 'react';
import './about.css';

export function About(props) {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.
  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;

        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', apiUrl);
        containerEl.appendChild(imgEl);
      })
      .catch();
  }, []);

  let imgElement = '';

  if (imageUrl) {
    imgElement = <img src={imageUrl} alt='stock background' />;
  }

  return (
    <main>
      <div>
        <br/>

        <div id="picture" className="picture-box"><img width="400px"/></div>

        <p>
          The Macro Counter app is a simple app that allows users to track their daily macronutrient intake. The app allows users to 
          input their daily food intake and the app will calculate the amount of macronutrients they have consumed.
        </p>

        <p>
          Counting macronutrients is a popular method for achieving health goals like weight loss or building muscle. This app will 
          make that task easier for users by allowing them to input their food intake and the app wil calculate the amount of macronutrients 
          calories consumed in a day.
        </p>

        <div id="quote">
          <div>Let food be thy medicine, thy medicine shall be thy food.</div>
          <div>- Hippocrates</div>
        </div>
      </div>
    </main>
  );
}