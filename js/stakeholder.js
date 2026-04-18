function initStakeholder() {
  getUsageData();
}

/**
 * Fetches usage data from the database.
 * @async
 * @returns {Promise<Object>} The usage data as a JSON object.
 */
async function getUsageData() {
  let response = await fetch(BASE_URL + "usage.json");
  let responseToJson = await response.json();
  console.log(responseToJson);
  updateUsageData(responseToJson);
  return responseToJson;
}

/**
 * Updates the usage data on the page.
 * @param {Object} usageData - The usage data to update.
 */
function updateUsageData(usageData) {
  console.log(usageData.dailyAiRequestsUsed);
  document.getElementById("used-requests").textContent = usageData.dailyAiRequestsUsed;
}
