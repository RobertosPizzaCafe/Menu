document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, 100); // Adjust the delay as needed
});

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
