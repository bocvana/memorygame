let images = [
  'card3.png', 'card4.png', 'card5.png', 'card6.png', 'card7.png', 'card8.png', 'card9.png', 'card10.png'
];
let items = [...images, ...images];
let itemsPath = 'img/';
let itemsContainer = document.getElementById('items-container');
let articleItem = document.getElementsByClassName('flip-card');
let flipCardInner = document.getElementsByClassName('flip-card-inner');
let flipCardResult = document.getElementsByClassName('flip-card-back');
let clicked = [];

function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
let shuffleArray = shuffle(items);

function createItemArticle() {
  let articleContainer = '';

  for (let i = 0; i < items.length; i++) {  

    let itemArticle = `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src='img/back-card.png'>
      </div>
      <div class="flip-card-back">
        <img src='${itemsPath + shuffleArray[i]}'>
      </div>
    </div>
  </div>`;
    articleContainer += itemArticle;
  }
  itemsContainer.innerHTML = articleContainer;
}

createItemArticle();

  let previousItem = '';
  let previousValue = '';
  let clickNumb = 1;
  let timer = 0;
  let ifCardIsFliping = false;

  for (let i = 0; i < shuffleArray.length; i++) {

    articleItem[i].addEventListener('click', function(){

       if (ifCardIsFliping) return;

       if (!flipCardInner[i].classList.contains('active')) {
        flipCardInner[i].classList.add('active');

        if (clickNumb === 2) {
          if (previousValue.innerHTML === flipCardResult[i].innerHTML) {
            clicked.push(articleItem[i], previousItem);
          } else {
            ifCardIsFliping = true;
            clearTimeout(timer);
            timer = setTimeout(() => {
              previousItem.classList.remove('active');
              flipCardInner[i].classList.remove('active');
              ifCardIsFliping = false;
            }, 1000)
          }
          clickNumb = 0;
        } else {
          previousItem = flipCardInner[i];
          previousValue = flipCardResult[i];
        }
        clickNumb++;
       }
       if (clicked.length === shuffleArray.length) {
        document.getElementById('victory').classList.add('show-up');
        clearInterval(countDown);
        reload();
      }
    });
  }

  let totalSeconds = 60;

  let countDown = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - (minutes * 60);

    let minElement = `<span>0${ minutes }</span>`;
    let secElement = totalSeconds <= 20 ? `<span class="animate">${ seconds < 10 ? '0' + seconds : seconds }</span>` : `<span>${ seconds < 10 ? '0' + seconds : seconds }</span>`;


    if (totalSeconds >= 0) {
      document.getElementById('timer').innerHTML = `${ minElement } : ${ secElement }`;
      totalSeconds--;
    } else {
      clearInterval(countDown);
      document.getElementById('game-over').classList.add('show-up');
      document.getElementById('wraper-container').classList.add('disable-click');
      reload();
    }
  }, 1000);

  function reload() {
    setTimeout(() => {
     location.reload();
    }, 3500)
  }


