// Menu mobile
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Changement de couleur du header au scroll
window.onscroll = () => {
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Fermeture du menu mobile lors du scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Animation de texte
const typed = new Typed('.multiple-text', {
    strings: ['Designer UX/UI', 'Développeur Frontend', 'Web Designer', 'Graphic Designer'],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    smartBackspace: true
});

// Animation au scroll avec Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Éléments à animer
const scrollElements = document.querySelectorAll('.reveal, .resume-content, .services-box, .portfolio-box');
scrollElements.forEach(el => {
    animateOnScroll.observe(el);
});

// Effet de révélation amélioré
function revealSections() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealSections);
revealSections(); // Initial call

// Animation des compétences
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 150 * index);
    });
}

// Animation de la timeline CV
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.resume-content');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 * index);
    });
}

// Gestionnaire d'événements pour le téléchargement du CV
document.querySelectorAll('.download-options .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Ici vous pouvez ajouter la logique de téléchargement
        alert('Téléchargement du CV en ' + (this.querySelector('i').classList.contains('fa-file-pdf') ? 'PDF' : 'Word'));
    });
});
// Script pour le bouton d'impression
document.getElementById('print-cv').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('CV.pdf', '_blank').print();
});
// Initialisation des animations
document.addEventListener('DOMContentLoaded', () => {
    // Délai pour l'animation du contenu principal
    setTimeout(() => {
        document.querySelector('.home-content').classList.add('loaded');
    }, 500);
    
    // Animation des compétences
    if (document.querySelector('.skill-items')) {
        animateSkills();
    }
    
    // Animation de la timeline CV
    if (document.querySelector('.resume-box')) {
        animateTimeline();
    }
    
    // Initialisation des tooltips (si vous en ajoutez)
    initTooltips();
});

// Fonction pour les tooltips (optionnelle)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }
    
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// Effet de particules amélioré (optionnel)
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        'z-index': '-1',
        'pointer-events': 'none'
    });
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    resizeCanvas();
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    // Création des particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(canvas));
    }
    
    function createParticle(canvas) {
        const size = Math.random() * 3 + 1;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            baseSize: size,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `rgba(0, 171, 240, ${Math.random() * 0.3 + 0.1})`,
            density: Math.random() * 30 + 1
        };
    }
    
    function connectParticles() {
        let opacity;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    opacity = 1 - distance / 100;
                    ctx.strokeStyle = `rgba(0, 171, 240, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Dessiner les particules
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Mouvement
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Rebond sur les bords
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Interaction avec la souris
            const mouse = { x: null, y: null };
            
            window.addEventListener('mousemove', (event) => {
                mouse.x = event.x;
                mouse.y = event.y;
            });
            
            if (mouse.x && mouse.y) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    p.size = p.baseSize + (100 - distance) / 10;
                    p.x -= dx / 20;
                    p.y -= dy / 20;
                } else if (p.size > p.baseSize) {
                    p.size -= 0.1;
                }
            }
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    animateParticles();
}

// Démarrer les particules (optionnel)
// initParticles();