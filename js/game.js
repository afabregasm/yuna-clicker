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
    buttonDisplay,
    listDisplay,
    imageDisplay,
    amountDisplay,
    cost,
    costDisplay,
    buyFactor,
    multiplierStep,
    objective,
    value
  ) {
    this.buttonDisplay = buttonDisplay;
    this.listDisplay = listDisplay;
    this.imageDisplay = imageDisplay;
    this.amount = 0;
    this.amountDisplay = amountDisplay;
    this.cost = cost;
    this.costDisplay = costDisplay;
    this.buyFactor = buyFactor;
    this.multiplier = 1;
    this.multiplierStep = multiplierStep;
    this.objective = objective;
    this.value = value;
  }

  buy(totalLove) {
    if (totalLove >= this.cost) {
      if (this.imageDisplay) {
        this.imageDisplay.style.visibility = "visible";
      }
      this.amount += 1;
      totalLove -= this.cost;
      this.cost = Math.round(10 * this.buyFactor ** this.amount);
      if (this.amount % this.multiplierStep === 0) {
        this.multiplier++;
      }
      this.updateDOM();
    }
    return totalLove;
  }

  updateStyle(totalLove) {
    if (this.amount >= this.objective) {
      this.listDisplay.style.textDecoration = "line-through";
    }

    totalLove >= this.cost
      ? (this.buttonDisplay.style.backgroundColor = "yellowgreen")
      : (this.buttonDisplay.style.backgroundColor = "silver");
  }

  updateDOM() {
    this.amountDisplay.innerText = this.amount;
    this.costDisplay.innerText = this.cost;
  }

  getLoveValue() {
    return Math.round(this.amount * this.value) * this.multiplier;
  }
}

const water = new Item(
  document.getElementById("water-button"),
  document.getElementById("water-list"),
  document.getElementById("water-display"),
  document.getElementById("water-total"),
  10,
  document.getElementById("water-price"),
  1.07,
  25,
  90,
  1
);

const food = new Item(
  document.getElementById("food-button"),
  document.getElementById("food-list"),
  document.getElementById("food-display"),
  document.getElementById("food-total"),
  50,
  document.getElementById("food-price"),
  1.14,
  15,
  40,
  2
);

const beds = new Item(
  document.getElementById("bed-button"),
  document.getElementById("bed-list"),
  document.getElementById("bed-display"),
  document.getElementById("bed-total"),
  100,
  document.getElementById("bed-price"),
  1.12,
  10,
  35,
  3
);

const toys = new Item(
  document.getElementById("toy-button"),
  document.getElementById("toy-list"),
  document.getElementById("toy-display"),
  document.getElementById("toy-total"),
  500,
  document.getElementById("toy-price"),
  1.1,
  5,
  20,
  4
);

const accessories = new Item(
  document.getElementById("accessory-button"),
  document.getElementById("accessory-list"),
  false,
  document.getElementById("accessory-total"),
  1000,
  document.getElementById("accessory-price"),
  1.06,
  10,
  25,
  5
);

const treats = new Item(
  document.getElementById("treat-button"),
  document.getElementById("treat-list"),
  document.getElementById("treat-display"),
  document.getElementById("treat-total"),
  5000,
  document.getElementById("treat-price"),
  1.02,
  5,
  15,
  6
);

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

// function waterStyleUpdate() {
//   if (Number(totalWater.innerText) >= 90) {
//     waterList.style.textDecoration = "line-through";
//   }

//   if (Number(totalLove.innerText) >= Number(waterCost.innerText)) {
//     buyWater.style.backgroundColor = "yellowgreen";
//   } else {
//     buyWater.style.backgroundColor = "silver";
//   }
// }

// function foodStyleUpdate() {
//   if (Number(totalFood.innerText) >= 40) {
//     foodList.style.textDecoration = "line-through";
//   }

//   if (Number(totalLove.innerText) >= Number(foodCost.innerText)) {
//     buyFood.style.backgroundColor = "yellowgreen";
//   } else {
//     buyFood.style.backgroundColor = "silver";
//   }
// }

// function bedStyleUpdate() {
//   if (Number(totalBed.innerText) >= 35) {
//     bedList.style.textDecoration = "line-through";
//   }

//   if (Number(totalLove.innerText) >= Number(bedCost.innerText)) {
//     buyBed.style.backgroundColor = "yellowgreen";
//   } else {
//     buyBed.style.backgroundColor = "silver";
//   }
// }

// function toyStyleUpdate() {
//   if (Number(totalToy.innerText) >= 20) {
//     toyList.style.textDecoration = "line-through";
//   }

//   if (Number(totalLove.innerText) >= Number(toyCost.innerText)) {
//     buyToy.style.backgroundColor = "yellowgreen";
//   } else {
//     buyToy.style.backgroundColor = "silver";
//   }
// }

// function accessoryStyleUpdate() {
//   if (Number(totalAccessory.innerText) >= 25) {
//     accessoryList.style.textDecoration = "line-through";
//   }

