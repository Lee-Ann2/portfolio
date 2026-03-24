const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');

    function applyTheme(dark) {
        if (dark) {
            document.body.style.setProperty('--paper', '#1a1a1a');
            document.body.style.setProperty('--paper-2', '#222');
            document.body.style.setProperty('--white', '#1e1e1e');
            document.body.style.setProperty('--ink', '#f5f0e8');
            document.body.style.setProperty('--ink-2', '#e8e4dc');
            document.body.style.setProperty('--border-light', 'rgba(255,255,255,0.06)');
            document.body.style.setProperty('--muted', '#888');
            document.querySelector('body').classList.add('dark-inverted');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            themeToggle.style.background = '#f5f0e8';
            themeToggle.querySelector('i.fa-sun').style.color = '#0a0a0a';
        } else {
            document.body.style.removeProperty('--paper');
            document.body.style.removeProperty('--paper-2');
            document.body.style.removeProperty('--white');
            document.body.style.removeProperty('--ink');
            document.body.style.removeProperty('--ink-2');
            document.body.style.removeProperty('--border-light');
            document.body.style.removeProperty('--muted');
            document.querySelector('body').classList.remove('dark-inverted');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            themeToggle.style.background = '#0a0a0a';
            themeToggle.querySelector('i.fa-moon').style.color = '#e8ff00';
        }
    }

    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark') applyTheme(true);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-inverted');
        applyTheme(!isDark);
        localStorage.setItem('portfolio-theme', !isDark ? 'dark' : 'light');
    });
}

const photoInput = document.getElementById('photoInput');
const photoFrame = document.getElementById('photoFrame');
const uploadIcon = document.getElementById('uploadIcon');

if (photoInput && photoFrame) {
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            photoFrame.innerHTML = '';
            const img = document.createElement('img');
            img.src = ev.target.result;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:2px;';
            photoFrame.style.position = 'relative';
            photoFrame.style.border = '2px solid rgba(10,10,10,0.15)';
            photoFrame.appendChild(img);

            const editBtn = document.createElement('div');
            editBtn.style.cssText = 'position:absolute;bottom:1rem;right:1rem;background:rgba(0,0,0,0.7);color:#e8ff00;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:0.875rem;z-index:10;transition:background 0.2s;';
            editBtn.innerHTML = '<i class="fas fa-camera"></i>';
            editBtn.title = 'Change photo';

            const newInput = document.createElement('input');
            newInput.type = 'file';
            newInput.accept = 'image/*';
            newInput.style.cssText = 'position:absolute;inset:0;opacity:0;cursor:pointer;z-index:11;';
            newInput.addEventListener('change', (ev2) => {
                const f2 = ev2.target.files[0];
                if (!f2) return;
                const r2 = new FileReader();
                r2.onload = (res) => { img.src = res.target.result; };
                r2.readAsDataURL(f2);
            });

            photoFrame.appendChild(editBtn);
            photoFrame.appendChild(newInput);
        };
        reader.readAsDataURL(file);
    });
}