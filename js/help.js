/**
 * Initializes the help page by displaying logged-in user information.
 */
async function init() {
  await showLoggedInInfo();
}

/**
 * Toggles the visibility of the submenu.
 */
function showSubMenu() {
  if (document.getElementById("subMenu").classList.contains("dp-none")) {
    document.getElementById("subMenu").classList.remove("dp-none");
    document.getElementById("subMenu").innerHTML = `
                  <a href="./privacy-policy.html"><div class="subMenu-btns">Privacy Policy</div></a>
                  <a href="./legal-notice.html"><div class="subMenu-btns">Legal Notice</div></a>
                  <a href="#"><div class="subMenu-btns">Log Out</div></a>`;
  } else {
    document.getElementById("subMenu").classList.add("dp-none");
  }
}

/**
 * Closes the submenu if it is visible.
 */
function closeSubMenu() {
  if (!document.getElementById("subMenu").classList.contains("dp-none")) {
    document.getElementById("subMenu").classList.add("dp-none");
  }
}

/**
 * Displays logged-in user information.
 */
async function showLoggedInInfo() {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  if (loginInfo.isGuest === true) {
    document.getElementById("initialLetter").innerHTML = "G";
  } else {
    document.getElementById("initialLetter").innerHTML = loginInfo.userLoggedIn.avatar;
  }
}
