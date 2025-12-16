
const existingToken = localStorage.getItem("accessToken");

if (existingToken) {
  window.location.href = "/game.html";
}


const API_URL = "http://localhost:8080";

const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const messageEl = document.getElementById("message");

document.getElementById("registerBtn").onclick = async () => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value
    })
  });

  const text = await res.text();
  messageEl.innerText =
    text === "OK" ? "Đăng ký thành công" : "Tài khoản đã tồn tại";
};

document.getElementById("loginBtn").onclick = async () => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value
    })
  });

  const data = await res.json();

  if (!data.success) {
    messageEl.innerText = "Sai tài khoản hoặc mật khẩu";
    return;
  }

  // ✅ LƯU TOKEN
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  // ✅ CHUYỂN VÀO GAME
  window.location.href = "/game.html";
};
