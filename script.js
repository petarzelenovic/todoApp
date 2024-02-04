"use strict";

//definisanje polja za unos
const taskNameEl = document.querySelector("#task-name");
const btnCategories = document.querySelectorAll(".btn-category");
const descriptionEl = document.querySelector("#description");

//dugme za ubacivanje
const btnAdd = document.querySelector(".btn-add");

//event za klik na dugme za kategorije
for (let i = 0; i < btnCategories.length; i++) {
    btnCategories[i].addEventListener("click", function () {
        btnCategories[i].classList.toggle("active-category");
    });
}

//event za ubacivanje novog todo
btnAdd.addEventListener("click", function () {
    const taskName = taskNameEl.value;
    const description = descriptionEl.value;

    //sve kategorije koje smo odabrali
    const btnActive = document.querySelectorAll(".active-category");
    //ubacujemo sve kategorije u niz
    const categories = [];
    for (let i = 0; i < btnActive.length; i++) {
        categories.push(btnActive[i].textContent);
    }

    //obavezno naziv i kategorija
    if (taskName.length === 0 || categories.length === 0) {
        return;
    }

    //vrednosti za uno

    //kreiranje novog elementa i ubacivanje unutar diva
    let task = document.createElement("div");
    task.classList.add("task-box");

    //fja koja vraca onoliko kategorija koliko smo selektovali
    function returnCategory() {
        let string = ``;
        for (let i = 0; i < categories.length; i++) {
            string += ` <h4 class="category-tag">${categories[i]}</h4> `;
        }
        return string;
    }

    //popunjavanje elementa sa HTML elementima i ubacivanjem vrednosti
    task.innerHTML = `
        ${returnCategory()}
        <h3 class="task-heading">${taskName}</h3>
        <p class="task-description">${description}</p>
        `;

    //ubacivanje samog taska u DOM
    const allTasks = document.querySelector(".all-tasks");
    allTasks.appendChild(task);

    //resetovanje inputa
    taskNameEl.value = "";
    descriptionEl.value = "";

    for (let i = 0; i < btnActive.length; i++) {
        btnActive[i].classList.toggle("active-category");
    }
});
console.log(taskNameEl);
