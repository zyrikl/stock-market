var zyr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 231.23];
var zyrText = `<h2>ZYR</h2>
    <p>The legendary software company <b>Zyrikl, Inc.</b> is about to prove that your money is worth it! With their method of prioritizing customer satisfaction and efficiency, your money will be invested into the creation of new products. If you are an investor, you even get a free handout about our upcoming products!</p>`;

const ctx0 = document.getElementById('zyrCanvas');

var zyrChart = new Chart(ctx0, {
    type: 'line',
    data: {
        labels: ['','','','','','','','','',''],
        datasets: [{
            label: 'Stock Price',
            data: zyr,
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
});

var stockPriceChart = [10.73, 32.53, 1.23, 0.95, 99.34, 231.23];

function updateCharts() {
    var changeChart = change_percent();
    var changeStockChart = money_round(((1+changeChart)*stockPrice[i]));
    for (var i=0;i<stockPriceChart.length;i++) {
        if (i === 5) {
            zyr.push(changeStockChart);
            zyr.splice(0, 1);
            document.getElementById("info").value = zyrText;
            zyrChart.update();
        }
    }
    setTimeout(updateCharts, 5000);
}
updateCharts();