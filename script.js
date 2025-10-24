// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}));

// Dropdown: open on hover desktop (handled by CSS), toggle on click in mobile
document.querySelectorAll('.nav-item.dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            e.preventDefault();
            const parent = link.parentElement;
            const open = parent.classList.contains('open');
            // close others
            document.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
            if (!open) parent.classList.add('open');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// CTA Button scroll to gallery
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contact = document.querySelector('#contact');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If no contact section on this page, go to homepage contact
            window.location.href = 'index.html#contact';
        }
    });
}

// All "Pyydä ilmainen tarjous" and similar buttons scroll to contact
document.querySelectorAll('button, a').forEach(element => {
    const text = element.textContent.toLowerCase();
    if (text.includes('pyydä') && (text.includes('tarjous') || text.includes('ilmainen'))) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.gallery-item, .service-card, .about-text, .contact-info');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone') || 'Ei annettu';
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !service || !message) {
        alert('Täytä kaikki pakolliset kentät!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Anna kelvollinen sähköpostiosoite!');
        return;
    }
    
    // Create email content
    const recipient = 'topejar@gmail.com';
    const subject = encodeURIComponent(`Tarjouspyyntö: ${service}`);
    const body = encodeURIComponent(
        `Uusi yhteydenottopyyntö Teuvo Järvenpää Oy -sivustolta\n\n` +
        `Nimi: ${name}\n` +
        `Sähköposti: ${email}\n` +
        `Puhelin: ${phone}\n` +
        `Palvelu: ${service}\n\n` +
        `Viesti:\n${message}\n\n` +
        `---\n` +
        `Lähetetty: ${new Date().toLocaleString('fi-FI')}`
    );
    
    // Open email client with pre-filled content
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Show success message
    alert('Sähköpostiohjelma avataan. Lähetä viesti painamalla Lähetä.');
    
    // Reset form
    contactForm.reset();
});

// Gallery item click handling - Enhanced modal with full image
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const imgElement = item.querySelector('.gallery-image img');
        const imageSrc = imgElement ? imgElement.src : '';
        
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 0;
            border-radius: 15px;
            max-width: 90vw;
            max-height: 90vh;
            margin: 20px;
            position: relative;
            cursor: default;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            animation: scaleIn 0.3s ease;
        `;
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.onmouseover = () => {
            closeBtn.style.background = '#e74c3c';
            closeBtn.style.transform = 'rotate(90deg)';
        };
        closeBtn.onmouseout = () => {
            closeBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            closeBtn.style.transform = 'rotate(0deg)';
        };
        
        modalContent.innerHTML = `
            <div style="width: 100%; max-height: 70vh; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f5f5;">
                ${imageSrc ? `<img src="${imageSrc}" alt="${title}" style="max-width: 100%; max-height: 70vh; object-fit: contain; display: block;">` : '<div style="padding: 4rem; color: #999;">Kuva ei saatavilla</div>'}
            </div>
            <div style="padding: 1.5rem 2rem; text-align: center; background: white;">
                <h2 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; color: #2c3e50; font-size: 1.5rem;">${title}</h2>
                <p style="color: #666; margin: 0; font-size: 1rem;">${description}</p>
            </div>
        `;
        
        modalContent.prepend(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Close modal function
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }
            }, 300);
        };
        
        // Close on background click
        modal.addEventListener('click', closeModal);
        
        // Close on button click
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
        
        // Prevent close when clicking on content
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close on ESC key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    });
});

// Add some interactive hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Stats counter animation
const statsNumbers = document.querySelectorAll('.stat h3');
const animateStats = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalNumber = parseInt(target.textContent);
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(counter);
                }
                target.textContent = Math.floor(currentNumber) + '+';
            }, 30);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
});

statsNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Add CSS animations through JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Page loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Teuvo Järvenpää Oy website loaded successfully! 🏗️');

// Floating contact buttons functionality
document.addEventListener('DOMContentLoaded', () => {
    const floatingButtons = document.getElementById('floatingButtons');
    const toggleBtn = document.getElementById('toggleBtn');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const toggleArrowEl = toggleBtn ? toggleBtn.querySelector('.toggle-arrow') : null;
    let isCollapsed = false;

    // Toggle buttons visibility
    if (toggleBtn && buttonsContainer) {
        toggleBtn.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            buttonsContainer.classList.toggle('collapsed', isCollapsed);
            // Also mark the parent so CSS can target the toggle reliably
            floatingButtons.classList.toggle('collapsed', isCollapsed);
            updateToggleArrow();
            positionToggle();
        });
    }

    // Responsive behavior - move to bottom on mobile
    function updateFloatingButtonsPosition() {
        if (window.innerWidth <= 768) {
            floatingButtons.classList.add('mobile');
        } else {
            floatingButtons.classList.remove('mobile');
        }
        positionToggle();
        updateToggleArrow();
    }

    // Show/hide on scroll (mobile only)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Always show on mobile (removed hide at top logic)
            floatingButtons.classList.remove('hidden-scroll');
            
            lastScrollTop = scrollTop;
        } else {
            floatingButtons.classList.remove('hidden-scroll');
        }
    });

    // Initial position check
    updateFloatingButtonsPosition();
    
    // Update on resize
    window.addEventListener('resize', updateFloatingButtonsPosition);

    // Share button functionality
    const shareBtn = document.querySelector('.contact-btn-share');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Teuvo Järvenpää Oy',
                        text: 'Julkisivutyöt ja maalaus Oulussa',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Share cancelled or failed:', err);
                }
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href);
                alert('Sivun osoite kopioitu leikepöydälle!');
            }
        });
    }

    // Position toggle to follow the panel edge on mobile
    function positionToggle() {
        if (!toggleBtn || !buttonsContainer) return;
        if (window.innerWidth <= 768) {
            // Mobile: always keep centered, CSS handles positioning
            toggleBtn.style.bottom = '';
            toggleBtn.style.left = '';
            toggleBtn.style.transform = '';
        } else {
            // desktop handled by CSS; nothing dynamic needed
            toggleBtn.style.bottom = '';
            toggleBtn.style.left = '';
            toggleBtn.style.transform = '';
        }
    }

    // Update arrow direction depending on state and viewport
    function updateToggleArrow() {
        if (!toggleArrowEl) return;
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // collapsed => point up, open => point down
            toggleArrowEl.textContent = buttonsContainer.classList.contains('collapsed') ? '▲' : '▼';
            toggleBtn.setAttribute('aria-label', buttonsContainer.classList.contains('collapsed') ? 'Avaa valikko' : 'Sulje valikko');
        } else {
            // collapsed => point right, open => point left
            toggleArrowEl.textContent = buttonsContainer.classList.contains('collapsed') ? '►' : '◄';
            toggleBtn.setAttribute('aria-label', buttonsContainer.classList.contains('collapsed') ? 'Avaa valikko' : 'Sulje valikko');
        }
    }

    // Ensure correct initial arrow and position
    updateToggleArrow();
    positionToggle();
});