// Variables GLOBALES
let gameStart = false;
const yunaInteract = document.getElementById("yuna");

let increment = 1;
let factor = 1.08;
let totalLove = document.getElementById("love-total");
let lovePerSecond = document.getElementById("love-per-second");
let lpsGained = document.getElementById("lps-gained");
let lpsLost = document.getElementById("lps-lost");

class Item {
  constructor(
    itemButton,
    itemList,
    itemDisplay,
    itemTotal,
    itemCost,
    itemBuyFactor,
    itemMultiplier,
    itemModule,
    itemMax,
    itemValue
  ) {
    this.itemButton = itemButton; //DOM
    this.itemList = itemList; //DOM
    this.itemDisplay = itemDisplay; //DOM
    this.itemTotal = itemTotal; //DOM
    this.itemCost = itemCost; //DOM
    this.itemBuyFactor = itemBuyFactor;
    this.itemMultiplier = itemMultiplier;
    this.itemModule = itemModule;
    this.itemMax = itemMax;
    this.itemValue = itemValue;
  }

  itemButtonInit(totalLove) {
    this.itemButton.addEventListener("click", () => {
      if (totalLove.innerText >= Number(this.itemCost.innerText)) {
        this.itemDisplay.style.visibility = "visible";
        this.itemTotal.innerText = Number(this.itemTotal.innerText) + 1;
        totalLove.innerText =
          Number(totalLove.innerText) - Number(this.itemCost.innerText);
        this.itemCost.innerText = Math.round(
          10 * Number(this.itemBuyFactor) ** Number(this.itemTotal.innerText)
        );
        if (Number(this.itemTotal.innerText) % this.itemModule === 0) {
          this.itemMultiplier += 1;
        }
      }
    });
  }

  itemStyleUpdate(totalLove) {
    if (Number(this.itemTotal.innerText) >= this.itemMax) {
      this.itemList.style.textDecoration = "line-through";
    }

    if (Number(totalLove.innerText) >= Number(this.itemCost.innerText)) {
      this.itemButton.style.backgroundColor = "yellowgreen";
    } else {
      this.itemButton.style.backgroundColor = "silver";
    }
  }

  itemLoveValue() {
    return (
      Math.round(this.itemTotal.innerText * this.itemValue) *
      this.itemMultiplier
    );
  }
}

// Variables AGUA
const buyWater = document.getElementById("water-button");
const waterList = document.getElementById("water-list");
const waterDisplay = document.getElementById("water-display");
let totalWater = document.getElementById("water-total");
let waterCost = document.getElementById("water-price");
let waterBuyFactor = 1.07;
let waterMultiplier = 1;

// Variables COMIDA
const buyFood = document.getElementById("food-button");
const foodList = document.getElementById("food-list");
const foodDisplay = document.getElementById("food-display");
let totalFood = document.getElementById("food-total");
let foodCost = document.getElementById("food-price");
let foodBuyFactor = 1.14;
let foodMultiplier = 1;

// Variables CAMAS
const buyBed = document.getElementById("bed-button");
const bedList = document.getElementById("bed-list");
const bedDisplay = document.getElementById("bed-display");
let totalBed = document.getElementById("bed-total");
let bedCost = document.getElementById("bed-price");
let bedBuyFactor = 1.12;
let bedMultiplier = 1;

// Variables JUGUETES
const buyToy = document.getElementById("toy-button");
const toyList = document.getElementById("toy-list");
const toyDisplay = document.getElementById("toy-display");
let totalToy = document.getElementById("toy-total");
let toyCost = document.getElementById("toy-price");
let toyBuyFactor = 1.1;
let toyMultiplier = 1;

// Variables ACCESORIOS
const buyAccessory = document.getElementById("accessory-button");
const accessoryList = document.getElementById("accessory-list");
let totalAccessory = document.getElementById("accessory-total");
let accessoryCost = document.getElementById("accessory-price");
let accessoryBuyFactor = 1.06;
let accessoryMultiplier = 1;

// Variables CHUCHES
const buyTreat = document.getElementById("treat-button");
const treatList = document.getElementById("treat-list");
const treatDisplay = document.getElementById("treat-display");
let totalTreat = document.getElementById("treat-total");
let treatCost = document.getElementById("treat-price");
let treatBuyFactor = 1.02;
let treatMultiplier = 1;

// FUNCIONES
function addToLove(amount) {
  totalLove.innerText = Math.round(
    Number(totalLove.innerText) + Number(amount)
  );
}

