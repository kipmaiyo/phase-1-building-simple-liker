// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
    

document.addEventListener('DOMContentLoaded', () => {
  // Get all the like buttons
  const likeButtons = document.querySelectorAll('.like');

  // Add event listeners to each like button
  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Check if the heart is empty or full
      const heart = button.querySelector('.like-glyph');
      const isLiked = heart.textContent === FULL_HEART;

      // Reset the error modal
      const errorModal = document.getElementById('modal');
      errorModal.classList.add('hidden');
      const errorMessage = document.getElementById('modal-message');
      errorMessage.textContent = '';

      // Simulate server request using mimicServerCall
      mimicServerCall()
        .then(() => {
          // Server request successful
          if (isLiked) {
            // If already liked, remove full heart and activated class
            heart.textContent = EMPTY_HEART;
            heart.classList.remove('activated-heart');
          } else {
            // If not liked, set full heart and add activated class
            heart.textContent = FULL_HEART;
            heart.classList.add('activated-heart');
          }
        })
        .catch(error => {
          // Server request failed
          errorMessage.textContent = error;
          errorModal.classList.remove('hidden');
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    });
  });
}); 



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
