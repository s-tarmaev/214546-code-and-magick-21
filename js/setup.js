"use strict";

let numberOfPlayers = 4;
let wizards = {
  name: [
    "Иван",
    "Хуан Себастьян",
    "Мария",
    "Кристоф",
    "Виктор",
    "Юлия",
    "Люпита",
    "Вашингтон",
  ],

  lastName: [
    "да Марья",
    "Верон",
    "Мирабелла",
    "Вальц",
    "Онопко",
    "Топольницкая",
    "Нионго",
    "Ирвинг",
  ],

  coatColor: [
    "rgb(101, 137, 164)",
    "rgb(241, 43, 107)",
    "rgb(146, 100, 161)",
    "rgb(56, 159, 117)",
    "rgb(215, 210, 55)",
    "rgb(0, 0, 0)",
  ],

  eyesColor: ["black", "red", "blue", "yellow", "green"],
};

let getRandomInt = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

let getRandomArrayElement = (array) => {
  let number = getRandomInt(0, array.length - 1);
  return array[number];
};

let generateName = (nameArray, lastArray) => {
  let nameNumber = getRandomInt(0, nameArray.length - 1);
  let lastNumber = getRandomInt(0, lastArray.length - 1);

  return nameArray[nameNumber] + " " + lastArray[lastNumber];
};

let generateWizardsArray = (Object, number) => {
 let resultArray = [];
  for (let i = 0; i < number; i++) {
    let wizard = {
      name: generateName(Object.name, Object.lastName),
      coatColor: getRandomArrayElement(Object.coatColor),
      eyesColor: getRandomArrayElement(Object.eyesColor)
    };
    resultArray.push(wizard);
  }
  return resultArray;
};

let renderWizard = (array) => {
  let similarWizardTemplate = document
    .querySelector("#similar-wizard-template")
    .content.querySelector(".setup-similar-item");
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    let wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(".setup-similar-label").textContent =
      array[i].name;
    wizardElement.querySelector(".wizard-coat").style.fill = array[i].coatColor;
    wizardElement.querySelector(".wizard-eyes").style.fill = array[i].eyesColor;

    fragment.appendChild(wizardElement);
  }
  return fragment;
};

let wizardsArray = generateWizardsArray(wizards, numberOfPlayers);

let similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(renderWizard(wizardsArray));

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
