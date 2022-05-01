"use strict";

window.onload = init;

let ingredientPercentages = [];
let ingredientWeights = [];
let totalFlour = 0;

function init() {
    //event handlers
    document.getElementById("calculateBtn").onclick = calculateBtnClicked;
    document.getElementById("needAPoolishBtn").onclick = needPoolishBtnClicked;
    document.getElementById("calculatePoolishBtn").onclick = calculatepoolish;
}

function calculateBtnClicked() {
    setIngredientPercentages();
    calculateTotalFlour();
    setIngredientWeights();

}

function setIngredientPercentages() {
    //adds percentages to array
    const water = parseFloat(document.getElementById("percentageWater").value);
    const salt = parseFloat(document.getElementById("percentageSalt").value);
    const yeast = parseFloat(document.getElementById("percentageYeast").value);
    ingredientPercentages = [100, water, salt, yeast];
}

function calculateTotalFlour() {
    //percentage total = sum of ingredient percentages
    let percentageTotal = (ingredientPercentages[0] + ingredientPercentages[1] + ingredientPercentages[2] + ingredientPercentages[3]) / 100;

    //calculate total weight 
    const loaves = parseFloat(document.getElementById("inputLoaves").value);
    const weightPL = parseFloat(document.getElementById("inputWeightPL").value);
    let totalWeight = loaves * weightPL;

    //calculate total flour
    totalFlour = totalWeight / percentageTotal;
}

function setIngredientWeights() {
    //add weights to array
    ingredientWeights = [Math.round(totalFlour), Math.round(totalFlour * (ingredientPercentages[1] / 100)), Math.round(totalFlour * (ingredientPercentages[2] / 100)), Math.round(totalFlour * (ingredientPercentages[3] / 100))]

    //Display weights in recipe section
    document.getElementById("weightFlour").textContent = "Flour: " + ingredientWeights[0] + " grams";
    document.getElementById("weightWater").textContent = "Water: " + ingredientWeights[1] + " grams";
    document.getElementById("weightSalt").textContent = "Salt: " + ingredientWeights[2] + " grams";
    document.getElementById("weightYeast").textContent = "Yeast: " + ingredientWeights[3] + " grams";
    document.getElementById("poolishForm").classList.add("hide");
    document.getElementById("recipeWithPoolish").classList.add("hide");
    document.getElementById("poolishBtnDiv").classList.remove("hide");
    document.getElementById("recipe").classList.remove("hide");
}

function needPoolishBtnClicked() {
    //hide recipe & need a poolish btn & show poolish form
    document.getElementById("recipe").classList.add("hide");
    document.getElementById("poolishBtnDiv").classList.add("hide");
    document.getElementById("poolishForm").classList.remove("hide");
}

function calculatepoolish() {
    //calculate poolish ingredient weights
    let poolishFlour = Math.round( totalFlour * (parseFloat(document.getElementById("poolishPercent").value) / 100));
    let poolishWater = poolishFlour * (parseFloat(document.getElementById("poolishWaterPercent").value) / 100);
    let poolishYeast = (poolishFlour * (parseFloat(document.getElementById("poolishYeastPercent").value) / 100)).toFixed(2);



    //subtract from remaining ingredients to calculate final dough
    let finalDoughFlour = Math.round( totalFlour - poolishFlour);
    let finalDoughWater = ingredientWeights[1] - poolishWater;
    let finalDoughSalt = ingredientWeights[2];
    let finalDoughYeast = ingredientWeights[3] - poolishYeast;

    //hide form, show poolish recipe
    document.getElementById("poolishForm").classList.add("hide");
    document.getElementById("recipeWithPoolish").classList.remove("hide");


    //show poolish recipe
    document.getElementById("weightFlourPoolish").textContent = "Flour: " + poolishFlour + " grams";
    document.getElementById("weightWaterPoolish").textContent = "Water: " + poolishWater + " grams";
    document.getElementById("weightYeastPoolish").textContent = "Yeast: " + poolishYeast + " grams";
    document.getElementById("weightFlourRemaining").textContent = "Flour: " + finalDoughFlour + " grams";
    document.getElementById("weightWaterRemaining").textContent = "Water: " + finalDoughWater + " grams";
    document.getElementById("weightSaltRemaining").textContent = "Salt: " + finalDoughSalt + " grams";
    document.getElementById("weightYeastRemaining").textContent = "Yeast: " + finalDoughYeast + " grams";

}



//add reset btn
//add other ingredients