// script.js

// Log to confirm script is loaded
console.log('Script loaded successfully.');

// Function to get today's date string
function getTodayStr() {
  var today = new Date();
  return today.toDateString(); // e.g., "Thu Dec 05 2024"
}

// Function to initialize or update order count
function initializeOrderCount() {
  var storedCount = localStorage.getItem('orderCount');
  var lastVisit = localStorage.getItem('lastVisit');
  var todayStr = getTodayStr();

  var initialOrders = 3; // Starting with 3 orders
  var maxOrdersPerDay = 10; // Maximum 10 orders per day

  if (lastVisit === todayStr) {
    // If already visited today, retain the stored count
    var orderCount = parseInt(storedCount, 10);
    console.log('Returning order count for today:', orderCount);
    return orderCount;
  } else {
    // If it's a new day, reset or increment the count
    var orderCount = initialOrders;
    if (storedCount) {
      // Increment by a random number to simulate real orders, ensuring it doesn't exceed maxOrdersPerDay
      var increment = Math.floor(Math.random() * 3) + 1; // Increment by 1 to 3
      orderCount = Math.min(parseInt(storedCount, 10) + increment, maxOrdersPerDay);
      console.log('New day detected. Incrementing order count to:', orderCount);
    } else {
      console.log('First-time visit. Setting order count to:', orderCount);
    }

    // Update localStorage
    localStorage.setItem('orderCount', orderCount);
    localStorage.setItem('lastVisit', todayStr);

    return orderCount;
  }
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

    // Show the recent orders section
    recentOrdersSection.classList.add('active');
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

// Initialize and update order count after DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  var orderCount = initializeOrderCount();
  updateOrderCountDisplay(orderCount);

  // Simulate existing orders based on the current order count
  for (var i = 0; i < orderCount; i++) {
    appendOrderMessage(getRandomLocation());
  }

  // Optional: Automate new order simulation throughout the day
  // For demonstration, simulate a new order every hour (3600000 ms)
  // You can adjust the interval as needed
  /*
  setInterval(function() {
    var currentCount = parseInt(localStorage.getItem('orderCount'), 10);
    if (currentCount < 10) {
      var newCount = currentCount + 1;
      localStorage.setItem('orderCount', newCount);
      updateOrderCountDisplay(newCount);
      appendOrderMessage(getRandomLocation());
      console.log('Simulated new order. Total orders today:', newCount);
    } else {
      console.log('Maximum orders reached for today.');
    }
  }, 3600000); // Every hour
  */
});