function loseLove() {
  if (Number(lpsLost.innerText) === 0) {
    lpsLost.innerText = 1;
  } else {
    lpsLost.innerText = Math.ceil(Number(lpsLost.innerText) * factor);
  }
}

function playGame() {
  let waterPerSecond = Math.round(totalWater.innerText * 1) * waterMultiplier;
  let foodPerSecond = Math.round(totalFood.innerText * 2) * foodMultiplier;
  let bedPerSecond = Math.round(totalBed.innerText * 3) * bedMultiplier;
  let toyPerSecond = Math.round(totalToy.innerText * 4) * toyMultiplier;
  let accessoryPerSecond =
    Math.round(totalAccessory.innerText * 5) * accessoryMultiplier;
  let treatPerSecond = Math.round(totalTreat.innerText * 6) * treatMultiplier;

  addToLove(waterPerSecond);
  addToLove(foodPerSecond);
  addToLove(bedPerSecond);
  addToLove(toyPerSecond);
  addToLove(accessoryPerSecond);
  addToLove(treatPerSecond);
  addToLove(-Number(lpsLost.innerText));

  lovePerSecond.innerText =
    Number(lpsGained.innerText) - Number(lpsLost.innerText);
  lpsGained.innerText =
    Number(waterPerSecond) +
    Number(foodPerSecond) +
    Number(bedPerSecond) +
    Number(toyPerSecond) +
    Number(accessoryPerSecond) +
    Number(treatPerSecond);

  if (
    Number(totalWater.innerText) >= 90 &&
    Number(totalFood.innerText) >= 40 &&
    Number(totalBed.innerText) >= 35 &&
    Number(totalToy.innerText) >= 20 &&
    Number(totalAccessory.innerText) >= 25 &&
    Number(totalTreat.innerText) >= 15
  ) {
    window.location.replace("./../html/game-win.html");
  }

  if (Number(lovePerSecond.innerText) < 0) {
    window.location.replace("./../html/game-lose.html");
  }
}

function waterStyleUpdate() {
  if (Number(totalWater.innerText) >= 90) {
    waterList.style.textDecoration = "line-through";
  }

  if (Number(totalLove.innerText) >= Number(waterCost.innerText)) {
    buyWater.style.backgroundColor = "yellowgreen";
  } else {
    buyWater.style.backgroundColor = "silver";
  }
}

function foodStyleUpdate() {
  if (Number(totalFood.innerText) >= 40) {
    foodList.style.textDecoration = "line-through";
  }

  if (Number(totalLove.innerText) >= Number(foodCost.innerText)) {
    buyFood.style.backgroundColor = "yellowgreen";
  } else {
    buyFood.style.backgroundColor = "silver";
  }
}

function bedStyleUpdate() {
  if (Number(totalBed.innerText) >= 35) {
    bedList.style.textDecoration = "line-through";
  }

  if (Number(totalLove.innerText) >= Number(bedCost.innerText)) {
    buyBed.style.backgroundColor = "yellowgreen";
  } else {
    buyBed.style.backgroundColor = "silver";
  }
}

function toyStyleUpdate() {
  if (Number(totalToy.innerText) >= 20) {
    toyList.style.textDecoration = "line-through";
  }

  if (Number(totalLove.innerText) >= Number(toyCost.innerText)) {
    buyToy.style.backgroundColor = "yellowgreen";
  } else {
    buyToy.style.backgroundColor = "silver";
  }
}

function accessoryStyleUpdate() {
  if (Number(totalAccessory.innerText) >= 25) {
    accessoryList.style.textDecoration = "line-through";
  }

  if (Number(totalLove.innerText) >= Number(accessoryCost.innerText)) {
    buyAccessory.style.backgroundColor = "yellowgreen";
  } else {
    buyAccessory.style.backgroundColor = "silver";
  }
}

function treatStyleUpdate() {
  if (Number(totalTreat.innerText) >= 15) {
    treatList.style.textDecoration = "line-through";
  }

  if (Number(totalLove.innerText) >= Number(treatCost.innerText)) {
    buyTreat.style.backgroundColor = "yellowgreen";
  } else {
    buyTreat.style.backgroundColor = "silver";
  }
}

function mouseUp() {
  if (totalAccessory.innerText >= 1) {
    yunaInteract.src = "./../img/yunanormals.png";
  } else {
    yunaInteract.src = "./../img/yunanormaln.png";
  }
}

