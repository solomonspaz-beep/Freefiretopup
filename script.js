const API_URL = 'https://freefiretopup-hd4w.onrender.com/api/orders';

const paystackLinks = {
  "19999 Diamonds": "https://paystack.shop/pay/7y4tcdmmb6",
  "31000 Diamonds": "https://paystack.shop/pay/l1lbo6ex1z",
  "50200 Diamonds": "https://paystack.shop/pay/xlj3u4u4s-",
  "100060 Diamonds": "https://paystack.shop/pay/fe72y10rp5",
  "Proxy Server": "https://paystack.shop/pay/y6jql6u89j"
};

function openForm(packageName) {
  document.getElementById("paymentModal").style.display = "flex";
  document.getElementById("selectedPackage").innerText = "Package: " + packageName;
  localStorage.setItem("currentPackage", packageName);
  
  const uidInput = document.getElementById("uid");
  const phoneInput = document.getElementById("phone");
  const inputLabel = document.getElementById("inputLabel");
  
  // Reset inputs
  uidInput.value = "";
  phoneInput.value = "";
  
  // Show appropriate input based on package type
  if (packageName === "Proxy Server") {
    uidInput.style.display = "none";
    phoneInput.style.display = "block";
    inputLabel.innerHTML = "<strong>Enter your phone number. File will be sent via WhatsApp</strong>";
  } else {
    uidInput.style.display = "block";
    phoneInput.style.display = "none";
    inputLabel.innerHTML = "<strong>Enter your Free Fire UID before paying</strong>";
  }
}

function closeForm() {
  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("message").innerText = "";
  document.getElementById("uid").value = "";
  document.getElementById("phone").value = "";
}

function goToPaystack() {
  const packageName = localStorage.getItem("currentPackage");
  const messageEl = document.getElementById("message");
  
  let userData = {};
  let inputValue = "";
  
  if (packageName === "Proxy Server") {
    inputValue = document.getElementById("phone").value.trim();
    if (!inputValue) {
      messageEl.style.color = "#ff4444";
      messageEl.innerText = "❌ Please enter your phone number";
      return;
    }
    userData = { package: packageName, phone: inputValue };
  } else {
    inputValue = document.getElementById("uid").value.trim();
    if (!inputValue) {
      messageEl.style.color = "#ff4444";
      messageEl.innerText = "❌ Please enter your Free Fire UID";
      return;
    }
    userData = { package: packageName, uid: inputValue };
  }

  // Save to backend
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  // Redirect to Paystack
  window.location.href = paystackLinks[packageName];
}

window.onclick = function(event) {
  const modal = document.getElementById("paymentModal");
  if (event.target === modal) closeForm();
}
