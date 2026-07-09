/**
 * main.js
 * Handles interactive UI behavior: mobile navigation toggle, dismissible
 * flash messages, the footer copyright year, and full client-side
 * validation for the contact form.
 */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initFlashMessages();
    initFooterYear();
    initContactFormValidation();
});

function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const iconOpen = document.getElementById("menu-icon-open");
    const iconClose = document.getElementById("menu-icon-close");

    if (!menuBtn || !menu) return;

    menuBtn.addEventListener("click", () => {
        const isHidden = menu.classList.contains("hidden");

        menu.classList.toggle("hidden");
        iconOpen.classList.toggle("hidden");
        iconClose.classList.toggle("hidden");
        menuBtn.setAttribute("aria-expanded", String(isHidden));
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.add("hidden");
            iconOpen.classList.remove("hidden");
            iconClose.classList.add("hidden");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

function initFlashMessages() {
    const messages = document.querySelectorAll(".flash-message");

    messages.forEach((message) => {
        const dismissBtn = message.querySelector(".flash-dismiss");
        if (dismissBtn) {
            dismissBtn.addEventListener("click", () => dismissFlash(message));
        }
        setTimeout(() => dismissFlash(message), 6000);
    });
}

function dismissFlash(message) {
    if (!message || message.dataset.dismissed === "true") return;
    message.dataset.dismissed = "true";
    message.classList.add("flash-message--leaving");
    message.addEventListener(
        "animationend",
        () => message.remove(),
        { once: true }
    );
}

function initFooterYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
}

function initContactFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const messageCounter = document.getElementById("message-counter");
    const submitBtn = document.getElementById("submit-btn");
    const submitBtnText = document.getElementById("submit-btn-text");
    const submitSpinner = document.getElementById("submit-spinner");

    const MIN_MESSAGE_LENGTH = 10;
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validators = {
        name: (value) => {
            if (!value.trim()) return "Please enter your name.";
            if (value.trim().length < 2) return "Name must be at least 2 characters.";
            return null;
        },
        email: (value) => {
            if (!value.trim()) return "Please enter your email address.";
            if (!EMAIL_PATTERN.test(value.trim())) return "Please enter a valid email address.";
            return null;
        },
        message: (value) => {
            if (!value.trim()) return "Please enter a message.";
            if (value.trim().length < MIN_MESSAGE_LENGTH) {
                return `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
            }
            return null;
        },
    };

    function getErrorEl(input) {
        return input.parentElement.querySelector(".field-error");
    }

    function showError(input, text) {
        const errorEl = getErrorEl(input);
        input.classList.remove("input-valid");
        input.classList.add("input-invalid");
        input.setAttribute("aria-invalid", "true");

        if (errorEl) {
            errorEl.textContent = text;
            errorEl.classList.remove("hidden");
        }

        input.classList.remove("field-shake");
        void input.offsetWidth;
        input.classList.add("field-shake");
    }

    function clearError(input) {
        const errorEl = getErrorEl(input);
        input.classList.remove("input-invalid");
        input.classList.add("input-valid");
        input.removeAttribute("aria-invalid");

        if (errorEl) {
            errorEl.textContent = "";
            errorEl.classList.add("hidden");
        }
    }

    function validateField(input) {
        const validator = validators[input.name];
        if (!validator) return true;

        const error = validator(input.value);
        if (error) {
            showError(input, error);
            return false;
        }
        clearError(input);
        return true;
    }

    [nameInput, emailInput, messageInput].forEach((input) => {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("input", () => {
            if (input.classList.contains("input-invalid")) {
                validateField(input);
            }
        });
    });

    if (messageInput && messageCounter) {
        messageInput.addEventListener("input", () => {
            const length = messageInput.value.trim().length;
            messageCounter.textContent =
                length >= MIN_MESSAGE_LENGTH
                    ? `${length} characters`
                    : `${length} / ${MIN_MESSAGE_LENGTH} min characters`;
            messageCounter.classList.toggle("text-accent-400", length >= MIN_MESSAGE_LENGTH);
            messageCounter.classList.toggle("text-slate-600", length < MIN_MESSAGE_LENGTH);
        });
    }

    form.addEventListener("submit", (event) => {
        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageInput);

        const isFormValid = isNameValid && isEmailValid && isMessageValid;

        if (!isFormValid) {
            event.preventDefault();
            const firstInvalid = form.querySelector(".input-invalid");
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        submitBtn.disabled = true;
        submitBtnText.textContent = "Sending...";
        submitSpinner.classList.remove("hidden");
    });
}