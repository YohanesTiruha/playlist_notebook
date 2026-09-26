export const fetchData = async (e) => {
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
    if (data.warning === null) {
      return data;
    }
    if (data.warning !== null) {
      console.error("Server returned an error:", data.warning);
      return; // Exit the function if the server returned an error
    }
  } catch (error) {
    console.error("Fatal Error fetching data from server:", error);
    return; // Exit the function if there was an error
  }
};
