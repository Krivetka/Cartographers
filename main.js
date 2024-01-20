const cardRight = document.querySelectorAll('.card-right__image')
cardRight[0].src = `src/cards/1_${Math.floor(Math.random() * 4) + 26}.jpg`
cardRight[1].src = `src/cards/1_${Math.floor(Math.random() * 4) + 30}.jpg`
cardRight[2].src = `src/cards/1_${Math.floor(Math.random() * 4) + 34}.jpg`
cardRight[3].src = `src/cards/1_${Math.floor(Math.random() * 4) + 38}.jpg`
cardRight[0].classList.add("card-right__image-active");

const cardLeft = document.querySelector(".card-left");

const mainCard = document.querySelector('.card')

const monstersArr = Array.from({length: 4}, (_, index) => index + 1);

for (let i = monstersArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [monstersArr[i], monstersArr[j]] = [monstersArr[j], monstersArr[i]];
}

const landscapeArr = Array.from({length: 13}, (_, index) => index + 5);
const landscapeCostArr = [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0];

const seasonArr = Array.from({length: 4}, (_, index) => index + 18);
const seasonPeriodArr = [8, 8, 7, 6];
const seasonNameArr = ["Весна", "Лето", "Осень", "Зима"];

const scoreEl = document.querySelector('.score')
const periodEl = document.querySelector('.season-period')
const seasonName = document.querySelector('.season-period-name')

let roundArr;
let takenMonstersArr = [];
let round = 0;
let score = 0;
const createRound = () => {
    takenMonstersArr.push(monstersArr[round])
    cardRight[round === 3 ? 0 : round + 1].classList.add("card-right__image-active")
    scoreEl.innerText = score;
    periodEl.innerText = seasonPeriodArr[round];
    seasonName.innerText = seasonNameArr[round];
    roundArr = [...landscapeArr, ...takenMonstersArr];

    for (let i = roundArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roundArr[i], roundArr[j]] = [roundArr[j], roundArr[i]];
    }
    mainCard.src = `src/cards/1_${seasonArr[round]}.jpg`
}

const addCardHistory = (id) => {
    let img = document.createElement("img");
    img.alt = id;
    img.classList.add("card-left__image")
    img.src = mainCard.src = `src/cards/1_${id}.jpg`
    cardLeft.appendChild(img)
}

createRound(round);

let point = 0

const nextCard = () => {
    if (score < seasonPeriodArr[round]) {
        if (point > 0) {
            addCardHistory(roundArr[point - 1])
        }
        mainCard.src = `src/cards/1_${roundArr[point]}.jpg`
        if (roundArr[point] - 5 >= 0) {
            score += landscapeCostArr[roundArr[point] - 5]
        } else {
            const indexToRemove = takenMonstersArr.indexOf(roundArr[point]);
            takenMonstersArr.splice(indexToRemove, 1);
        }
        scoreEl.innerText = score;
        point++;
    } else {
        if (round === 3) {
            cardLeft.innerHTML = ``;
            mainCard.src = `src/cards/1_42.jpg`
        } else {
            cardRight[round].classList.remove("card-right__image-active")
            score = 0;
            point = 0;
            cardLeft.innerHTML = ``;
            round++;
            createRound(round);
        }
    }
}
mainCard.addEventListener('click', nextCard)
document.addEventListener('keydown', event => event.key === ' ' || event.code === 'Space' || event.code === 'ArrowRight' ? nextCard() : null);


