var runningTotal = 0;
var toppingTotal = 0;

// This function generates a receipt for the pizza order
function getReceipt() {
    var text1 = "<h3>Your Order:</h3>";
    var sizeTotal = 0;
    var sizeArray = document.getElementsByClassName('size');

    // Loop through the size options and check which one is selected
    for (let index = 0; index < sizeArray.length; index++) {
        if (sizeArray[index].checked) {
            var selectedSize = sizeArray[index].value;
            text1 = text1 + "<strong>Size</strong>: <br>&nbsp&nbsp&nbsp- " + selectedSize;
        }
    }

    // Determine the price based on the selected size
    if (selectedSize === "6\" Pizza: Petite Pizzetta") { sizeTotal = 6; }
    else if (selectedSize === "10\" Pizza: Classic Craver") { sizeTotal = 10; }
    else if (selectedSize === "12\" Pizza: Mighty Medium") { sizeTotal = 12; }
    else if (selectedSize === "16\" Pizza: Colossal Creation") { sizeTotal = 16; }
    else if (selectedSize === "24\" Pizza: Titan's Triumph") { sizeTotal = 20; }

    runningTotal = sizeTotal;

    // Print the selected size and its price
    console.log(selectedSize + " = $" + sizeTotal + ".00");
    console.log("size text1 " + text1);
    console.log("subtotal: $" + runningTotal + ".00");

    // Append the selected options and their prices to the receipt text
    text1 += "&nbsp&nbsp&nbsp$" + sizeTotal + ".00<br>"
    text1 += getCrust();
    text1 += getSauce();
    text1 += getCheese();
    text1 += getVeggies();
    text1 += getMeats();
    text1 += getHerbs();

    // Display the receipt on the webpage
    document.getElementById('showText').innerHTML = text1;
    document.getElementById('totalPrice').innerHTML = "<h3>Total: <strong>$" + runningTotal + ".00</strong></h3>";
}

// Get the selected crust option
function getCrust() {
    var crustArray = document.getElementsByClassName('crust');

    for (let index = 0; index < crustArray.length; index++) {
        if (crustArray[index].checked) {
            var crustSelected = "<strong>Crust</strong>: <br>&nbsp&nbsp&nbsp- " + crustArray[index].value + "<br>";
        }
    }
    return crustSelected;
}

// Get the selected sauce option
function getSauce() {
    var sauceSelected = "<strong>Sauce</strong>: <br>";
    var sauceArray = document.getElementsByClassName('sauce');
    var noSauce = document.getElementById('no_sauce');

    // If "no sauce" option is selected, add it to the sauce selection
    if (noSauce.checked) {
        sauceSelected = sauceSelected + "&nbsp&nbsp&nbsp- " + noSauce.value + "<br>";
    } else {
        // Loop through the sauce options and check which one is selected
        for (let index = 0; index < sauceArray.length; index++) {
            if (sauceArray[index].checked) {
                var sauceSelected = sauceSelected + "&nbsp&nbsp&nbsp- " + sauceArray[index].value + "<br>";
            }
        }
    }
    return sauceSelected;
}

// Get the selected cheese option
function getCheese() {
    var cheeseSelected = "<strong>Cheese</strong>: <br>";
    var cheeseTotal = 0;
    var selectedCheese = [];
    var cheeseArray = document.getElementsByClassName('cheese');
    var noCheese = document.getElementById('no_cheese');

    // If "no cheese" option is selected, add it to the cheese selection
    if (noCheese.checked) {
        cheeseSelected = cheeseSelected + "&nbsp&nbsp&nbsp- " + noCheese.value + "<br>";
    } else {
        // Loop through the cheese options and check which ones are selected
        for (let index = 0; index < cheeseArray.length; index++) {
            if (noCheese.checked) {
                cheeseSelected = cheeseSelected + "&nbsp&nbsp&nbsp- " + noCheese.value + "<br>";
            } else if (cheeseArray[index].checked) {
                selectedCheese.push(cheeseArray[index].value);
                console.log("cheese selection: (" + cheeseArray[index].value + ")");

                // Add the cheese option and its price to the cheese selection
                if (selectedCheese.length > 1) {
                    cheeseSelected = cheeseSelected + "&nbsp&nbsp&nbsp- " + cheeseArray[index].value + "&nbsp&nbsp&nbsp$1.00 <br>"
                } else {
                    cheeseSelected = cheeseSelected + "&nbsp&nbsp&nbsp- " + cheeseArray[index].value + "&nbsp&nbsp&nbsp(Included) <br>";
                }
            }
        }
    }

    var cheeseCount = selectedCheese.length;

    // Calculate the total price for additional cheese toppings
    if (cheeseCount > 1) { cheeseTotal = (cheeseCount - 1) }
    else { cheeseTotal = 0 }

    runningTotal += cheeseTotal;

    console.log("total cheese items: " + cheeseCount);
    console.log(cheeseCount + " cheese(s) - 1 free cheese = $" + cheeseTotal + ".00");
    console.log("Purchase Total: $" + runningTotal + ".00");

    return cheeseSelected;
}

