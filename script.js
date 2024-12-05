// script.js

// Log to confirm script is loaded
console.log('Script loaded successfully.');

// Function to get today's date string in YYYY-MM-DD format for consistency
function getTodayStr() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var day = String(today.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day; // e.g., "2024-12-05"
}

// Function to initialize order count
function initializeOrderCount() {
  // Start from 0 for simulation
  var orderCount = 0;
  console.log('Initializing order count to:', orderCount);
  return orderCount;
}

// Function to update the order count in the HTML with animation
function updateOrderCountDisplay(orderCount) {
  var orderCountElement = document.getElementById('orderCount');
  if (orderCountElement) {
    // Add class to trigger animation
    orderCountElement.classList.add('updating');

    // Update the text after a short delay to allow animation
    setTimeout(function() {
      orderCountElement.textContent = orderCount;
      orderCountElement.classList.remove('updating');
      console.log('Order count updated in HTML:', orderCount);
    }, 300); // Adjust the delay as needed
  } else {
    console.error('Element with id "orderCount" not found.');
  }
}

// Function to append a new order message to the recent orders list
function appendOrderMessage(location) {
  var ordersList = document.getElementById('ordersList');
  var recentOrdersSection = document.getElementById('recentOrders');

  if (ordersList && recentOrdersSection) {
    // Create a new list item
    var li = document.createElement('li');
    li.textContent = '🛒 New Order from ' + location;

    // Append the new order message at the top
    ordersList.insertBefore(li, ordersList.firstChild); // Newest orders at the top

    // Limit to latest 10 orders
    while (ordersList.children.length > 10) {
      ordersList.removeChild(ordersList.lastChild);
    }

    // Show the recent orders section if not already visible
    if (!recentOrdersSection.classList.contains('active')) {
      recentOrdersSection.classList.add('active');
    }
  } else {
    console.error('Recent Orders elements not found.');
  }
}

// Function to get a random location
function getRandomLocation() {
  var orderLocations = [
    'Houston, Texas 77018',
    'Tuttle, Oklahoma 73089',
    'San Antonio, Texas 78210',
    'Bells, Texas 75414',
    'Corinth, Texas 76210',
    'Haltom City, Texas 76137',
    'Arlington, Texas 76001',
    'Fort Worth, Texas 76116',
    'San Antonio, Texas 78209',
    'San Antonio, Texas 78232',
    'Waco, Texas 76798-2852',
    'Austin, Texas 73301',
    'Dallas, Texas 75201',
    'El Paso, Texas 79901',
    'Lubbock, Texas 79401',
    'Amarillo, Texas 79101',
    'Tulsa, Oklahoma 74101',
    'Baton Rouge, Louisiana 70801',
    'Little Rock, Arkansas 72201',
    'Albuquerque, New Mexico 87101',
    'Los Angeles, California 90001',
    'San Diego, California 92101'
  ];

  return orderLocations[Math.floor(Math.random() * orderLocations.length)];
}

// Function to simulate new orders at random intervals
function simulateLiveOrders(currentCount, maxOrders) {
  if (currentCount >= maxOrders) {
    console.log('Maximum orders reached for today.');
    return;
  }

  // Define the range for random intervals (e.g., 5 to 30 seconds)
  var minInterval = 5000; // 5 seconds
  var maxInterval = 30000; // 30 seconds
  var nextOrderIn = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

  setTimeout(function() {
    // Increment order count
    var newCount = currentCount + 1;
    updateOrderCountDisplay(newCount);
    appendOrderMessage(getRandomLocation());
    console.log('Simulated new order. Total orders today:', newCount);

    // Continue simulation
    simulateLiveOrders(newCount, maxOrders);
  }, nextOrderIn);
}

// Initialize and update order count after DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  var orderCount = initializeOrderCount();
  updateOrderCountDisplay(orderCount);

  // Start simulating live orders
  var maxOrdersPerDay = 10; // Set maximum number of simulated orders per day
  simulateLiveOrders(orderCount, maxOrdersPerDay);
});
