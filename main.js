// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger?.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.textContent = nav.classList.contains('active') ? '✕' : '☰';
    hamburger.setAttribute('aria-expanded', nav.classList.contains('active'));
});



// Scroll Animations
const fadeIns = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeIns.forEach(element => observer.observe(element));

// Font Awesome for Social Icons (replace with actual CDN in production)
const fontAwesome = document.createElement('script');
fontAwesome.src = 'https://kit.fontawesome.com/a076d05399.js';
document.head.appendChild(fontAwesome);

// Fare Estimator Functionality
document.getElementById('estimate-btn')?.addEventListener('click', function() {
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const fareResult = document.getElementById('fare-result');
    
    if (!pickup || !dropoff) {
        fareResult.textContent = 'Please enter both locations';
        fareResult.style.color = '#ff3d00';
    } else {
        // Simulate fare calculation (in a real app, this would call an API)
        const baseFare = 5.00;
        const distanceRate = 1.50;
        const randomDistance = Math.floor(Math.random() * 10) + 1;
        const estimatedFare = (baseFare + (distanceRate * randomDistance)).toFixed(2);
        
        fareResult.innerHTML = `
            <div class="fare-breakdown">
                <p>Estimated Fare: <span class="fare-amount">\u20B9${estimatedFare}</span></p>
                <small>For ${randomDistance} KMs from ${pickup} to ${dropoff}</small>
            </div>
        `;
        fareResult.style.color = '#333';
    }
    
    fareResult.classList.add('show');
    
    // Hide after 10 seconds (optional)
    setTimeout(() => {
        fareResult.classList.remove('show');
    }, 10000);
});

// Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || "New Contact Form Submission";
    const message = document.getElementById('message').value.trim();

    // Create mailto link
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    
    const mailtoLink = `mailto:ridewave042025@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(10px)';
        
        // Animate the success message
        setTimeout(() => {
            successMessage.style.transition = 'all 0.3s ease';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 100);

        // Clear form fields
        this.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }
});



// Join RideWave Toggle Functionality
const rideBtn = document.getElementById('ride-btn');
const driveBtn = document.getElementById('drive-btn');
const rideContent = document.getElementById('ride-content');
const driveContent = document.getElementById('drive-content');

rideBtn?.addEventListener('click', () => {
    rideBtn.classList.add('active');
    driveBtn.classList.remove('active');
    rideContent.style.display = 'block';
    driveContent.style.display = 'none';
});

driveBtn?.addEventListener('click', () => {
    driveBtn.classList.add('active');
    rideBtn.classList.remove('active');
    driveContent.style.display = 'block';
    rideContent.style.display = 'none';
});