// Get the selected veggie options
function getVeggies() {
    var veggiesSelected = "<strong>Veggies</strong>: <br>";
    var selectedVeggies = [];
    var veggiesArray = document.getElementsByClassName('veggies');
    var noVeggies = document.getElementById('no_veggies');

    // If "no veggies" option is selected, add it to the veggies selection
    if (noVeggies.checked) {
        veggiesSelected = veggiesSelected + "&nbsp&nbsp&nbsp- " + noVeggies.value + "<br>";
    } else {
        // Loop through the veggie options and check which ones are selected
        for (let index = 0; index < veggiesArray.length; index++) {
            if (veggiesArray[index].checked) {
                selectedVeggies.push(veggiesArray[index].value);
                console.log("veggies selection: (" + veggiesArray[index].value + ")");
                toppingTotal += 1;

                // Add the veggie option and its price to the veggies selection
                if (toppingTotal > 2) {
                    veggiesSelected = veggiesSelected + "&nbsp&nbsp&nbsp- " + veggiesArray[index].value + "&nbsp&nbsp&nbsp$1.00 <br>"
                } else {
                    veggiesSelected = veggiesSelected + "&nbsp&nbsp&nbsp- " + veggiesArray[index].value + "&nbsp&nbsp&nbsp(Included) <br>";
                }
            }
        }
    }

    console.log("total veggies items: " + selectedVeggies.length);

    return veggiesSelected;
}

// Get the selected meat options
function getMeats() {
    var meatsSelected = "<strong>Meats</strong>: <br>";
    var selectedMeats = [];
    var meatsArray = document.getElementsByClassName('meats');
    var noMeats = document.getElementById('no_meats');

    // If "no meats" option is selected, add it to the meats selection
    if (noMeats.checked) {
        meatsSelected = meatsSelected + "&nbsp&nbsp&nbsp- " + noMeats.value + "<br>";
    } else {
        // Loop through the meat options and check which ones are selected
        for (let index = 0; index < meatsArray.length; index++) {
            if (meatsArray[index].checked) {
                selectedMeats.push(meatsArray[index].value);
                console.log("meats selection: (" + meatsArray[index].value + ")");
                toppingTotal += 1;

                // Add the meat option and its price to the meats selection
                if (toppingTotal > 2) {
                    meatsSelected = meatsSelected + "&nbsp&nbsp&nbsp- " + meatsArray[index].value + "&nbsp&nbsp&nbsp$1.00 <br>"
                } else {
                    meatsSelected = meatsSelected + "&nbsp&nbsp&nbsp- " + meatsArray[index].value + "&nbsp&nbsp&nbsp(Included) <br>";
                }
            }
        }
    }
    // Calculate the total price for additional meat toppings
    if (toppingTotal > 2) {
        runningTotal += toppingTotal - 2;
    }
    var toppingCount = toppingTotal - 2;
    if (toppingTotal < 3) { toppingCount = 0; }

    console.log("total meats items: " + selectedMeats.length);
    console.log(toppingTotal + " toppings(s) - 2 free toppings = $" + toppingCount + ".00");
    console.log("Purchase Total: $" + runningTotal + ".00");

    return meatsSelected;
}

// Get the selected herb options
function getHerbs() {
    var herbsSelected = "<strong>Herbs</strong>: <br>";
    var selectedHerbs = [];
    var herbsArray = document.getElementsByClassName('herbs');
    var noHerbs = document.getElementById('no_herbs');

    // If "no herbs" option is selected, add it to the herbs selection
    if (noHerbs.checked) {
        herbsSelected = herbsSelected + "&nbsp&nbsp&nbsp- " + noHerbs.value + "<br>";
    } else {
        // Loop through the herb options and check which ones are selected
        for (let index = 0; index < herbsArray.length; index++) {
            if (herbsArray[index].checked) {
                selectedHerbs.push(herbsArray[index].value);
                console.log("herb selection: (" + herbsArray[index].value + ")");
                herbsSelected = herbsSelected + "&nbsp&nbsp&nbsp- " + herbsArray[index].value + "<br>";
            }
        }
    }
    return herbsSelected;
}

// Function to uncheck all inputs with a given class name
function uncheckInput(className) {
    const inputElements = document.getElementsByClassName(className);

    // Loop through the input elements and uncheck them
    for (let index = 0; index < inputElements.length; index++) {
        inputElements[index].checked = false;
    }
}