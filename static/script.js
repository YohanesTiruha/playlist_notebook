// Handling the playlist link submission and fetching data from the server
document
  .getElementById("submit-btn-link")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const playlistLink = document.getElementById("playlist-link").value;
    try {
      const response = await fetch("/get-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlist_link: playlistLink }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Response from server:", data);
      // Output the batch of video-links to the HTML DOM
      document
        .getElementsByClassName("result-lists")[0]
        .addEventListener("click", async function (e) {
          if (e.target.classList.contains("result-1")) {
            e.preventDefault();
            await navigator.clipboard.writeText(
              data.batch_of_videos_link[0].join("\n"),
            );
            e.target.textContent = "Copied!";
            setTimeout(() => {
              e.target.textContent = "Copy Batch 1";
            }, 500);
            console.log("Successfully copied Batch 1 to clipboard");
          }
        });
      if (data.warning) {
        console.error("Server returned an error:", data.warning);
        return; // Exit the function if the server returned an error
      }
    } catch (error) {
      console.error("Fatal Error fetching data from server:", error);
      return; // Exit the function if there was an error
    }
  });
