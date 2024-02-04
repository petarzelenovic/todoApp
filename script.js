"use strict";

//definisanje polja za unos
const taskNameEl = document.querySelector("#task-name");
const btnCategories = document.querySelectorAll(".btn-category");
const descriptionEl = document.querySelector("#description");

//dugme za brisanje
const btnRemove = document.querySelector(".btn-delete");
//dugme za ubacivanje
const btnAdd = document.querySelector(".btn-add");

//event za klik na dugme za kategorije
for (let i = 0; i < btnCategories.length; i++) {
    btnCategories[i].addEventListener("click", function () {
        btnCategories[i].classList.toggle("active-category");
    });
}

//event za brisanje elemenata
//ne mozemo stavljati na dugmice jer se dinamicki kreiraju
//pa moramo proveravati je l se taj event bas poziva
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-delete")) {
        const element = e.target;
        const parent = element.closest(".task-box");
        parent.remove();
    }
});

//event za cekiranje taskova
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-completed")) {
        //dugme complete
        const element = e.target;

        //pravimo da je completed
        const parent = element.closest(".task-box");
        parent.classList.toggle("completed");

        const checkBtn = element.nextElementSibling;

        checkBtn.classList.toggle("hidden");
        element.classList.toggle("hidden");
    }
});

//event za uncheck eventa
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-incompleted")) {
        //dugme incoplete
        const element = e.target;

        //pravimo da je incoplete (bez plave boje i precrtanog)
        const parent = element.closest(".task-box");
        parent.classList.toggle("completed");

        const checkBtn = element.previousElementSibling;
        checkBtn.classList.toggle("hidden");
        element.classList.toggle("hidden");
    }
});

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
        <div class="button-container">
        <ion-icon name="checkmark-sharp" class="btn-action btn-completed"></ion-icon>
        <ion-icon name="remove" class="btn-action btn-incompleted hidden"></ion-icon>

        <ion-icon name="close" class="btn-action btn-delete"></ion-icon>
      </div>
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
