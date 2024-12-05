// Calculate days until Christmas
var today = new Date();
var year = today.getFullYear();
var christmas = new Date(year, 11, 25); // Months are zero-indexed (11 = December)
if (today > christmas) {
  christmas.setFullYear(year + 1);
}
var diffTime = christmas - today; // Difference in milliseconds
var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

// Simulate order count increasing as Christmas approaches
var maxOrders = 1000;
var minOrders = 100;
var totalDays = 60; // Adjust this value as needed

var orderCount;

if (diffDays > totalDays) {
  orderCount = minOrders;
} else {
  orderCount = Math.floor(
    minOrders + ((maxOrders - minOrders) * (totalDays - diffDays)) / totalDays
  );
}

document.getElementById('orderCount').textContent = orderCount;

// Optional: Make snowflakes reappear from the top after they fall
var snowflakes = document.getElementsByClassName('snowflake');
for (var i = 0; i < snowflakes.length; i++) {
  snowflakes[i].addEventListener('animationiteration', function() {
    this.style.left = Math.random() * 100 + '%';
    this.style.fontSize = (Math.random() * 10 + 15) + 'px';
    this.style.animationDuration = (Math.random() * 5 + 7) + 's';
  });
}

// Popup Notifications
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

var popupCount = 0;

function showPopup() {
  var popup = document.getElementById('popup');
  var popupMessage = document.getElementById('popupMessage');

  // Select a random location
  var location = orderLocations[Math.floor(Math.random() * orderLocations.length)];

  // Determine the message
  if (popupCount >= 3) {
    popupMessage.innerHTML = '🔥 Hot Product! Many are ordering now!';
  } else {
    popupMessage.innerHTML = '🛒 New Order from ' + location;
  }

  // Show the popup
  popup.style.display = 'block';
  popup.style.animation = 'slideIn 0.5s forwards';

  // Hide the popup after 5 seconds
  setTimeout(function() {
    popup.style.animation = 'slideOut 0.5s forwards';
    setTimeout(function() {
      popup.style.display = 'none';
    }, 500);
  }, 5000);

  popupCount++;

  // Schedule the next popup
  var nextInterval;
  if (popupCount < 3) {
    nextInterval = 60000; // Every 1 minute
  } else if (popupCount < 5) {
    nextInterval = 120000; // Every 2 minutes
  } else if (popupCount < 10) {
    nextInterval = 300000; // Every 5 minutes
  } else {
    return; // Stop after 10 pop-ups
  }

  setTimeout(showPopup, nextInterval);
}

// Start the first popup after 1 minute
setTimeout(showPopup, 60000);
