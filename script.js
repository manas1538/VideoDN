const hamburger = document.querySelector('.hamburgur-icon');
const navMenu = document.querySelector('.header-items-container ul');
const homeBtn = document.getElementById("home");
const contactBtn = document.getElementById("contact");
const aboutBtn = document.getElementById("about");
const btn = document.getElementById("btn");

homeBtn.addEventListener("click", () => {
  document.getElementById("homeArea").scrollIntoView({
    behavior: "smooth"
  });
});

aboutBtn.addEventListener("click", () => {
  document.getElementById("aboutArea").scrollIntoView({
    behavior: "smooth"
  });
});

contactBtn.addEventListener("click", () => {
  document.getElementById("footer").scrollIntoView({
    behavior: "smooth"
  });
});


hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});




function getYouTubeID(url) {
  if (!url || typeof url !== "string") {
    console.error("Invalid URL provided to getYouTubeID");
    return null;
  }

  const match = url.match(/v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return match ? match[1] : null;
}

async function getVideoData(link) {
  const inputValue = link.trim();

  if (!inputValue) {
    alert("Please enter a YouTube video link first!");
    return;
  }

  const id = getYouTubeID(inputValue);
  if (!id) {
    alert("Could not extract video ID. Please check your link.");
    return;
  }

  const url = `https://yt-api.p.rapidapi.com/dl?id=${id}&cgeo=DE`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "22492f9a38mshf88368c375d32f0p14a960jsnd022f74748bf",
      "x-rapidapi-host": "yt-api.p.rapidapi.com"
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();



    console.log("Fetched Data:", data);

    const formats = data.formats || data.adaptiveFormats || [];

    if (formats.length === 0) {
      console.warn("No formats found in API response.");
      return;
    }
    const firstValid = formats.find(f => f.url);
    if (firstValid) {
      return firstValid.url;
    }



  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


btn.addEventListener("click", async () => {
  const inputValue = document.getElementById("myInput").value.trim();
  if (!inputValue) {
    alert("Please paste a YouTube video link first!");
    return;
  }

  const videoURL = await getVideoData(inputValue);
  if (videoURL) window.open(videoURL, "_blank");
});









