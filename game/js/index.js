// Variables Globales
let increment = 1;

// Elementos del HTML
const yunaInteract = document.getElementById("yuna");

let totalLove = document.getElementById("love-total");
let lovePerSecond = document.getElementById("love-per-second");

let totalWater = document.getElementById("water-total");
let totalFood = document.getElementById("food-total");
let totalBed = document.getElementById("bed-total");
let totalToy = document.getElementById("toy-total");
let totalAccessory = document.getElementById("accessory-total");
let totalTreat = document.getElementById("treat-total");

const buyWater = document.getElementById("water-button");
const buyFood = document.getElementById("food-button");
const buyBed = document.getElementById("bed-button");
const buyToy = document.getElementById("toy-button");
const buyAccessory = document.getElementById("accessory-button");
const buyTreat = document.getElementById("treat-button");

// Funciones
function addToLove(amount) {
    totalLove.innerText = Number(totalLove.innerText) + Number(amount);
}

async function playGame() {
    while(true) {
        await new Promise(game => setTimeout(game, 1000));
        let waterPerSecond = Math.round(totalWater.innerText * 1);
        let foodPerSecond = Math.round(totalFood.innerText * 2);
        let bedPerSecond = Math.round(totalBed.innerText * 3);
        let toyPerSecond = Math.round(totalToy.innerText * 4);
        let accessoryPerSecond = Math.round(totalAccessory.innerText * 5);
        let treatPerSecond = Math.round(totalTreat.innerText * 6);

        addToLove(waterPerSecond);
        addToLove(foodPerSecond);
        addToLove(bedPerSecond);
        addToLove(toyPerSecond);
        addToLove(accessoryPerSecond);
        addToLove(treatPerSecond);

        lovePerSecond.innerText = Number(waterPerSecond) + Number(foodPerSecond) + Number(bedPerSecond) + Number(toyPerSecond) + Number(accessoryPerSecond) + Number(treatPerSecond);
        console.log(`${totalWater.innerText} water | ${totalFood.innerText} food | ${totalBed.innerText} bed | ${totalToy.innerText} toy | ${totalAccessory.innerText} accessory | ${totalTreat.innerText} treat`);
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
            console.log("¡Amor insuficiente!");
        }
    });

    buyFood.addEventListener('click', function() {
        if(totalLove.innerText >= 50) {
            totalFood.innerText = Number(totalFood.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 50;
        } else {
            console.log("¡Amor insuficiente!");
        }
    });

    buyBed.addEventListener('click', function() {
        if(totalLove.innerText >= 100) {
            totalBed.innerText = Number(totalBed.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 100;
        } else {
            console.log("¡Amor insuficiente!");
        }
    });

    buyToy.addEventListener('click', function() {
        if(totalLove.innerText >= 500) {
            totalToy.innerText = Number(totalToy.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 500;
        } else {
            console.log("¡Amor insuficiente!");
        }
    });

    buyAccessory.addEventListener('click', function() {
        if(totalLove.innerText >= 1000) {
            totalAccessory.innerText = Number(totalAccessory.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 1000;
        } else {
            console.log("¡Amor insuficiente!");
        }
    });

    buyTreat.addEventListener('click', function() {
        if(totalLove.innerText >= 5000) {
            totalTreat.innerText = Number(totalTreat.innerText) + 1;
            totalLove.innerText = Number(totalLove.innerText) - 5000;
        } else {
            console.log("¡Amor insuficiente!");
        }
    });

    playGame();

});