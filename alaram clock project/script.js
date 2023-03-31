// Get HTML elements
const clock = document.querySelector('.clock');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const amPmSelect = document.getElementById('ampm');
const setAlarmBtn = document.getElementById('set-alarm');
const cancelAlarmBtn = document.getElementById('cancel-alarm');
const alarmTime = document.querySelector('.alarm-time');

// Set the alarm sound
const alarmSound = new Audio('alarm.mp3');

// Update the clock
function updateClock() {
  const now = new Date();

  // Get the current time in 12-hour format
  let hour = now.getHours();
  let amPm = 'AM';
  if (hour > 12) {
    hour = hour % 12;
    amPm = 'PM';
  }

  // Add leading zeros to minutes and seconds
  let minute = now.getMinutes().toString().padStart(2, '0');
  let second = now.getSeconds().toString().padStart(2, '0');

  // Set the clock text and AM/PM indicator
  clock.textContent = `${hour}:${minute}:${second}`;
  amPmSelect.value = amPm;

  // Check if the current time matches the alarm time
  if (alarmTime.textContent === clock.textContent) {
    // Play the alarm sound
    alarmSound.play();

    // Disable the "Cancel Alarm" button
    cancelAlarmBtn.disabled = true;

    // Change the background color of the alarm message
    alarmTime.style.backgroundColor = '#FF4136';
  }

  // Request a new animation frame
  requestAnimationFrame(updateClock);
}

// Initialize the clock
updateClock();

// Set the alarm
setAlarmBtn.addEventListener('click', () => {
  // Get the selected hour, minute, and AM/PM
  let hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const amPm = amPmSelect.value;

  // Convert the hour to 24-hour format if necessary
  if (amPm === 'PM' && hour < 12) {
    hour += 12;
  }

  // Add leading zeros to hour and minute
  hour = hour.toString().padStart(2, '0');
  const minuteStr = minute.toString().padStart(2, '0');

  // Set the alarm time and enable the "Cancel Alarm" button
  alarmTime.textContent = `${hour}:${minuteStr}:00 ${amPm}`;
  cancelAlarmBtn.disabled = false;

  // Change the background color of the alarm message
  alarmTime.style.backgroundColor = '#2ECC40';
});

// Cancel the alarm
cancelAlarmBtn.addEventListener('click', () => {
  // Stop the alarm sound
  alarmSound.pause();
  alarmSound.currentTime = 0;

  // Clear the alarm time and disable the "Cancel Alarm" button
  alarmTime.textContent = '';
  cancelAlarmBtn.disabled = true;

  // Change the background color of the alarm message
  alarmTime.style.backgroundColor = '#fff';
});
