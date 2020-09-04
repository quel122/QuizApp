/**
 * Example store structure
 */
'use strict'
let store = {
  // 5 or more questions are required
  questions: [
    {
      question: ' What was the name of the halo ring that Master Chief destroys at the end of Halo 3?',
      answers: [
        'Installation 00',
        'The Ark',
        'Installation 08',
        'Installation 04'
      ],
      correctAnswer: 'C'
    },
    {
      question: 'What city did the Locust attack occur in at the start of Gears of War 2?',
      answers: [
        'Nexus',
        'Ilima',
        'Tyrus',
        'Jacinto City'
      ],
      correctAnswer: 'D'
    },
    {
      question: 'What was the name of the town that Mario had to clean up while on vacation?',
      answers: [
        'Mushroom Kingdom',
        'Delfino Island',
        'Toad Town',
        'Cheep-Cheep Island',
      ],
      correctAnswer: 'B'
    },
    {
      question: 'What is Sonic the Hedgehog\'s nemesis name?',
      answers: [
        'Knuckles',
        'Shadow',
        'Rouge',
        'Dr. Eggman',
      ],
      correctAnswer: 'D'
    },
    {
      question: 'Where is Link from?',
      answers: [
        'The Lost Forest',
        'Kakariko Forest',
        'Hyrule',
        'Gerudo Valley',
      ],
      correctAnswer: 'B'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  feedback: false,
  feedbackScreen: false
};
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
function introView(){
  return `
  <div class="introView">
      <h2>Score ${Math.round(store['questions'].length/2)}/${store['questions'].length} to win!</h2>
      <button id="start">START</button>
    </div>
  `;
}

function questionView(){
  let questions = store['questions'];
  return `
  <div class="questionView">
      <h1>Question ${store['questionNumber'] + 1} of 5</h1>
      <div class="questionContainer">
        <p>${questions[store['questionNumber']]['question']}</p>
        <form action="/">
          <input type="radio" name="selection" id="A" value="A">
          <label for="A">A. ${questions[store['questionNumber']]['answers'][0]}</label>
          <br>
          <input type="radio" name="selection" id="B" value="B">
          <label for="B">B. ${questions[store['questionNumber']]['answers'][1]}</label>
          <br>
          <input type="radio" name="selection" id="C" value="C">
          <label for="C">C. ${questions[store['questionNumber']]['answers'][2]}</label>
          <br>
          <input type="radio" name="selection" id="D" value="D">
          <label for="D">D. ${questions[store['questionNumber']]['answers'][3]}</label>
          <br>
          <input type="button" name="next-submit" id="next" value="SUBMIT">
          <div id="error"></div>
        </form>
        <div class="current-score">
          <p>Current Score: ${store['score']}/ 5</p>
        </div>
      </div>
    </div>
  `;
}

function feedbackView(){
  let questions = store['questions']
  return `
  <div class="feedbackView">
    <h2>${store['feedback'] ? 'Correct!': 'Incorrect!'}</h2>
    <p>${!store['feedback'] ? `The correct answer was: ${store['questions'][store['questionNumber'] - 1]['correctAnswer']}`: 'Good Job!'}</p>
    ${store['questionNumber'] === 5 ? `<button id="final">SUBMIT FINAL RESULTS</button>` : `<button id="continue">CONTINUE</button>`}
    
  </div>
  `;
};

function resultsView(){
  let winMessage = 'Congratulations!';
  let loseMessage = 'Better luck next time!';


  return `
  <div class="resultsView">
      <div class="resultsContainer">
        <h2>END OF GAME</h2>
        <h3>Score: </h3>
        <ul>
          <li>
            <p>Correct: ${store['score']}</p>
          </li>
          <li>
            <p>Incorret: ${Math.abs(store['score'] - store['questions'].length)}</p>
          </li>
        </ul>
      </div>
      <p>${store['score'] >= 3 ? winMessage : loseMessage}</p>
      <p>Press the button below to start a new game!</p>
      <button id="new">NEW GAME</button>
    </div>
  `;
}

/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderModel(){
  //todo
  if(store['quizStarted'] === false){
    $('main').html(introView);
  }
  else if(store['questionNumber'] === 5){
    $('main').html(resultsView);
  }
  else if(store['feedbackScreen'] === true){
    //todo
    $('main').html(feedbackView);
  }
  else{
    $('main').html(questionView);
  }
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
function submitAnswer(){
  if($('input[name=selection]:checked').val() === store['questions'][store['questionNumber']]['correctAnswer']){
    store['feedback'] = true;
    store['questionNumber']++;
    store['score']++;
  }
  else{
    store['feedback'] = false;
    store['questionNumber']++;
  }
  store['feedbackScreen'] = true;
}

function handleStart(){
  $('main').on('click', '#start', function(event){
    store['quizStarted'] = true;
    renderModel();
  });
}

function handleNext(){
  $('main').on('click', '#next', function(event){
    if(typeof($('input[name=selection]:checked').val()) != "undefined"){
      submitAnswer();
      renderModel();  
    }else{
      $('#error').html("You have to select an answer");
    };
    
  });
}

function handleContinue(){
  $('main').on('click', '#continue', function(event){
    store['feedbackScreen'] = false;
    renderModel();
  });
}

function handleSubmit(){
  $('main').on('click', '#final', function(event){
    submitAnswer();
    renderModel();
  });
}

function handleNewGame(){
  $('main').on('click', '#new', function(event){
    store['score'] = 0;
    store['questionNumber'] = 0;
    store['feedbackScreen'] = false;
    store['quizStarted'] = false;
    renderModel();
  });
}

function main(){
  renderModel();
  handleStart();
  handleNext();
  handleContinue();
  handleSubmit();
  handleNewGame();
}

$(main);
