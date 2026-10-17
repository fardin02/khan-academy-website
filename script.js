/* ==========================================
   KHAN JAPANESE LANGUAGE & CAREER ACADEMY
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