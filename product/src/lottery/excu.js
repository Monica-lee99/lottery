// 密码可见性切换
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const strengthPercentage = document.getElementById("strengthPercentage");
const enter = document.getElementById("enter");

enter.style.display = "none";



togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // 切换图标
  this.querySelector("i").classList.toggle("fa-eye");
  this.querySelector("i").classList.toggle("fa-eye-slash");

  // 添加动画效果
  this.classList.add("scale-110");
  setTimeout(() => this.classList.remove("scale-110"), 200);
});

// 密码强度检测
passwordInput.addEventListener("input", function () {
  const password = this.value;
  let strength = 0;
  let strengthClass = "bg-danger";
  let strengthLabel = "弱";

  // 密码长度检测
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 10;

  // 包含小写字母
  if (/[a-z]/.test(password)) strength += 15;

  // 包含大写字母
  if (/[A-Z]/.test(password)) strength += 15;

  // 包含数字
  if (/[0-9]/.test(password)) strength += 15;

  // 包含特殊字符
  if (/[^A-Za-z0-9]/.test(password)) strength += 20;

  // 组合检测
  const charTypes =
    (/\d/.test(password) ? 1 : 0) +
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0);

  if (charTypes >= 3) strength += 15;

  // 设置强度条样式
  if (strength >= 80) {
    strengthClass = "bg-success";
    strengthLabel = "强";
  } else if (strength >= 50) {
    strengthClass = "bg-warning";
    strengthLabel = "中";
  } else {
    strengthClass = "bg-danger";
    strengthLabel = "弱";
  }

  // 更新UI
  strengthBar.className = `password-strength-bar ${strengthClass}`;
  strengthBar.style.width = `${strength}%`;
  strengthText.textContent = `密码强度: ${strengthLabel}`;
  strengthPercentage.textContent = `${strength}%`;

  // 添加动画效果
  if (strength > 0) {
    strengthBar.classList.add("animate-pulse");
    setTimeout(() => strengthBar.classList.remove("animate-pulse"), 500);
  }
});
const submitButton = document.querySelector(".submit-button");
// 表单提交处理
submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  // 获取表单数据
  const formData = {
    username: document.getElementById("username").value,
    password: passwordInput.value,
  };

  // 显示加载状态

  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin mr-2"></i> 登录中...';

  // 模拟登录请求 (2秒后)
  setTimeout(() => {
    // 恢复按钮状态
    if (formData.username === "dds" && formData.password === "sssz17") {
      enter.style.display = "inline-block";
      const form = document.querySelector("#formInstance");
      if (form) form.style.display = "none";
      window._initAll();
      alert("登录成功！欢迎回来，" + formData.username);

    } else {
      alert("登录失败，请检查用户名和密码");
    }
    submitButton.disabled = false;
    submitButton.innerHTML = "登录";

    // 显示成功消息 (实际应用中应替换为真实的登录逻辑)
  }, 1000);
});
