// mobile shit ahhhh that doesnt really work anyways cause mobile just looks shit well idc fuck mobile users GRRRR!
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(39, 39, 42, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.borderBottom = 'none';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .contact-link, .stat, .feature, .about-text, .contact-info'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05) rotateY(5deg)';
        card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 30px rgba(99, 102, 241, 0.2)';
        
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotateY(10deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(-5deg)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 600);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
    
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 600ms linear;
                background-color: rgba(255, 255, 255, 0.6);
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});
//does this work, lets find out
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

function animateStats() {
    const stats = document.querySelectorAll('.stat h3'); //h3 to h2o i need water i am thirsty
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.innerText);
        let currentValue = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            if (stat.innerText.includes('+')) {
                stat.innerText = Math.floor(currentValue) + '+';
            } else if (stat.innerText.includes('/')) {
                stat.innerText = Math.floor(currentValue) + '/7';
            } else {
                stat.innerText = Math.floor(currentValue);
            }
        }, 50);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            body:not(.loaded) .hero-content,
            body:not(.loaded) .hero-visual {
                opacity: 0;
                transform: translateY(50px);
            }
            body.loaded .hero-content,
            body.loaded .hero-visual {
                opacity: 1;
                transform: translateY(0);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            body.loaded .hero-visual {
                transition-delay: 0.2s;
            }
        `;
        document.head.appendChild(style);
    }
});

document.querySelectorAll('.floating-card').forEach((card, index) => {
    let mouseX = 0;
    let mouseY = 0;
    let cardX = 0;
    let cardY = 0;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        mouseX = e.clientX - rect.left - rect.width / 2;
        mouseY = e.clientY - rect.top - rect.height / 2;
    });
    
    card.addEventListener('mouseenter', () => {
        animate();
    });
    
    card.addEventListener('mouseleave', () => {
        cardX = 0;
        cardY = 0;
    });
    
    function animate() {
        cardX += (mouseX - cardX) * 0.1;
        cardY += (mouseY - cardY) * 0.1;
        
        card.style.transform = `translateX(${cardX * 0.1}px) translateY(${cardY * 0.1}px) rotateX(${cardY * 0.02}deg) rotateY(${cardX * 0.02}deg)`;
        
        requestAnimationFrame(animate);
    }
});
// the particle thingy bruh
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    `;
    
    hero.style.position = 'relative';
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

document.querySelector('.nav-logo h2').addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
    
    if (!document.querySelector('#glitch-styles')) {
        const style = document.createElement('style');
        style.id = 'glitch-styles';
        style.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        this.style.animation = '';
    }, 300);
});

function updateEventCountdowns() {
    document.querySelectorAll('.event-time').forEach(eventTime => {
        const date = eventTime.dataset.date;
        const noDateEl = eventTime.querySelector('.no-date');
        const countdownEl = eventTime.querySelector('.countdown');
        
        if (!date) {
            noDateEl.style.display = 'block';
            countdownEl.style.display = 'none';
            return;
        }

        const eventDate = new Date(date);
        const now = new Date();
        const diff = eventDate - now;

        if (diff < 0) {
            noDateEl.style.display = 'block';
            noDateEl.textContent = 'Event ended';
            countdownEl.style.display = 'none';
            return;
        }

        noDateEl.style.display = 'none';
        countdownEl.style.display = 'block';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
}

setInterval(updateEventCountdowns, 1000);
updateEventCountdowns();

// new shit bruh
const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let filteredItems = [];

function initCompletedFeatures() {
    const searchInput = document.getElementById('feature-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.completed-item');
    
    filteredItems = Array.from(items);
    
    updatePagination();
    displayItems();

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterItems();
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterItems();
        });
    });
}

function filterItems() {
    const searchInput = document.getElementById('feature-search');
    const activeFilter = document.querySelector('.filter-btn.active');
    const items = document.querySelectorAll('.completed-item');
    
    const searchTerm = searchInput.value.toLowerCase();
    const filterType = activeFilter.dataset.filter;

    filteredItems = Array.from(items).filter(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const hasTutorial = item.dataset.hasTutorial === 'true';

        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesFilter = filterType === 'all' || 
            (filterType === 'tutorial' && hasTutorial) || 
            (filterType === 'no-tutorial' && !hasTutorial);

        return matchesSearch && matchesFilter;
    });

    currentPage = 1;
    updatePagination();
    displayItems();
}

function displayItems() {
    const items = document.querySelectorAll('.completed-item');
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    items.forEach(item => {
        item.style.display = 'none';
    });
    
    filteredItems.slice(startIndex, endIndex).forEach(item => {
        item.style.display = 'flex';
    });

    const noResults = document.querySelector('.no-results') || createNoResultsMessage();
    noResults.style.display = filteredItems.length === 0 ? 'block' : 'none';
}

function updatePagination() {
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
    
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    document.getElementById('prev-page').disabled = currentPage <= 1;
    document.getElementById('next-page').disabled = currentPage >= totalPages;
}

function createNoResultsMessage() {
    const message = document.createElement('div');
    message.className = 'no-results';
    message.textContent = 'No matching items found';
    message.style.cssText = 'text-align: center; padding: 2rem; color: var(--text-secondary);';
    
    const container = document.querySelector('.completed-items');
    container.appendChild(message);
    return message;
}

document.addEventListener('DOMContentLoaded', initCompletedFeatures);

document.getElementById('prev-page')?.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
        displayItems();
    }
});

document.getElementById('next-page')?.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
        displayItems();
    }
});
