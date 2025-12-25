
const hamburger = document.querySelector('.hamburger-icon');
const menu = document.querySelector('.hamburger-area');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

function scrollHandler(btnClass, sectionId) {
    document.querySelectorAll(btnClass).forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
            menu.classList.remove('active');
        });
    });
}

scrollHandler('.homeBtn', 'homeArea');
scrollHandler('.guideBtn', 'guideArea');
scrollHandler('.aboutBtn', 'aboutArea');
scrollHandler('.ppBtn', 'ppArea');
scrollHandler('.contactBtn', 'contactArea');



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


 const downloadBtn = document.querySelector('#downloadBtn')
 downloadBtn.addEventListener("click", async () => {
   const inputValue = document.getElementById("myInput").value.trim();
   if (!inputValue) {
     alert("Please paste a YouTube video link first!");
     return;
   }

   const videoURL = await getVideoData(inputValue);
   if (videoURL) window.open(videoURL, "_blank");
 });