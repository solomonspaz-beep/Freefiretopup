// Get package from URL
const params = new URLSearchParams(window.location.search);
const selectedPackage = params.get("pkg");

if (selectedPackage) {
  document.getElementById("package").value = selectedPackage;
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const uid = document.getElementById("uid").value;
  const email = document.getElementById("email").value;

  document.getElementById("message").innerText =
    "Order received! We will contact you shortly.";

  console.log("Package:", selectedPackage);
  console.log("UID:", uid);
  console.log("Email:", email);
});