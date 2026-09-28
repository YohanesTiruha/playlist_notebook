import { fetchData } from "./fetchData.js";

// Catching elements from the DOM
const submitBtnLink = document.getElementById("submit-btn-link");
const outputContainer = document.querySelector(".output");
const formContainer = document.querySelector(".form-container");
const resultList = document.querySelector(".result-lists");
const loadingOverlay = document.querySelector(".loading-overlay");
const warningContainer = document.querySelector(".warning-container");
const warningMessage = document.querySelector(".warning-message");

// Hiding the warning container initially
warningContainer.style.display = "none";
// Hiding the loading overlay initially
loadingOverlay.style.display = "none";

// Hiding the container for the result or output initially
outputContainer.style.display = "none";

// Correcting the margin of the formContainer so the footer have appropriate spacing
formContainer.style.marginBottom = "20px";

//function for displaying output and other DOM modifications
const outputDisplayOn = (totalNumberOfBatches) => {
  formContainer.style.marginBottom = "0px";
  outputContainer.style.display = "block";
  if (totalNumberOfBatches === 1) {
    resultList.style.gridTemplateColumns = "1fr";
  } else if (totalNumberOfBatches % 2 !== 0) {
    resultList.lastElementChild.style.gridColumn = "1 / -1";
    resultList.lastElementChild.style.justifySelf = "center";
  } else {
    resultList.style.gridTemplateColumns = "1fr 1fr";
  }
};

// Function for showing the list buttons of each batch of videos
const showCopyButtons = (batch_of_videos_link) => {
  resultList.innerHTML = "";
  batch_of_videos_link.forEach((_, index) => {
    const list = document.createElement("li");
    list.className = `btn result-${index + 1}`;
    list.textContent = `Copy Batch ${index + 1}`;
    resultList.appendChild(list);
  });
};

// function inside copyBatchLinks for handling click events on the result list items
const handleClickEvent = async (batch_of_videos_link) => {
  for (let i = 1; i <= resultList.children.length; i++) {
    resultList.addEventListener("click", async (e) => {
      if (e.target.classList.contains(`result-${i}`)) {
        await navigator.clipboard.writeText(
          batch_of_videos_link[i - 1].join("\n"),
        );
        e.target.textContent = "Copied!";
        setTimeout(() => {
          e.target.textContent = `Copy Batch ${i}`;
        }, 500);
      }
    });
  }
};

// copying the batch links to clipboard when the corresponding button is clicked
const copyBatchLinks = (batch_of_videos_link, resultList) => {
  resultList.addEventListener("click", (e) => {
    e.preventDefault();
    handleClickEvent(batch_of_videos_link);
  });
};
// function for handling warnings from the server response
const handleWarning = (warning) => {
  loadingOverlay.style.display = "none";
  warningContainer.style.display = "flex";
  warningMessage.textContent = warning;
  setTimeout(() => {
    warningContainer.style.display = "none";
    warningMessage.innerHTML = "";
  }, 1700);
};
// Handling the playlist link submission and fetching data from the server
submitBtnLink.addEventListener("click", async (e) => {
  e.preventDefault();
  loadingOverlay.style.display = "flex";
  const data = await fetchData(e);
  if (data instanceof Error) {
    handleWarning(data);
  } else {
    if (data.warning === null) {
      loadingOverlay.style.display = "none";
      outputDisplayOn(data.Total_number_of_batches);
      showCopyButtons(data.batch_of_videos_link);
      copyBatchLinks(data.batch_of_videos_link, resultList);
    }
    if (data.warning !== null) {
      handleWarning(data.warning);
    }
  }
});
