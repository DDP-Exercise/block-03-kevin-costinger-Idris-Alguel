"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Idris Algül - 2026-04-09
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.
document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(e) {
    //TODO: Prevent the default behavior of the submit button.
    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
    //verhindert neuladung
    e.preventDefault();

    let dateInput = document.getElementById("date");
    let amountInput = document.getElementById("amount");
    let expenseInput = document.getElementById("expense");

    let dateValue = dateInput.value;                            //speichert Datum feld welches in date feld geschrieben wurde und .value holt den text was der Nutzer eingetippt hat
    let amountValue = parseFloat(amountInput.value);    //parseFloat verwandelt den Text in Kommazahl um
    let expenseValue = expenseInput.value;


    if (isEmpty(dateValue) === true) {                  // prüft ob das feld leer ist
        dateInput.focus();                              // setzt den cursor in das leere Feld
        return;
    }

    if (amountValue < 0.01 || isNaN(amountValue)) {     // ist es kleiner als 0.01 oder gar kein gültiger Zahl
        amountInput.focus();                            // wenn es falsch ist dann zurück mit den cursor ins Betrags Feld
        return;
    }

    if (expenseValue.length < 3) {                      // zählt ob es weniger als 3 buchstaben ist
        expenseInput.focus();                           // wenn es so ist dann geht die cursor ins expense feld
        return;
    }
    let tableBody = document.querySelector("#expenses tbody");
    let newRow = "<tr>";
    newRow += "<td>" + dateValue + "</td>";     // Zelle 1 Datum
    newRow += "<td>" + amountValue + "</td>";   // Zelle 2 Geld
    newRow += "<td>" + expenseValue + "</td>";  // Zelle 3 Beschreibung
    newRow += "<td><button class='delete'>Delete</button></td>";    // Zelle 4 Löschknopf
    newRow += "</tr>";

    tableBody.innerHTML += newRow;      // neue Zeile darunter

    sumExpenses = sumExpenses + amountValue;       // altes Guthaben wird mit neue Ausgabe gerechner

    document.getElementById("expenseSum").innerHTML = formatEuro(sumExpenses);
    document.querySelector("form").reset();
}



    let table = document.getElementById("expenses");

    table.addEventListener("click", function(e) {   // wenn irgendwo in der Tabelle geklick wird
        let button = e.target;                                        // dann wird das angeklickte ding gespeichert

        if (button.className === "delete") {                                     // prüft ob angeklickte element in der css die klasse "delete" hat damit wie sicherstellen können dass nur beim lösch button klicken et was passiert

            let cell = button.parentElement;
            let row = cell.parentElement;

            let amountText = row.cells[1].innerHTML;
            let amountNumber = parseFloat(amountText);

            sumExpenses = sumExpenses - amountNumber;

            document.getElementById("expenseSum").innerHTML = formatEuro(sumExpenses);
            row.remove();

        }
    });


/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.                          !!!!I WILL THINK ABOUT IT :):):)):):):):):):):):)):):)):)::):)):)::)!!!!!
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}