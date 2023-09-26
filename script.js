// Fetch data from data.js
fetch('data.js')
  .then(response => response.json())
  .then(data => {
    // Populate table with data
    const tableBody = document.querySelector('#purchasing-history tbody');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.date}</td>
        <td>${item.product}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
      `;
      tableBody.appendChild(row);
    });

    // Prepare data for chart
    const chartData = {
      labels: data.map(item => item.product),
      datasets: [{
        label: 'Quantity',
        data: data.map(item => item.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    // Create chart
    const chartCanvas = document.querySelector('#chart');
    new Chart(chartCanvas, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
