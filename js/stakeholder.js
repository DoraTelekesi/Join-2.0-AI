function initStakeholder() {
  getUsageData();
}

let limitReached = false;

/**
 * Fetches usage data from the database.
 * @async
 * @returns {Promise<Object>} The usage data as a JSON object.
 */
async function getUsageData() {
  try {
    let response = await fetch(BASE_URL + "usage.json");
    if (!response.ok) throw new Error("Usage request failed");
    let responseToJson = await response.json();
    updateUsageData(responseToJson);
    updateUsageHTMLColor(responseToJson);
    updateStakePage();
    return responseToJson;
  } catch (e) {
    console.error(e);
    limitReached = false;
  } finally {
    document.body.classList.remove("stakeholder-loading");
    document.getElementById("stake-content-root")?.removeAttribute("aria-hidden");
  }
}

/**
 * Updates the usage data on the page.
 * @param {Object} usageData - The usage data to update.
 */
function updateUsageData(usageData) {
  document.getElementById("used-requests").textContent = usageData.dailyAiRequestsUsed;
}

/**
 * Updates the usage data HTML color on the page.
 * @param {Object} usageData - The usage data to update.
 */
function updateUsageHTMLColor(usageData) {
  if (usageData.dailyAiRequestsUsed < usageData.dailyAiRequestsLimit) {
    document.getElementById("usage-data").style.color = "#29abe2";
    limitReached = false;
  }
  if (usageData.dailyAiRequestsUsed === usageData.dailyAiRequestsLimit) {
    document.getElementById("usage-data").style.color = "#FF3D00";
    limitReached = true;
  }
}

/**
 * Updates the stake page content.
 */
function updateStakePage() {
  if (limitReached) {
    document.getElementById("stake-img").src = "./assets/img/board-stake-limit-reached.png";
    document.getElementById("stake-img-resp").src = "./assets/img/board-stake-limit-reached.png";
    document.getElementById("stake-text-title").innerHTML =
      "<h5 class='limit-title' style='padding: 20px 15px; margin: 0;'>The daily 10-request limit has been reached.</h5>";
    document.getElementById("stake-text-title").style.backgroundColor = "#FFD2D285";
    document.getElementById("stake-text-title").style.borderRadius = "10px";
    document.getElementById("stake-text-content").innerHTML =
      "<p class='limit-text'>Need more? No worries — you can still send emails, but our team will review them manually instead of using AI to create tickets.</p>";
    document.getElementById("create-email-request-btn-text").textContent = "Send an email";
  }
}
