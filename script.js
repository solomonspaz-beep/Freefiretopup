const paystackLinks = {
  "19999 Diamonds": "https://paystack.shop/pay/2vgguivb-0",
  "31000 Diamonds": "https://paystack.shop/pay/1upocwinn8",
  "50200 Diamonds": "https://paystack.shop/pay/yn99sj3byl",
  "100060 Diamonds": "https://paystack.shop/pay/jkx7ko6xd1",
  "Proxy Server": "https://paystack.shop/pay/u222o6e1uo"
};

// DOM Elements cache
const elements = {
  modal: document.getElementById("paymentModal"),
  selectedPackage: document.getElementById("selectedPackage"),
  uid: document.getElementById("uid"),
  phone: document.getElementById("phone"),
  inputLabel: document.getElementById("inputLabel"),
  message: document.getElementById("message")
};

function openForm(packageName) {
  elements.modal.classList.add('active');
  elements.selectedPackage.innerText = `Package: ${packageName}`;
  localStorage.setItem("currentPackage", packageName);
  
  // Reset
  elements.uid.value = "";
  elements.phone.value = "";
  elements.message.innerText = "";
  elements.message.style.color = "";
  
  // Toggle inputs based on package type
  const isProxy = packageName === "Proxy Server";
  
  elements.uid.style.display = isProxy ? "none" : "block";
  elements.phone.style.display = isProxy ? "block" : "none";
  
  elements.inputLabel.innerHTML = isProxy 
    ? "<strong>Enter your phone number. File will be sent via WhatsApp</strong>"
    : "<strong>Enter your Free Fire UID before paying</strong>";
  
  // Focus appropriate input
  setTimeout(() => {
    const targetInput = isProxy ? elements.phone : elements.uid;
    targetInput.focus();
  }, 100);
}

function closeForm() {
  elements.modal.classList.remove('active');
  elements.message.innerText = "";
  elements.uid.value = "";
  elements.phone.value = "";
}

function showMessage(text, isError = false) {
  elements.message.style.color = isError ? "#ef4444" : "#2dd4bf";
  elements.message.innerText = text;
}

function validateInput(value, type) {
  if (!value.trim()) {
    showMessage(`❌ Please enter your ${type}`, true);
    return false;
  }
  
  // Phone validation (basic Nigerian format)
  if (type === "phone number") {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      showMessage("❌ Please enter a valid phone number", true);
      return false;
    }
  }
  
  // UID validation (numeric only)
  if (type === "Free Fire UID") {
    const uidRegex = /^\d+$/;
    if (!uidRegex.test(value.trim())) {
      showMessage("❌ UID must contain only numbers", true);
      return false;
    }
  }
  
  return true;
}

function goToPaystack() {
  const packageName = localStorage.getItem("currentPackage");
  const isProxy = packageName === "Proxy Server";
  
  const inputValue = isProxy 
    ? elements.phone.value.trim() 
    : elements.uid.value.trim();
  
  const inputType = isProxy ? "phone number" : "Free Fire UID";
  
  if (!validateInput(inputValue, inputType)) return;
  
  // Store locally only (no backend)
  const userData = isProxy 
    ? { package: packageName, phone: inputValue, timestamp: new Date().toISOString() }
    : { package: packageName, uid: inputValue, timestamp: new Date().toISOString() };
  
  // Save to localStorage instead of backend
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(userData);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  showMessage("✅ Redirecting to payment...");
  
  // Redirect to Paystack
  setTimeout(() => {
    window.location.href = paystackLinks[packageName];
  }, 500);
}

// Close modal on outside click
window.onclick = function(event) {
  if (event.target === elements.modal) closeForm();
};

// Close on Escape key
window.onkeydown = function(event) {
  if (event.key === 'Escape' && elements.modal.classList.contains('active')) {
    closeForm();
  }
};

// Allow Enter key to submit
elements.uid?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') goToPaystack();
});

elements.phone?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') goToPaystack();
});
