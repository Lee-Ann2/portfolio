// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// AI Chatbot
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');

// Knowledge base about Khazimla
const knowledgeBase = {
    skills: ['HTML', 'JavaScript', 'CSS', 'SQL', 'Docker', 'Java', 'TypeScript', 'React Native', 'Python'],
    experience: 'Khazimla is a software engineer with expertise in full-stack development. She has experience building web and mobile applications.',
    education: 'Khazimla has a degree in Computer Science and continuously updates her skills through certifications and projects.',
    projects: 'She has worked on various projects including mobile apps, cloud platforms, and data analytics dashboards.',
    contact: 'You can reach Khazimla at kmfenyana2@gmail.com',
    default: "I'm not sure about that. You can ask me about Khazimla's skills, experience, education, projects, or contact information!"
};

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    
    if (userMessage.includes('skill') || userMessage.includes('technolog') || userMessage.includes('know')) {
        return `Khazimla is skilled in: ${knowledgeBase.skills.join(', ')}.`;
    }
    else if (userMessage.includes('experience') || userMessage.includes('background')) {
        return knowledgeBase.experience;
    }
    else if (userMessage.includes('education') || userMessage.includes('study') || userMessage.includes('degree')) {
        return knowledgeBase.education;
    }
    else if (userMessage.includes('project') || userMessage.includes('work')) {
        return knowledgeBase.projects;
    }
    else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('reach')) {
        return knowledgeBase.contact;
    }
    else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
        return "Hello! I'm Khazimla's AI assistant. How can I help you learn more about her?";
    }
    else {
        return knowledgeBase.default;
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        // Simulate typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot';
        typingIndicator.innerHTML = '<div class="message-content"><span class="loading"></span></div>';
        chatMessages.appendChild(typingIndicator);
        
        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            const response = getBotResponse(message);
            addMessage(response);
        }, 1000);
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// CV Upload and Download functionality
const uploadArea = document.getElementById('uploadArea');
const cvUpload = document.getElementById('cvUpload');
const downloadBtn = document.getElementById('downloadCV');
const cvNote = document.getElementById('cvNote');

let currentCV = null;

// Handle click on upload area
uploadArea.addEventListener('click', () => {
    cvUpload.click();
});

// Handle drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.background = 'rgba(155, 107, 155, 0.2)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.background = '';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.background = '';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
        handleCVUpload(file);
    } else {
        alert('Please upload a PDF file.');
    }
});

// Handle file selection
cvUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleCVUpload(file);
    }
});

function handleCVUpload(file) {
    // In a real application, you would upload this to a server
    // For this demo, we'll create a local object URL
    const reader = new FileReader();
    
    reader.onload = function(e) {
        currentCV = {
            name: file.name,
            data: e.target.result,
            url: URL.createObjectURL(file)
        };
        
        cvNote.textContent = `CV uploaded: ${file.name}`;
        downloadBtn.removeAttribute('disabled');
        downloadBtn.href = currentCV.url;
        downloadBtn.download = file.name;
        
        // Animate success
        uploadArea.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            uploadArea.style.animation = '';
        }, 500);
    };
    
    reader.readAsDataURL(file);
}

// Initialize download button as disabled
downloadBtn.addEventListener('click', (e) => {
    if (!currentCV) {
        e.preventDefault();
        alert('Please upload a CV first.');
    }
});

// Add floating animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animation = `float 3s ease infinite ${index * 0.2}s`;
});

// Add typing effect to subtitle
const subtitle = document.querySelector('.subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        subtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Add parallax effect to background
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.body.style.backgroundPosition = `${mouseX * 20}px ${mouseY * 20}px`;
});

// Smooth scroll for anchor links
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

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Console welcome message
console.log('%c👋 Welcome to Khazimla\'s Portfolio!', 'color: #9b6b9b; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and interact with the AI assistant!', 'color: #b8a6d9; font-size: 14px;');