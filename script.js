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

// Galerie de projets
document.addEventListener('DOMContentLoaded', function() {
    // Données des projets avec leurs images
    const projectsData = {
        educmed: {
            images: ['img/20.jpg', 'img/21.jpg', 'img/22.jpg', 'img/23.jpg'],
            description: "Plateforme éducative médicale offrant des ressources pédagogiques pour les étudiants en médecine. Conception d'une interface intuitive avec système de connexion et espace personnel."
        },
        gym131: {
            images: ['img/30.jpg', 'img/31.jpg', 'img/32.jpg', 'img/33.jpg'],
            description: "Site web moderne pour une salle de sport premium. Présentation des services, programmes d'entraînement et formulaire de contact intégré."
        },
    
        coffeeshop: {
            images: ['img/11.jpg', 'img/12.jpg', 'img/14.jpg', 'img/15.jpg'],
            description: "Site vitrine élégant pour un café boutique. Présentation du menu, des événements et formulaire de réservation. Design chaleureux et responsive."
        }
    };

    // Éléments de la modale
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.querySelector('.modal-title');
    const mainImage = document.getElementById('mainGalleryImage');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const projectDescription = document.getElementById('projectDescription');
    const closeModal = document.querySelector('.close-modal');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    
    let currentProject = null;
    let currentImageIndex = 0;

    // Ouvrir la modale de galerie
    document.querySelectorAll('.gallery-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openGallery(projectId);
        });
    });

    // Fermer la modale
    closeModal.addEventListener('click', closeGallery);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeGallery();
    });

    // Navigation entre les images
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Fonction pour ouvrir la galerie
    function openGallery(projectId) {
        if (!projectsData[projectId]) return;
        
        currentProject = projectId;
        currentImageIndex = 0;
        
        // Mettre à jour le titre
        const projectName = document.querySelector(`[data-project="${projectId}"]`).closest('.portfolio-layer').querySelector('h4').textContent;
        modalTitle.textContent = `Galerie - ${projectName}`;
        
        // Charger les images
        loadImages(projectsData[projectId].images);
        
        // Mettre à jour la description
        projectDescription.textContent = projectsData[projectId].description;
        
        // Afficher la modale
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêcher le défilement
    }

    // Fonction pour fermer la galerie
    function closeGallery() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactiver le défilement
    }

    // Fonction pour charger les images
    function loadImages(images) {
        // Vider les miniatures existantes
        thumbnailContainer.innerHTML = '';
        
        // Mettre à jour le compteur total
        totalImagesSpan.textContent = images.length;
        
        // Charger chaque image
        images.forEach((imageSrc, index) => {
            // Créer la miniature
            const thumbnail = document.createElement('img');
            thumbnail.src = imageSrc;
            thumbnail.alt = `Miniature ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');
            
            thumbnail.addEventListener('click', () => showImage(index));
            thumbnailContainer.appendChild(thumbnail);
        });
        
        // Afficher la première image
        showImage(0);
    }

    // Fonction pour afficher une image spécifique
    function showImage(index) {
        if (!currentProject || !projectsData[currentProject]) return;
        
        const images = projectsData[currentProject].images;
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        currentImageIndex = index;
        mainImage.src = images[index];
        currentImageSpan.textContent = index + 1;
        
        // Mettre à jour les miniatures actives
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Fonction pour afficher l'image précédente
    function showPrevImage() {
        showImage(currentImageIndex - 1);
    }

    // Fonction pour afficher l'image suivante
    function showNextImage() {
        showImage(currentImageIndex + 1);
    }

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Navigation tactile pour mobile
    let touchStartX = 0;
    let touchEndX = 0;

    mainImage.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    mainImage.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const minSwipeDistance = 50; // Distance minimale pour considérer un swipe
        
        if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
            showNextImage(); // Swipe gauche
        }
        
        if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
            showPrevImage(); // Swipe droit
        }
    }
});
    // Fermer la modale
    closeModal.addEventListener('click', closeGallery);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeGallery();
    });
    
    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
    
    function loadGallery(images) {
        // Vider les miniatures
        thumbnailsContainer.innerHTML = '';
        
        // Charger la première image
        mainImage.src = images[0];
        mainImage.alt = `Image ${currentIndex + 1} du projet`;
        
        // Créer les miniatures
        images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Miniature ${index + 1}`;
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => selectImage(index));
            
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Mettre à jour les boutons de navigation
        updateNavButtons();
    }
    
    function selectImage(index) {
        currentIndex = index;
        mainImage.src = projectGalleries[currentProject][index];
        mainImage.alt = `Image ${index + 1} du projet`;
        
        // Mettre à jour les miniatures actives
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        updateNavButtons();
    }
    
    function showPrevImage() {
        if (currentIndex > 0) {
            selectImage(currentIndex - 1);
        }
    }
    
    function showNextImage() {
        if (currentIndex < projectGalleries[currentProject].length - 1) {
            selectImage(currentIndex + 1);
        }
    }
    
    function updateNavButtons() {
        prevBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
        nextBtn.style.opacity = currentIndex < projectGalleries[currentProject].length - 1 ? '1' : '0.5';
    }
    
    function closeGallery() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    // Gestion du formulaire de contact
const contactForm = document.querySelector('.contact form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Vous pouvez ajouter ici une validation supplémentaire si nécessaire
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Le formulaire sera soumis à FormSubmit qui gère l'envoi par email
        // FormSubmit redirigera vers la page de remerciement
    });
}

// Animation pour les champs du formulaire
document.querySelectorAll('.input, .textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        // Animation des champs de formulaire
        const formFields = contactForm.querySelectorAll('.input, .textarea');
        
        formFields.forEach(field => {
            // Vérifier si le champ a déjà une valeur au chargement
            if (field.value !== '') {
                field.parentElement.classList.add('focused');
            }
            
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Gestion de la soumission du formulaire
        contactForm.addEventListener('submit', function(e) {
            // Validation basique
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                    
                    field.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.style.borderColor = '';
                        }
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Animation de chargement
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Envoi en cours... <i class="bx bx-loader-alt bx-spin"></i>';
            submitBtn.disabled = true;
            
            // Réactiver le bouton après 5 secondes au cas où l'envoi échouerait
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
            
            // Le formulaire sera soumis à FormSubmit qui gère l'envoi par email
            // FormSubmit redirigera vers la page de remerciement
        });
    }
});