function mouseDown() {
  if (totalAccessory.innerText >= 1) {
    yunaInteract.src = "./../img/yunahappys.png";
  } else {
    yunaInteract.src = "./../img/yunahappyn.png";
  }
}

window.addEventListener("load", () => {
  // FUNCIONES dentro del LISTENER
  yunaInteract.addEventListener("click", function () {
    addToLove(increment);
    if (!gameStart) {
      setInterval(loseLove, 10000);
      gameStart = true;
    }
  });

  buyWater.addEventListener("click", function () {
    if (totalLove.innerText >= Number(waterCost.innerText)) {
      waterDisplay.style.visibility = "visible";
      totalWater.innerText = Number(totalWater.innerText) + 1;
      totalLove.innerText =
        Number(totalLove.innerText) - Number(waterCost.innerText);
      waterCost.innerText = Math.round(
        10 * Number(waterBuyFactor) ** Number(totalWater.innerText)
      );
      if (Number(totalWater.innerText) % 25 === 0) {
        waterMultiplier += 1;
      }
    }
  });

  buyFood.addEventListener("click", function () {
    if (totalLove.innerText >= Number(foodCost.innerText)) {
      foodDisplay.style.visibility = "visible";
      totalFood.innerText = Number(totalFood.innerText) + 1;
      totalLove.innerText =
        Number(totalLove.innerText) - Number(foodCost.innerText);
      foodCost.innerText = Math.round(
        50 * Number(foodBuyFactor) ** Number(totalFood.innerText)
      );
      if (Number(totalFood.innerText) % 15 === 0) {
        foodMultiplier += 1;
      }
    }
  });

  buyBed.addEventListener("click", function () {
    if (totalLove.innerText >= Number(bedCost.innerText)) {
      bedDisplay.style.visibility = "visible";
      totalBed.innerText = Number(totalBed.innerText) + 1;
      totalLove.innerText =
        Number(totalLove.innerText) - Number(bedCost.innerText);
      bedCost.innerText = Math.round(
        100 * Number(bedBuyFactor) ** Number(totalBed.innerText)
      );
      if (Number(totalBed.innerText) % 10 === 0) {
        bedMultiplier += 1;
      }
    }
  });

  buyToy.addEventListener("click", function () {
    if (totalLove.innerText >= Number(toyCost.innerText)) {
      toyDisplay.style.visibility = "visible";
      totalToy.innerText = Number(totalToy.innerText) + 1;
      totalLove.innerText =
        Number(totalLove.innerText) - Number(toyCost.innerText);
      toyCost.innerText = Math.round(
        500 * Number(toyBuyFactor) ** Number(totalToy.innerText)
      );
      if (Number(totalToy.innerText) % 5 === 0) {
        toyMultiplier += 1;
      }
    }
  });

  buyAccessory.addEventListener("click", function () {
    if (totalLove.innerText >= Number(accessoryCost.innerText)) {
      yunaInteract.src = "./../img/yunanormals.png";
      totalAccessory.innerText = Number(totalAccessory.innerText) + 1;
      totalLove.innerText =
        Number(totalLove.innerText) - Number(accessoryCost.innerText);
      accessoryCost.innerText = Math.round(
        1000 * Number(accessoryBuyFactor) ** Number(totalAccessory.innerText)
      );
      if (Number(totalAccessory.innerText) % 10 === 0) {
        accessoryMultiplier += 1;
      }
    }
  });

  buyTreat.addEventListener("click", function () {
    if (totalLove.innerText >= Number(treatCost.innerText)) {
      treatDisplay.style.visibility = "visible";
      totalTreat.innerText = Number(totalTreat.innerText) + 1;
      totalLove.innerText =
        Number(totalLove.innerText) - Number(treatCost.innerText);
      treatCost.innerText = Math.round(
        5000 * Number(treatBuyFactor) ** Number(totalTreat.innerText)
      );
      if (Number(totalTreat.innerText) % 5 === 0) {
        treatMultiplier += 1;
      }
    }
  });

  setInterval(playGame, 1000);

  setInterval(waterStyleUpdate, 10);
  setInterval(foodStyleUpdate, 10);
  setInterval(bedStyleUpdate, 10);
  setInterval(toyStyleUpdate, 10);
  setInterval(accessoryStyleUpdate, 10);
  setInterval(treatStyleUpdate, 10);
});
