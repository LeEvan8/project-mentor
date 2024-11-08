// First, add these CSP headers in your server configuration or meta tag
// Content-Security-Policy: script-src 'self' 'nonce-RandomNonceHere' 'https://cdnjs.cloudflare.com'; style-src 'self' 'unsafe-inline';

// Navigation - using proper event delegation for better performance
const handleNavigation = (e) => {
    const link = e.target.closest('.nav-link');
    if (!link) return;

    e.preventDefault();
    const targetId = link.getAttribute('href')?.substring(1);
    if (!targetId) return;

    // Safely query and update sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
};

// Use event delegation on the navigation container
const navContainer = document.querySelector('.nav-container');
if (navContainer) {
    navContainer.addEventListener('click', handleNavigation);
}

// Form handling with input validation
const handleFormSubmission = (e) => {
    e.preventDefault();
    
    // Basic form validation
    const form = e.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    
    // Add your validation logic here
    const isValid = validateForm(formObject);
    
    if (isValid) {
        // Use a custom modal instead of alert for better security
        showCustomModal('Application submitted successfully!');
        form.reset();
    }
};

const validateForm = (data) => {
    // Add your validation rules here
    return true; // Replace with actual validation
};

const showCustomModal = (message) => {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
};

const form = document.getElementById('application-form');
if (form) {
    form.addEventListener('submit', handleFormSubmission);
}

// Timeline animation using GSAP
// Make sure to load GSAP from a trusted CDN with integrity hash
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" 
//         integrity="sha384-[ADD-YOUR-HASH-HERE]" 
//         crossorigin="anonymous"></script>

const initializeTimelineAnimation = () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Timeline animation disabled.');
        return;
    }

    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    try {
        gsap.from('.timeline-item', {
            duration: 1,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center'
            },
            onError: (err) => {
                console.error('Animation error:', err);
                // Fallback to basic display
                timelineItems.forEach(item => {
                    item.style.opacity = 1;
                    item.style.transform = 'none';
                });
            }
        });
    } catch (error) {
        console.error('Error initializing timeline animation:', error);
        // Ensure content is visible even if animation fails
        timelineItems.forEach(item => {
            item.style.opacity = 1;
            item.style.transform = 'none';
        });
    }
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeTimelineAnimation();
});