//   if (Number(totalLove.innerText) >= Number(accessoryCost.innerText)) {
//     buyAccessory.style.backgroundColor = "yellowgreen";
//   } else {
//     buyAccessory.style.backgroundColor = "silver";
//   }
// }

// function treatStyleUpdate() {
//   if (Number(totalTreat.innerText) >= 15) {
//     treatList.style.textDecoration = "line-through";
//   }

//   if (Number(totalLove.innerText) >= Number(treatCost.innerText)) {
//     buyTreat.style.backgroundColor = "yellowgreen";
//   } else {
//     buyTreat.style.backgroundColor = "silver";
//   }
// }

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

  // buyWater.addEventListener("click", function () {
  //   if (totalLove.innerText >= Number(waterCost.innerText)) {
  //     waterDisplay.style.visibility = "visible";
  //     totalWater.innerText = Number(totalWater.innerText) + 1;
  //     totalLove.innerText =
  //       Number(totalLove.innerText) - Number(waterCost.innerText);
  //     waterCost.innerText = Math.round(
  //       10 * Number(waterBuyFactor) ** Number(totalWater.innerText)
  //     );
  //     if (Number(totalWater.innerText) % 25 === 0) {
  //       waterMultiplier += 1;
  //     }
  //   }
  // });

  // buyFood.addEventListener("click", function () {
  //   if (totalLove.innerText >= Number(foodCost.innerText)) {
  //     foodDisplay.style.visibility = "visible";
  //     totalFood.innerText = Number(totalFood.innerText) + 1;
  //     totalLove.innerText =
  //       Number(totalLove.innerText) - Number(foodCost.innerText);
  //     foodCost.innerText = Math.round(
  //       50 * Number(foodBuyFactor) ** Number(totalFood.innerText)
  //     );
  //     if (Number(totalFood.innerText) % 15 === 0) {
  //       foodMultiplier += 1;
  //     }
  //   }
  // });

  // buyBed.addEventListener("click", function () {
  //   if (totalLove.innerText >= Number(bedCost.innerText)) {
  //     bedDisplay.style.visibility = "visible";
  //     totalBed.innerText = Number(totalBed.innerText) + 1;
  //     totalLove.innerText =
  //       Number(totalLove.innerText) - Number(bedCost.innerText);
  //     bedCost.innerText = Math.round(
  //       100 * Number(bedBuyFactor) ** Number(totalBed.innerText)
  //     );
  //     if (Number(totalBed.innerText) % 10 === 0) {
  //       bedMultiplier += 1;
  //     }
  //   }
  // });

  // buyToy.addEventListener("click", function () {
  //   if (totalLove.innerText >= Number(toyCost.innerText)) {
  //     toyDisplay.style.visibility = "visible";
  //     totalToy.innerText = Number(totalToy.innerText) + 1;
  //     totalLove.innerText =
  //       Number(totalLove.innerText) - Number(toyCost.innerText);
  //     toyCost.innerText = Math.round(
  //       500 * Number(toyBuyFactor) ** Number(totalToy.innerText)
  //     );
  //     if (Number(totalToy.innerText) % 5 === 0) {
  //       toyMultiplier += 1;
  //     }
  //   }
  // });

  // buyAccessory.addEventListener("click", function () {
  //   if (totalLove.innerText >= Number(accessoryCost.innerText)) {
  //     yunaInteract.src = "./../img/yunanormals.png";
  //     totalAccessory.innerText = Number(totalAccessory.innerText) + 1;
  //     totalLove.innerText =
  //       Number(totalLove.innerText) - Number(accessoryCost.innerText);
  //     accessoryCost.innerText = Math.round(
  //       1000 * Number(accessoryBuyFactor) ** Number(totalAccessory.innerText)
  //     );
  //     if (Number(totalAccessory.innerText) % 10 === 0) {
  //       accessoryMultiplier += 1;
  //     }
  //   }
  // });

  // buyTreat.addEventListener("click", function () {
  //   if (totalLove.innerText >= Number(treatCost.innerText)) {
  //     treatDisplay.style.visibility = "visible";
  //     totalTreat.innerText = Number(totalTreat.innerText) + 1;
  //     totalLove.innerText =
  //       Number(totalLove.innerText) - Number(treatCost.innerText);
  //     treatCost.innerText = Math.round(
  //       5000 * Number(treatBuyFactor) ** Number(totalTreat.innerText)
  //     );
  //     if (Number(totalTreat.innerText) % 5 === 0) {
  //       treatMultiplier += 1;
  //     }
  //   }
  // });

  setInterval(playGame, 1000);

  setInterval(waterStyleUpdate, 10);
  setInterval(foodStyleUpdate, 10);
  setInterval(bedStyleUpdate, 10);
  setInterval(toyStyleUpdate, 10);
  setInterval(accessoryStyleUpdate, 10);
  setInterval(treatStyleUpdate, 10);
});
