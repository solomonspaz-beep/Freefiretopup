const API_URL = 'https://freefiretopup-hd4w.onrender.com/api/orders';

const paystackLinks = {
  "19999 Diamonds": "https://paystack.shop/pay/tllxmb78ri",
  "31000 Diamonds": "https://paystack.shop/pay/937dw7dkgf",
  "50200 Diamonds": "https://paystack.shop/pay/uh0uz-e0jo",
  "100060 Diamonds": "https://paystack.shop/pay/cmi0magsg5",
  "Proxy Server": "https://paystack.shop/pay/o16akr-2m9"
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
