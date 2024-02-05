document.addEventListener("DOMContentLoaded", function () {
    const titleForm = document.getElementById('titleForm');
    const artistForm = document.getElementById('artistForm');
    const addButton = document.getElementById('addButton');
    const songContainer = document.getElementById('songContainer');

    addButton.addEventListener('click', function () {
        const title = titleForm.querySelector('.input-field').value;
        const artist = artistForm.querySelector('.input-field').value;

        if (title && artist) {
           
            const songBox = document.createElement('div');
            songBox.className = 'song-box';

           
            const songNameElement = document.createElement('div');
            songNameElement.className = 'song-name';
            songNameElement.textContent = title;

            const artistNameElement = document.createElement('div');
            artistNameElement.className = 'artist-name';
            artistNameElement.textContent = artist;

        
            songBox.appendChild(songNameElement);
            songBox.appendChild(artistNameElement);

         
            songContainer.appendChild(songBox);

          
            titleForm.reset();
            artistForm.reset();
        }
    });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            
        })
        .catch((error) => {

        });
} else {
}