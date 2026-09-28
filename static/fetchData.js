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
      throw new Error(
        `Server error: ${response.status} Please try again later.`,
      );
    }
    const data = await response.json();
    return data; // Return the server response if everything is fine
  } catch (error) {
    return error; // Exit the function if there was an error
  }
};
