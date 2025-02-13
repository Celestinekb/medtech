
        // Navigation Toggle
        function toggleNav() {
            document.querySelector('.nav-links').classList.toggle('active');
        }

        // Toggle Theme
        function toggleTheme() {
            document.body.classList.toggle('light-mode');
        }

        // Interaction with cursor
        const cursor = document.querySelector('.cursor');
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .skill-card, .project-card, .timeline-item, .cert-card, .cv-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });

        // Smooth Scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                if(window.innerWidth <= 768) {
                    toggleNav();
                }
            });
        });

        // Dynamic background change on scroll
        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var maxScroll = document.body.scrollHeight - window.innerHeight;
            var scrollFraction = scrollTop / maxScroll;
            
            var hue = Math.round(scrollFraction * 360);
            document.body.style.background = `hsl(${hue}, 100%, 10%)`;
        });

        // Colorful text animation for section headers on scroll
        document.querySelectorAll('.content-section h2').forEach(header => {
            const animate = () => {
                let hue = Math.floor(Math.random() * 360);
                header.style.background = `linear-gradient(45deg, hsl(${hue}, 100%, 50%), hsl(${hue + 60}, 100%, 50%))`;
                header.style.webkitBackgroundClip = 'text';
                header.style.webkitTextFillColor = 'transparent';
            };
            new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animate();
                        setInterval(animate, 3000);
                    }
                });
            }, { threshold: 0.5 }).observe(header);
        });

        // Create dynamic light effects
        function createLight() {
            const light = document.createElement('div');
            light.classList.add('light');
            light.style.left = Math.random() * 100 + 'vw';
            light.style.top = Math.random() * 100 + 'vh';
            light.style.animationDelay = Math.random() * 10 + 's';
            document.querySelector('.light-effect').appendChild(light);
            setTimeout(() => light.remove(), 10000);
        }

        setInterval(createLight, 5000);

        // Parallax effect for background
        document.addEventListener('scroll', function() {
            var scrolled = window.pageYOffset;
            document.querySelector('.parallax').style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
        });

        // Animate elements on scroll
        const animItems = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .cert-card, .cv-btn, .contact-form');
        const observerForAnim = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                } else {
                    entry.target.style.animation = 'none';
                }
            });
        }, { threshold: 0.1 });

        animItems.forEach(item => observerForAnim.observe(item));
    