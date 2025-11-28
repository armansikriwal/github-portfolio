// Smooth scrolling for navigation links

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 10,
            behavior: 'smooth'
        });
    });
});

console.log("Portfolio Loaded Successfully");
