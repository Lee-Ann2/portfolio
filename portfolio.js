const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

const skillItems = document.querySelectorAll('.skill-item');
if (skillItems.length) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const percent = element.dataset.skill;
                element.style.setProperty('--skill-percent', `${percent}%`);
                skillObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => skillObserver.observe(item));
}

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');

const knowledgeBase = {
    skills: "Khazimla is proficient in JavaScript, TypeScript, React, React Native, Node.js, Python, Java, SQL, Docker, Kubernetes, and AWS. She has strong expertise in full-stack development and cloud architecture.",
    experience: "Khazimla has 4+ years of experience as a Software Engineer. She has worked on enterprise applications, mobile apps, and cloud platforms. She led teams, mentored developers, and improved system performance by 40%.",
    education: "Khazimla holds a Bachelor's degree in Computer Science from University of Cape Town. She is also certified in AWS and Scrum methodologies.",
    projects: "Her notable projects include a FinTech mobile app with 10k+ users, a cloud-native platform handling 10k+ requests/sec, and an analytics dashboard used by 50+ businesses.",
    contact: "You can reach Khazimla at kmfenyana2@gmail.com or connect with her on LinkedIn and GitHub.",
    default: "I can help you learn about Khazimla's skills, experience, education, projects, or contact information. What would you like to know?"
};

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    if (msg.match(/skill|technolog|tech|stack|know|language|framework/)) {
        return knowledgeBase.skills;
    } else if (msg.match(/experience|career|background|work|role|position|job/)) {
        return knowledgeBase.experience;
    } else if (msg.match(/education|degree|university|study|certif|school/)) {
        return knowledgeBase.education;
    } else if (msg.match(/project|build|created|developed|portfolio|work sample/)) {
        return knowledgeBase.projects;
    } else if (msg.match(/contact|email|reach|linkedin|github|connect/)) {
        return knowledgeBase.contact;
    } else if (msg.match(/hello|hi|hey|greetings/)) {
        return "Hello! I'm Khazimla's AI assistant. How can I help you learn more about her professional background?";
    } else {
        return knowledgeBase.default;
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 500);
    }
}

if (sendButton && userInput) {
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

const downloadResume = document.getElementById('downloadResume');
if (downloadResume) {
    downloadResume.addEventListener('click', (e) => {
        e.preventDefault();
        
        const content = `
            <html>
            <head><title>Khazimla_Mfenyana_Resume</title></head>
            <body style="font-family: Arial, sans-serif; padding: 2rem;">
                <h1>Khazimla Zamajola Lee-Ann Mfenyana</h1>
                <p><strong>Software Engineer | Full Stack Developer</strong></p>
                <p>Email: kmfenyana2@gmail.com | Location: South Africa</p>
                <hr/>
                <h2>Professional Summary</h2>
                <p>Results-driven Software Engineer with 4+ years of experience in full-stack development, mobile architecture, and cloud infrastructure. Passionate about building high-performance applications and mentoring junior developers.</p>
                <h2>Technical Skills</h2>
                <ul><li>JavaScript/TypeScript, React, React Native, Node.js, Python, Java</li><li>SQL, MongoDB, Docker, Kubernetes, AWS, CI/CD</li></ul>
                <h2>Work Experience</h2>
                <p><b>Senior Software Engineer</b> - TechCorp Innovations (2022-Present)<br/>Leading team of 5 developers, architected microservices improving performance by 40%.</p>
                <p><b>Full Stack Developer</b> - Digital Solutions Inc. (2020-2022)<br/>Built 10+ client projects including e-commerce platforms and mobile apps.</p>
                <h2>Education</h2>
                <p>BSc Computer Science (Cum Laude) - University of Cape Town</p>
                <h2>Certifications</h2>
                <p>AWS Certified Developer, Professional Scrum Master I</p>
            </body>
            </html>
        `;
        
        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Khazimla_Mfenyana_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-card');
if (animateElements.length) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
}