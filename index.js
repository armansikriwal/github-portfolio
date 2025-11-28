// Navigation toggle (mobile)
// Theme toggle (persist in localStorage)
const themeToggle = document.getElementById('theme-toggle');
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light') document.body.classList.add('light-theme');
else if(!savedTheme && prefersLight) document.body.classList.add('light-theme');


themeToggle?.addEventListener('click', () => {
document.body.classList.toggle('light-theme');
const nowLight = document.body.classList.contains('light-theme');
localStorage.setItem('theme', nowLight ? 'light' : 'dark');
themeToggle.textContent = nowLight ? '🌞' : '🌙';
});


// lazy-loading images (data-src attr)
const lazyImages = document.querySelectorAll('img.lazy');
if('IntersectionObserver' in window){
const imgObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if(entry.isIntersecting){
const img = entry.target;
img.src = img.dataset.src;
img.classList.remove('lazy');
observer.unobserve(img);
}
});
},{rootMargin: '50px 0px'});
lazyImages.forEach(img => imgObserver.observe(img));
} else {
lazyImages.forEach(img => img.src = img.dataset.src);
}


// scroll reveal for .reveal and .reveal-card
const revealEls = document.querySelectorAll('.reveal');
const revealCardEls = document.querySelectorAll('.reveal-card');
if('IntersectionObserver' in window){
const revealObserver = new IntersectionObserver((entries, obs) =>{
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add('revealed');
obs.unobserve(entry.target);
}
});
},{threshold:0.12});
revealEls.forEach(el => revealObserver.observe(el));
revealCardEls.forEach(el => revealObserver.observe(el));
} else {
revealEls.forEach(el => el.classList.add('revealed'));
revealCardEls.forEach(el => el.classList.add('revealed-card'));
}


// footer year
document.getElementById('year').textContent = new Date().getFullYear();


// small accessibility helpers
// add focus ring for keyboard navigation
document.addEventListener('keydown', (e)=>{
if(e.key === 'Tab') document.body.classList.add('show-focus');
});




/* End of bundle */