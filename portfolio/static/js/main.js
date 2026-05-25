// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // ── Project Filter ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-wrapper');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const tag = btn.dataset.tag;
                projectCards.forEach(card => {
                    const tags = card.dataset.tags || '';
                    if (!tag || tags.split(',').includes(tag)) {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ── Contact Form ──
    const form = document.getElementById('contactForm');
    if (form) {
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            const payload = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
            };

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                if (data.success) {
                    formStatus.textContent = '✓ ' + data.message;
                    formStatus.classList.add('success');
                    form.reset();
                } else {
                    formStatus.textContent = '✗ ' + (data.error || 'Something went wrong.');
                    formStatus.classList.add('error');
                }
            } catch {
                formStatus.textContent = '✗ Network error. Please try again.';
                formStatus.classList.add('error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });
    }

    // ── Scroll animations ──
    const animateElements = document.querySelectorAll('.project-card-wrapper, .skill-card, .timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

});