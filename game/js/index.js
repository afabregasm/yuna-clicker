// Variables Globales
let increment = 1;

// Elementos del HTML
const yunaInteract = document.getElementById("yuna");

let totalLove = document.getElementById("love-total");
let totalWater = document.getElementById("water-total");
let totalFood = document.getElementById("food-total");
let totalBed = document.getElementById("bed-total");

const buyWater = document.getElementById("water-button");
const buyFood = document.getElementById("food-button");
const buyBed = document.getElementById("bed-button");

// Funciones
function addToLove(amount) {
    totalLove.innerText = Number(totalLove.innerText) + Number(amount);
}

async function playGame() {
    while(true) {
        await new Promise(r => setTimeout(r, 1000));
        addToLove(totalWater.innerText);
        addToLove(totalFood.innerText * 5);
        addToLove(totalBed.innerText * 10);

        console.log(totalWater.innerText + " water | " + totalFood.innerText + " food | " + totalBed.innerText + " bed");
    }
}

window.addEventListener('load', () => {

    // Funciones dentro del Listener
    yunaInteract.addEventListener('click', function() {
        addToLove(increment);
    });

    buyWater.addEventListener('click', function() {
        if(totalLove.innerText >= 10) {
            totalWater.innerText = Number(totalWater.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 10;
        } else {
            console.log("Amor insuficiente");
        }
    });

    buyFood.addEventListener('click', function() {
        if(totalLove.innerText >= 50) {
            totalFood.innerText = Number(totalFood.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 50;
        } else {
            console.log("Amor insuficiente");
        }
    });

    buyBed.addEventListener('click', function() {
        if(totalLove.innerText >= 100) {
            totalBed.innerText = Number(totalBed.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 100;
        } else {
            console.log("Amor insuficiente");
        }
    });

    playGame();
    
});