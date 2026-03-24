const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
            cursorRing.style.borderColor = 'rgba(232,255,0,0.7)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.borderColor = 'rgba(232,255,0,0.4)';
        });
    });
}

const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const texts = ['Full Stack Developer', 'Mobile App Specialist', 'Cloud Architect', 'Problem Solver'];
    let idx = 0, charIdx = 0, deleting = false;

    function type() {
        const current = texts[idx];
        typewriterEl.textContent = deleting
            ? current.substring(0, charIdx - 1)
            : current.substring(0, charIdx + 1);

        deleting ? charIdx-- : charIdx++;

        if (!deleting && charIdx === current.length) {
            deleting = true;
            setTimeout(type, 2200);
            return;
        }
        if (deleting && charIdx === 0) {
            deleting = false;
            idx = (idx + 1) % texts.length;
        }
        setTimeout(type, deleting ? 45 : 95);
    }

    type();
}

const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const step = target / 55;
                const update = () => {
                    current += step;
                    if (current < target) {
                        el.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target;
                    }
                };
                update();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNums.forEach(s => observer.observe(s));
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');

const kb = {
    skills: "Khazimla is highly proficient in JavaScript, TypeScript, React, React Native, Node.js, Python, Java, SQL, Docker, Kubernetes, and AWS — with strong expertise across the full stack and cloud architecture.",
    experience: "Khazimla has 4+ years as a Software Engineer. She currently leads a team at TechCorp Innovations, having previously worked at Digital Solutions Inc. She improved system performance by 40% and cut deployment times by 75%.",
    education: "Khazimla holds a BSc in Computer Science (Cum Laude) from the University of Cape Town, and holds certifications in AWS and Scrum methodologies.",
    projects: "Notable projects include a FinTech mobile app with 10k+ users, a cloud-native platform handling 10k+ requests/sec, and an analytics dashboard used by 50+ businesses.",
    contact: "Reach Khazimla at kmfenyana2@gmail.com or via LinkedIn and GitHub.",
    default: "I can tell you about Khazimla's skills, experience, education, projects, or contact details. What would you like to know?"
};

function addMessage(text, isUser = false) {
    if (!chatMessages) return;
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'bot'}`;
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    div.appendChild(bubble);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(msg) {
    const m = msg.toLowerCase();
    if (m.match(/skill|tech|stack|language|framework|know/)) return kb.skills;
    if (m.match(/experience|career|work|role|job|background/)) return kb.experience;
    if (m.match(/education|degree|university|study|certif/)) return kb.education;
    if (m.match(/project|built|created|portfolio/)) return kb.projects;
    if (m.match(/contact|email|reach|connect|linkedin|github/)) return kb.contact;
    if (m.match(/hello|hi|hey/)) return "Hello! I'm Khazimla's AI assistant. Ask me anything about her background.";
    return kb.default;
}

function sendMessage() {
    if (!userInput) return;
    const msg = userInput.value.trim();
    if (!msg) return;
    addMessage(msg, true);
    userInput.value = '';
    setTimeout(() => addMessage(getBotResponse(msg)), 450);
}

if (sendButton) sendButton.addEventListener('click', sendMessage);
if (userInput) {
    userInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') sendMessage();
    });
}

const downloadResume = document.getElementById('downloadResume');
if (downloadResume) {
    downloadResume.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'assets/CV_Khazimla_Mfenyana.pdf';
        link.download = 'CV_Khazimla_Mfenyana.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.textContent = 'Message sent ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

const scrollEls = document.querySelectorAll('.hidden-until-visible');
if (scrollEls.length) {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    scrollEls.forEach(el => scrollObserver.observe(el));
}

const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(b => barObserver.observe(b));
}