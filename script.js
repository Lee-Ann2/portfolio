const canvas = document.getElementById('iconCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let icons = [];
    
    const iconSymbols = [
        'JS', '⚛️', '🐍', '☕', '⬢', '☁️', '🐳', '🐙',
        '🐧', '📱', '🍎', '🗄️', '☁️', '</>', '📈', '📱',
        '💻', '🖥️', '🔒', '⚙️', '🧠', '🤖', '📊', '🔀',
        '🌐', '🔌', '🧊', '📊'
    ];
    
    class FloatingIcon {
        constructor(x, y, icon, size, speedX, speedY, rotation, rotationSpeed, opacity) {
            this.x = x;
            this.y = y;
            this.icon = icon;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.rotation = rotation;
            this.rotationSpeed = rotationSpeed;
            this.opacity = opacity;
            this.originalOpacity = opacity;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.y < -50) this.y = canvas.height + 50;
            if (this.y > canvas.height + 50) this.y = -50;
            
            this.opacity = this.originalOpacity + Math.sin(Date.now() * 0.002 * this.rotationSpeed) * 0.15;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.font = `${this.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
            ctx.lineWidth = 2;
            ctx.strokeText(this.icon, 0, 0);
            ctx.restore();
        }
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function initIcons() {
        icons = [];
        const iconCount = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 15000));
        
        for (let i = 0; i < iconCount; i++) {
            const icon = iconSymbols[Math.floor(Math.random() * iconSymbols.length)];
            const size = Math.random() * 28 + 18;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.3;
            const rotation = Math.random() * Math.PI * 2;
            const rotationSpeed = (Math.random() - 0.5) * 0.02;
            const opacity = Math.random() * 0.4 + 0.2;
            
            icons.push(new FloatingIcon(x, y, icon, size, speedX, speedY, rotation, rotationSpeed, opacity));
        }
    }
    
    function animateIcons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        icons.forEach(icon => {
            icon.update();
            icon.draw();
        });
        
        requestAnimationFrame(animateIcons);
    }
    
    resizeCanvas();
    initIcons();
    animateIcons();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initIcons();
    });
}

const typewriterElement = document.querySelector('.typewriter-text');
if (typewriterElement) {
    const texts = ['Full Stack Developer', 'Mobile App Specialist', 'Cloud Architect', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
    
    typeWriter();
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.count);
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        element.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}