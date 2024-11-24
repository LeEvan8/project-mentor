// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// Form handling
document.getElementById('application-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Application submitted successfully!');
});

// Timeline animation
gsap.from('.timeline-item', {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top center'
    }
});

