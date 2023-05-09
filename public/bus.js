// Add a hover effect to the card
const card = document.querySelector('.card');
card.addEventListener('mouseenter', () => {
  card.style.transform = 'scale(1.05)';
  card.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'scale(1)';
  card.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
});


function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
}