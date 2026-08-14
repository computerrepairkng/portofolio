document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    // Mobile menu
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });

        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Image Modal Lightbox
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgModalSrc");
    const closeBtn = document.querySelector(".img-modal-close");
    const projectImages = document.querySelectorAll(".project-image img, .cert-badge img");

    if (modal && modalImg && projectImages.length > 0) {
        projectImages.forEach(img => {
            img.addEventListener("click", function() {
                modal.classList.add("show");
                modalImg.src = this.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("show");
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    }

});

// Language dropdown toggle
function toggleLangDropdown(event) {
    document.getElementById("langDropdownContent").classList.toggle("show");
    event.stopPropagation();
}

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.lang-dropbtn') && !event.target.closest('.lang-dropbtn')) {
        var dropdowns = document.getElementsByClassName("lang-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

// Helper to get cookie
function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

// Restore language dropdown state on load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCookie('googtrans');
    let langCode = 'id';
    if (currentLang) {
        const parts = currentLang.split('/');
        if (parts.length > 2) langCode = parts[2];
    }

    const langMap = {
        'id': 'INDONESIA',
        'en': 'ENGLISH',
        'zh-CN': 'CHINA',
        'ja': 'JAPAN'
    };
    
    if (langMap[langCode]) {
        const dropBtnText = document.querySelector('#currentLangText');
        if (dropBtnText) {
            dropBtnText.innerHTML = 'Language: ' + langMap[langCode];
        }
        
        document.querySelectorAll('.lang-dropdown-content a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('onclick').includes("'" + langCode + "'")) {
                a.classList.add('active');
            }
        });
    }
});

// Language switcher function for main navigation
function switchMainLang(btn, langCode, langName) {
    const currentCookie = getCookie('googtrans');
    let currentLangCode = 'id';
    if (currentCookie) {
        const parts = currentCookie.split('/');
        if (parts.length > 2) currentLangCode = parts[2];
    }

    if (currentLangCode === langCode) return;

    if (langCode === 'id') {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + location.hostname + "; path=/;";
    } else {
        document.cookie = "googtrans=/id/" + langCode + "; path=/";
        document.cookie = "googtrans=/id/" + langCode + "; domain=" + location.hostname + "; path=/";
    }

    window.location.reload();
}
