"use strict";

window.onload = init;

function init() {
    //event handlers
    document.getElementById("calculateBtn").onclick = calculateTotalFlour;
}
function calculateTotalFlour() {
    //calculate percentage total
    const water = parseInt(document.getElementById("percentageWater").value);
    const salt = parseInt(document.getElementById("percentageSalt").value);
    const yeast = parseInt(document.getElementById("percentageYeast").value);
    let percentageTotal = (water + salt + yeast + 100) / 100;

    //calculate total weight 
    const loaves = parseInt(document.getElementById("inputLoaves").value);
    const weightPL = parseInt(document.getElementById("inputWeightPL").value);

    let totalWeight = loaves * weightPL;

    //calculate total flour
    let totalFlour = totalWeight / percentageTotal;

    SetIngredientWeights (totalFlour, water, salt, yeast)
}

function SetIngredientWeights (totalFlour, water, salt, yeast){
    //set values in recipe: flour multiplied by ingredient percentages 
   document.getElementById("weightFlour").textContent = "Flour: " + Math.round(totalFlour) + " grams";
   document.getElementById("weightWater").textContent = "Water: " + Math.round(totalFlour * (water/100)) + " grams";
   document.getElementById("weightSalt").textContent = "Salt: " + Math.round(totalFlour * (salt/100)) + " grams";
   document.getElementById("weightYeast").textContent = "Yeast: " + Math.round(totalFlour * (yeast/100)) + " grams";;
}



