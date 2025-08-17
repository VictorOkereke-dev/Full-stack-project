let authToken = "";
let userRole = "";

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.getElementById("signupRole").value;

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  });

  const data = await res.json();
  alert(data.message || "Signup successful");
});

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.token) {
    authToken = data.token;
    const decoded = parseJwt(authToken);
    userRole = decoded.role;
    document.querySelector(".auth").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    if (userRole === "admin") {
      document.getElementById("adminPanel").style.display = "block";
    }
    loadInventory();
  } else {
    alert(data.error || "Login failed");
  }
});

document.getElementById("addItemForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("itemName").value;
  const quantity = document.getElementById("itemQty").value;
  const price = document.getElementById("itemPrice").value;

  const res = await fetch("/api/inventory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ name, quantity, price }),
  });

  const data = await res.json();
  alert(data.message || "Item added");
  loadInventory();
  this.reset();
});

async function loadInventory() {
  const res = await fetch("/api/inventory", {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const items = await res.json();
  const list = document.getElementById("inventoryList");
  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Qty: ${item.quantity} - $${item.price}`;
    list.appendChild(li);
  });
}

function parseJwt(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));
  return JSON.parse(jsonPayload);
                                           }
                                                       
