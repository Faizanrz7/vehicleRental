const fromDate = document.getElementById('pickup-date');
const toDate = document.getElementById('drop-date');
const numDays = document.getElementById('count');
// const price= document.getElementById('v-price');
const total2 = document.getElementById('result');

// Listen for changes in the date fields
fromDate.addEventListener('input', updateNumDays);
toDate.addEventListener('input', updateNumDays);

function updateNumDays() {
  const fromValue = new Date(fromDate.value);
  const toValue = new Date(toDate.value);

  // Ensure that the From date is not greater than the To date
  if (fromValue > toValue) {
    alert("From date should not be greater than to date");
    return;
  }

  // Calculate the difference in milliseconds between the two dates
  const differenceInMs = toValue.getTime() - fromValue.getTime();
  // Convert the difference to days and round down to the nearest integer
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24)) + 1;

  
  // Display the result
  numDays.value = differenceInDays;
  total2.value = differenceInDays * 300;
}



