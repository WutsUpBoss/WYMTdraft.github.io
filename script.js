// Prices for each category
const prices = {
  hsd: 20,
  vid: 45,
  xm: 25,
  xfi: 10,
  srw: 20
};

// Initial sales counters
let salesCounters = {
  hsd: 0,
  vid: 0,
  xm: 0,
  xfi: 0,
  srw: 0
};

// Function to update the counter for a category
function updateCounter(category, change) {
  // Calculate new count, avoiding negative numbers
  const newCount = Math.max(0, salesCounters[category] + change);
  salesCounters[category] = newCount;

  // Update the counter display
  document.getElementById(`${category}-counter`).textContent = newCount;

  // Update the total sales amount
  updateTotalSales();
}

// Function to reset all counters to zero
function resetCounters() {
  for (const category in salesCounters) {
    salesCounters[category] = 0;
    document.getElementById(`${category}-counter`).textContent = '0';
  }
  updateTotalSales();
}

// Function to calculate and update the total sales amount
function updateTotalSales() {
  let total = 0;
  for (const category in salesCounters) {
    total += salesCounters[category] * prices[category];
  }
  document.getElementById('total-amount').textContent = total.toFixed(2);
}

// Initialize the total on page load
document.addEventListener('DOMContentLoaded', updateTotalSales);
// Initialize chart variables
let salesChart;
const chartColors = {
  hsd: '#ff6384',
  vid: '#36a2eb',
  xm: '#cc65fe',
  xfi: '#ffce56',
  srw: '#4bc0c0'
};

// Function to initialize the pie chart
function initializeChart() {
  const ctx = document.getElementById('sales-chart').getContext('2d');
  salesChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(prices),
      datasets: [{
        data: Object.values(salesCounters),
        backgroundColor: Object.values(chartColors)
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sales Distribution'
        }
      }
    }
  });
}

// Function to update the pie chart with current sales data
function updateChart() {
  salesChart.data.datasets[0].data = Object.values(salesCounters);
  salesChart.update();
}

// Update the chart when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  updateTotalSales();
  initializeChart();
});
