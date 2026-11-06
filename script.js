/* ==========================================
   KHAN JAPANESE LANGUAGE & CAREER ACADEMY
<<<<<<< HEAD
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Language Switcher
    const languageBtn = document.getElementById("languageBtn");

    let currentLanguage = "en";

    if (languageBtn) {

        languageBtn.addEventListener("click", function () {

            // English থেকে Japanese, Japanese থেকে English
            currentLanguage = currentLanguage === "en" ? "ja" : "en";

            // Website-এর লেখা পরিবর্তন
            document.querySelectorAll("[data-en][data-ja]").forEach(function (element) {

                const translation = element.dataset[currentLanguage];

                if (translation !== undefined) {
                    element.textContent = translation;
                }

            });

            // HTML language update
            document.documentElement.lang = currentLanguage;

            // Button-এর text পরিবর্তন
            languageBtn.textContent =
                currentLanguage === "en" ? "日本語" : "English";

            // Accessibility update
            languageBtn.setAttribute(
                "aria-label",
                currentLanguage === "en"
                    ? "Switch website language to Japanese"
                    : "Switch website language to English"
            );

        });

    }


    // 2. Automatically Update Footer Year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 3. Contact Form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            // Form submit হয়ে page reload হওয়া বন্ধ করবে
            event.preventDefault();

            const message = currentLanguage === "ja"
                ? "お問い合わせフォームはまだ送信サービスに接続されていません。メールでご連絡ください。"
                : "The contact form is not connected to a sending service yet. Please contact us by email.";

            alert(message);

        });

    }

});
=======
   Premium Script v2
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ------------------------------------------
       Safe storage helpers (private mode safe)
    ------------------------------------------ */
    const storage = {
        get(key) {
            try { return localStorage.getItem(key); } catch (e) { return null; }
        },
        set(key, value) {
            try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
        }
    };

    /* ==========================================
       1. LANGUAGE SWITCHER
       - Remembers the visitor's choice
       - Detects browser language on first visit
       - Smooth fade, translates text, placeholders, title
       - Use: data-en / data-ja, data-en-placeholder / data-ja-placeholder,
              data-en-aria-label / data-ja-aria-label
    ========================================== */
    const languageBtn = $("#languageBtn");
    const SUPPORTED = ["en", "ja"];

    function getInitialLanguage() {
        const saved = storage.get("siteLanguage");
        if (SUPPORTED.includes(saved)) return saved;
        return (navigator.language || "en").toLowerCase().startsWith("ja") ? "ja" : "en";
    }

    let currentLanguage = getInitialLanguage();

    function applyLanguage(lang) {
        $$("[data-en][data-ja]").forEach(function (el) {
            const text = el.dataset[lang];
            if (text !== undefined) el.textContent = text;
        });

        $$("[data-en-placeholder][data-ja-placeholder]").forEach(function (el) {
            el.placeholder = el.dataset[lang === "en" ? "enPlaceholder" : "jaPlaceholder"];
        });

        $$("[data-en-aria-label][data-ja-aria-label]").forEach(function (el) {
            el.setAttribute("aria-label", el.dataset[lang === "en" ? "enAriaLabel" : "jaAriaLabel"]);
        });

        const titleEl = document.documentElement;
        titleEl.lang = lang;

        if (document.body.dataset.titleEn && document.body.dataset.titleJa) {
            document.title = lang === "en" ? document.body.dataset.titleEn : document.body.dataset.titleJa;
        }

        if (languageBtn) {
            languageBtn.textContent = lang === "en" ? "日本語" : "English";
            languageBtn.setAttribute(
                "aria-label",
                lang === "en" ? "Switch website language to Japanese" : "Switch website language to English"
            );
        }

        storage.set("siteLanguage", lang);
    }

    function switchLanguage() {
        const next = currentLanguage === "en" ? "ja" : "en";

        if (prefersReducedMotion) {
            currentLanguage = next;
            applyLanguage(currentLanguage);
            return;
        }

        // Smooth fade out -> change -> fade in
        document.body.style.transition = "opacity .18s ease";
        document.body.style.opacity = "0.4";

        setTimeout(function () {
            currentLanguage = next;
            applyLanguage(currentLanguage);
            document.body.style.opacity = "1";
        }, 180);
    }

    applyLanguage(currentLanguage);
    if (languageBtn) languageBtn.addEventListener("click", switchLanguage);

    // Helper for translated messages
    const t = (en, ja) => (currentLanguage === "ja" ? ja : en);


    /* ==========================================
       2. FOOTER YEAR
    ========================================== */
    const yearEl = $("#currentYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* ==========================================
       3. HEADER: shadow on scroll + mobile menu
       - header element: <header id="siteHeader">
       - menu button:    #menuBtn   |  menu: #mainNav
    ========================================== */
    const header = $("#siteHeader") || $("header");
    const menuBtn = $("#menuBtn");
    const mainNav = $("#mainNav");

    function onScrollHeader() {
        if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
    }

    if (menuBtn && mainNav) {
        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", function () {
            const open = mainNav.classList.toggle("is-open");
            menuBtn.setAttribute("aria-expanded", String(open));
            document.body.classList.toggle("menu-open", open);
        });

        // Close menu when a link is clicked or ESC is pressed
        mainNav.addEventListener("click", function (e) {
            if (e.target.closest("a")) closeMenu();
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMenu();
        });

        function closeMenu() {
            mainNav.classList.remove("is-open");
            menuBtn.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    }


    /* ==========================================
       4. SMOOTH SCROLL for #anchor links
    ========================================== */
    $$('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;

            const target = $(id);
            if (!target) return;

            e.preventDefault();
            const offset = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset - 10;

            window.scrollTo({ top: top, behavior: prefersReducedMotion ? "auto" : "smooth" });
        });
    });


    /* ==========================================
       5. REVEAL ON SCROLL
       Add class="reveal" to any element.
       CSS needed:
         .reveal{opacity:0;transform:translateY(24px);transition:.7s ease}
         .reveal.is-visible{opacity:1;transform:none}
    ========================================== */
    const revealEls = $$(".reveal");

    if (revealEls.length) {
        if ("IntersectionObserver" in window && !prefersReducedMotion) {
            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

            revealEls.forEach(function (el) { revealObserver.observe(el); });
        } else {
            revealEls.forEach(function (el) { el.classList.add("is-visible"); });
        }
    }


    /* ==========================================
       6. ANIMATED COUNTERS
       Use: <span class="counter" data-target="500" data-suffix="+">0</span>
    ========================================== */
    const counters = $$(".counter");

    function animateCounter(el) {
        const target = parseFloat(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || "";
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.round(target * eased).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    if (counters.length) {
        if ("IntersectionObserver" in window && !prefersReducedMotion) {
            const counterObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            counters.forEach(function (el) { counterObserver.observe(el); });
        } else {
            counters.forEach(function (el) {
                el.textContent = (parseFloat(el.dataset.target) || 0).toLocaleString() + (el.dataset.suffix || "");
            });
        }
    }


    /* ==========================================
       7. BACK TO TOP BUTTON
       Use: <button id="backToTop" aria-label="Back to top">↑</button>
       CSS: #backToTop{opacity:0;pointer-events:none}
            #backToTop.is-visible{opacity:1;pointer-events:auto}
    ========================================== */
    const backToTop = $("#backToTop");

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        });
    }

    // One throttled scroll handler for everything
    let ticking = false;
    window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            onScrollHeader();
            if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 600);
            ticking = false;
        });
    }, { passive: true });
    onScrollHeader();


    /* ==========================================
       8. CONTACT FORM
       - Inline validation (no ugly alert())
       - Loading state on the button
       - If the form has a real action="https://..." (Formspree, etc.)
         it sends the data with fetch; otherwise it shows a friendly notice.
       - Optional: <div id="formStatus" role="status" aria-live="polite"></div>
    ========================================== */
    const contactForm = $("#contactForm");

    if (contactForm) {
        let statusEl = $("#formStatus");
        if (!statusEl) {
            statusEl = document.createElement("div");
            statusEl.id = "formStatus";
            statusEl.setAttribute("role", "status");
            statusEl.setAttribute("aria-live", "polite");
            contactForm.appendChild(statusEl);
        }

        function showStatus(message, type) {
            statusEl.textContent = message;
            statusEl.className = "form-status " + type; // style .form-status.success / .error / .info
        }

        function validateForm() {
            let valid = true;

            $$("input, textarea, select", contactForm).forEach(function (field) {
                field.classList.remove("is-invalid");
                field.removeAttribute("aria-invalid");
            });

            $$("[required]", contactForm).forEach(function (field) {
                const empty = !field.value.trim();
                const badEmail = field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

                if (empty || badEmail) {
                    field.classList.add("is-invalid");
                    field.setAttribute("aria-invalid", "true");
                    if (valid) field.focus(); // focus first invalid field
                    valid = false;
                }
            });

            return valid;
        }

        // Clear error as the user types
        contactForm.addEventListener("input", function (e) {
            if (e.target.classList) e.target.classList.remove("is-invalid");
        });

        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!validateForm()) {
                showStatus(
                    t("Please fill in all required fields correctly.",
                      "必須項目を正しく入力してください。"),
                    "error"
                );
                return;
            }

            const endpoint = contactForm.getAttribute("action");
            const hasEndpoint = endpoint && /^https?:\/\//i.test(endpoint);

            // No sending service connected yet
            if (!hasEndpoint) {
                showStatus(
                    t("The contact form is not connected to a sending service yet. Please contact us by email.",
                      "お問い合わせフォームはまだ送信サービスに接続されていません。メールでご連絡ください。"),
                    "info"
                );
                return;
            }

            const submitBtn = $('[type="submit"]', contactForm);
            const originalText = submitBtn ? submitBtn.textContent : "";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = t("Sending...", "送信中...");
            }

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { Accept: "application/json" }
                });

                if (!response.ok) throw new Error("Request failed");

                contactForm.reset();
                showStatus(
                    t("Thank you! Your message has been sent.",
                      "ありがとうございます。メッセージを送信しました。"),
                    "success"
                );
            } catch (error) {
                showStatus(
                    t("Something went wrong. Please try again or email us.",
                      "送信に失敗しました。もう一度お試しいただくか、メールでご連絡ください。"),
                    "error"
                );
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }


    /* ==========================================
       9. ACTIVE NAV LINK (scroll spy)
    ========================================== */
    const navLinks = $$("#mainNav a[href^='#']");
    if (navLinks.length && "IntersectionObserver" in window) {
        const spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (a) {
                    a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
                    if (a.classList.contains("is-active")) {
                        const nav = a.parentElement;
                        nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.clientWidth) / 2, behavior: "smooth" });
                    }
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        navLinks.forEach(function (a) {
            const sec = $(a.getAttribute("href"));
            if (sec) spy.observe(sec);
        });
    }

});
>>>>>>> 9ff4162 (Update polished website design)
