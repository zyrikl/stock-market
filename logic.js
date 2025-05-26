var moneyElement = document.getElementById("money");

var cost0Element = document.getElementById("cost0");
var cost1Element = document.getElementById("cost1");
var cost2Element = document.getElementById("cost2");
var cost3Element = document.getElementById("cost3");
var cost4Element = document.getElementById("cost4");
var cost5Element = document.getElementById("cost5");

var owned0Element = document.getElementById("owned0");
var owned1Element = document.getElementById("owned1");
var owned2Element = document.getElementById("owned2");
var owned3Element = document.getElementById("owned3");
var owned4Element = document.getElementById("owned4");
var owned5Element = document.getElementById("owned5");

var percent0Element = document.getElementById("percent0");
var percent1Element = document.getElementById("percent1");
var percent2Element = document.getElementById("percent2");
var percent3Element = document.getElementById("percent3");
var percent4Element = document.getElementById("percent4");
var percent5Element = document.getElementById("percent5");

var money = 300.00;

var amountOwned = [0, 0, 0, 0, 0, 0];
var amountTotal = [300, 250, 200, 500, 200, 150];
var stockPrice = [10.73, 32.53, 1.23, 0.95, 99.34, 231.23];
var percentage = [0, 0, 0, 0, 0, 0];

var ttd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 10.73];
// Code to be used later
/* var ttdChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['','','','','','','','','',''],
        datasets: [{
            label: 'Stock Price',
            data: ttd,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}); */

function popup(string) {
    var popupElement = document.getElementById("popup");
    popupElement.innerHTML = string;
    document.getElementById("screen").className.toggle("show");
}

function money_round(num) {
    return Math.ceil(num * 100) / 100;
}

function change_percent() {
    return (Math.random()*60-29)/100;
}

function updateData() {
    moneyElement.innerHTML = money_round(money);
    cost0Element.innerHTML = money_round(stockPrice[0]);
    cost1Element.innerHTML = money_round(stockPrice[1]);
    cost2Element.innerHTML = money_round(stockPrice[2]);
    cost3Element.innerHTML = money_round(stockPrice[3]);
    cost4Element.innerHTML = money_round(stockPrice[4]);
    cost5Element.innerHTML = money_round(stockPrice[5]);
    owned0Element.innerHTML = money_round(amountOwned[0]);
    owned1Element.innerHTML = money_round(amountOwned[1]);
    owned2Element.innerHTML = money_round(amountOwned[2]);
    owned3Element.innerHTML = money_round(amountOwned[3]);
    owned4Element.innerHTML = money_round(amountOwned[4]);
    owned5Element.innerHTML = money_round(amountOwned[5]);
    document.getElementById("info").value = zyrText;
}
function updatePercent() {
    percent0Element.innerHTML = money_round(percentage[0]);
    percent1Element.innerHTML = money_round(percentage[1]);
    percent2Element.innerHTML = money_round(percentage[2]);
    percent3Element.innerHTML = money_round(percentage[3]);
    percent4Element.innerHTML = money_round(percentage[4]);
    percent5Element.innerHTML = money_round(percentage[5]);
}

function buy(id,amount) {
    if (money >= stockPrice[id]*amount) {
        if ((amountOwned[id]+amount) <= amountTotal[id]) {
            money -= stockPrice[id]*amount;
            amountOwned[id] += 1;
        } else {
            money = money;
        }
    } else {
        money = money;
    }
    updateData();
}
function sell(id,amount) {
    if ((amountOwned[id]-amount) >= 0) {
        money += stockPrice[id]*amount;
        amountOwned[id] -= 1;
    } else {
        money = money;
    }
    updateData();
}

function changePrice() {
    for (var i=0;i<stockPrice.length;i++) {
        var change = change_percent();
        var changeStock = money_round(((1+change)*stockPrice[i]));
        if (i === 5) {
            zyr.push(changeStock);
            zyr.splice(0, 1);
            document.getElementById("info").value = zyrText;
            zyrChart.update();
        }
        stockPrice[i] = money_round(((1+change)*stockPrice[i]));
        percentage[i] = change*100;
        updateData();
        updatePercent();
    }
    setTimeout(changePrice, 5000);
}
changePrice();

document.addEventListener("keydown", function (Event) {
    if (Event.key === "I") {
        var moneyAsk = prompt("Enter data here:");
        if (moneyAsk === "") {
            money = 300.00;
        } else {
            var dataSet = atob(moneyAsk);
            var dataList = dataSet.split("|");
            money = Number(dataList[0]);
            for (var coefficient = 1; coefficient < (amountOwned.length+1); coefficient++) {
                amountOwned[coefficient-1] = dataList[coefficient];
            }
        }
    }
    if (Event.key === "Q") {
        var exportData = money;
        for (var coefficient2 = 0; coefficient2 < amountOwned.length; coefficient2++) {
            exportData += "|"+amountOwned[coefficient2];
        }
        alert("Exported data: "+btoa(exportData));
    }
});