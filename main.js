// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger.addEventListener('click', () => {
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
document.getElementById('estimate-btn').addEventListener('click', function() {
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
document.getElementById('contactForm').addEventListener('submit', function(e) {
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

rideBtn.addEventListener('click', () => {
    rideBtn.classList.add('active');
    driveBtn.classList.remove('active');
    rideContent.style.display = 'block';
    driveContent.style.display = 'none';
});

driveBtn.addEventListener('click', () => {
    driveBtn.classList.add('active');
    rideBtn.classList.remove('active');
    driveContent.style.display = 'block';
    rideContent.style.display = 'none';
});

// Welcome Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('welcomePopup');
    const closeBtn = document.getElementById('closePopup');
    
    // Show popup after 3 seconds
    setTimeout(() => {
        popup.classList.add('show');
        
        // Add extra confetti particles dynamically
        createConfettiParticles();
        
        // Play celebration sound (optional - you can add this later)
        // playCelebrationSound();
        
    }, 1000);
    
    // Close popup when close button is clicked
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    });
    
    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    });
});

// Create enhanced confetti particles and celebration effects
function createConfettiParticles() {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#ff8a00', '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00d4aa', '#ff6b6b'];
    const shapes = ['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🎁', '🏆'];
    
    // Create colorful particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 12 + 6 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-20px';
        particle.style.borderRadius = Math.random() > 0.3 ? '50%' : '0';
        particle.style.animation = `confettiFall ${Math.random() * 3 + 3}s linear forwards`;
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
        particle.style.zIndex = '15';
        
        confettiContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create emoji particles
    for (let i = 0; i < 15; i++) {
        const emojiParticle = document.createElement('div');
        emojiParticle.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        emojiParticle.style.position = 'absolute';
        emojiParticle.style.fontSize = Math.random() * 20 + 15 + 'px';
        emojiParticle.style.left = Math.random() * 100 + '%';
        emojiParticle.style.top = '-30px';
        emojiParticle.style.animation = `confettiFall ${Math.random() * 4 + 4}s linear forwards`;
        emojiParticle.style.animationDelay = Math.random() * 2 + 's';
        emojiParticle.style.zIndex = '20';
        
        confettiContainer.appendChild(emojiParticle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (emojiParticle.parentNode) {
                emojiParticle.parentNode.removeChild(emojiParticle);
            }
        }, 8000);
    }
    
    // Create floating bubbles
    createFloatingBubbles();
    
    // Create sparkle effects
    createSparkleEffects();
}

// Create floating bubbles
function createFloatingBubbles() {
    const popup = document.querySelector('.popup-content');
    
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.style.position = 'absolute';
        bubble.style.width = Math.random() * 30 + 10 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.background = 'rgba(255, 255, 255, 0.3)';
        bubble.style.borderRadius = '50%';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = '-50px';
        bubble.style.animation = `bubbleFloat ${Math.random() * 4 + 6}s ease-in-out infinite`;
        bubble.style.animationDelay = Math.random() * 3 + 's';
        bubble.style.backdropFilter = 'blur(2px)';
        bubble.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        bubble.style.zIndex = '5';
        
        popup.appendChild(bubble);
        
        // Remove bubble after some time
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 10000);
    }
}

// Create sparkle effects around the logo
function createSparkleEffects() {
    const logoContainer = document.querySelector('.logo-container');
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.color = '#ff8a00';
        sparkle.style.left = Math.random() * 200 - 100 + 'px';
        sparkle.style.top = Math.random() * 200 - 100 + 'px';
        sparkle.style.animation = `sparkleFloat ${Math.random() * 2 + 2}s ease-in-out infinite`;
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.zIndex = '25';
        sparkle.style.pointerEvents = 'none';
        
        logoContainer.appendChild(sparkle);
        
        // Remove sparkle after some time
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 8000);
    }
}

// Optional: Add celebration sound function (you can implement this later)
function playCelebrationSound() {
    // You can add audio here if needed
    // const audio = new Audio('path/to/celebration-sound.mp3');
    // audio.play().catch(e => console.log('Audio play failed:', e));
}

