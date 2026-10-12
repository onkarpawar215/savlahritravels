/* ============================================
   SAVLA HRI TRAVELS
   MAIN WEBSITE JAVASCRIPT
   ============================================ */

(() => {

    "use strict";

    // ==========================================
    // WHATSAPP SETTINGS
    // ==========================================

    const WHATSAPP_NUMBER = "919359685876";

    // Find an HTML element using its ID.
    const $ = (id) => document.getElementById(id);

    // Read a form field.
    function getValue(
        id,
        fallback = "Not provided"
    ) {

        const element = $(id);

        if (
            !element ||
            !element.value ||
            !element.value.trim()
        ) {

            return fallback;

        }

        return element.value.trim();

    }

    // ==========================================
    // OPEN WHATSAPP
    // ==========================================

    function openWhatsApp(message) {

        const url =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }

    // ==========================================
    // MOBILE THREE-LINE MENU
    // ==========================================

    function initNavigation() {

        const toggle = $("mobileToggle");

        const links = $("navLinks");

        // Do nothing if the menu is not on this page.
        if (!toggle || !links) {

            console.warn(
                "Mobile menu elements were not found."
            );

            return;

        }

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        // Open and close the menu.
        toggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    links.classList.toggle("is-open");

                toggle.classList.toggle(
                    "is-open",
                    isOpen
                );

                toggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "mobile-menu-open",
                    isOpen
                );

            }
        );

        // Close the menu when a link is selected.
        links.querySelectorAll("a").forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        links.classList.remove("is-open");

                        toggle.classList.remove("is-open");

                        toggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        document.body.classList.remove(
                            "mobile-menu-open"
                        );

                    }
                );

            }
        );

        // Close the menu using Escape.
        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    links.classList.remove("is-open");

                    toggle.classList.remove("is-open");

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "mobile-menu-open"
                    );

                }

            }
        );

    }

    // ==========================================
    // VEHICLE WHATSAPP INQUIRY
    // ==========================================

    window.inquireVehicle = function (
        vehicle,
        rate = ""
    ) {

        let message =
            "Hello Savla Hri Travels!\n\n" +
            "I would like to inquire about:\n" +
            vehicle +
            "\n";

        if (rate) {

            message +=
                "Listed rate: " +
                rate +
                "\n";

        }

        message +=
            "\nPlease share availability, " +
            "booking details and the final quotation.\n\n" +
            "Thank you.";

        openWhatsApp(message);

    };

    // ==========================================
    // TOUR PACKAGE WHATSAPP INQUIRY
    // ==========================================

    window.inquireTourPackage = function (
        tour,
        duration = ""
    ) {

        let message =
            "Hello Savla Hri Travels!\n\n" +
            "I am interested in this tour package:\n" +
            tour +
            "\n";

        if (duration) {

            message +=
                "Duration: " +
                duration +
                "\n";

        }

        message +=
            "\nPlease share the itinerary, available dates, " +
            "pricing and booking details.\n\n" +
            "Thank you.";

        openWhatsApp(message);

    };

    // ==========================================
    // QUICK BOOKING FORM
    // ==========================================

    function initBookingForm() {

        const form = $("quickBookingForm");

        if (!form) {

            return;

        }

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                // Check required form fields.
                if (!form.reportValidity()) {

                    return;

                }

                const tripType =
                    getValue(
                        "inquiryTripType",
                        "Round Trip"
                    );

                const pickup =
                    getValue("inquiryPickup");

                const destination =
                    getValue("inquiryDrop");

                const departureDate =
                    getValue("inquiryDate");

                const returnDate =
                    getValue(
                        "inquiryReturnDate",
                        "Not applicable"
                    );

                const vehicle =
                    getValue("inquiryVehicle");

                const name =
                    getValue("inquiryName");

                const phone =
                    getValue("inquiryPhone");

                const message =
                    "Hello Savla Hri Travels!\n\n" +
                    "I would like to request a travel booking.\n\n" +
                    "Trip type: " + tripType + "\n" +
                    "Pickup location: " + pickup + "\n" +
                    "Destination: " + destination + "\n" +
                    "Departure date: " + departureDate + "\n" +
                    "Return date: " + returnDate + "\n" +
                    "Vehicle: " + vehicle + "\n" +
                    "Name: " + name + "\n" +
                    "Phone: " + phone + "\n\n" +
                    "Please confirm vehicle availability " +
                    "and the final fare.\n\n" +
                    "Thank you.";

                const feedback =
                    $("bookingFeedback");

                if (feedback) {

                    feedback.textContent =
                        "Opening WhatsApp with your booking details...";

                }

                openWhatsApp(message);

            }
        );

        // One-way and round-trip buttons.
        const tripButtons =
            document.querySelectorAll(
                ".booking-tab-btn"
            );

        tripButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        tripButtons.forEach(
                            (tab) => {

                                tab.classList.toggle(
                                    "active",
                                    tab === button
                                );

                            }
                        );

                        const selectedType =
                            button.dataset.type ||
                            button.textContent.trim();

                        const tripTypeInput =
                            $("inquiryTripType");

                        if (tripTypeInput) {

                            tripTypeInput.value =
                                selectedType;

                        }

                        const returnWrapper =
                            $("returnDateWrapper");

                        const returnDateInput =
                            $("inquiryReturnDate");

                        const normalizedType =
                            selectedType.toLowerCase();

                        const oneWay =
                            normalizedType.includes("one-way") ||
                            normalizedType.includes("one way");

                        if (returnWrapper) {

                            returnWrapper.style.display =
                                oneWay ? "none" : "";

                        }

                        if (returnDateInput) {

                            returnDateInput.required =
                                !oneWay;

                            if (oneWay) {

                                returnDateInput.value = "";

                            }

                        }

                    }
                );

            }
        );

    }

    // ==========================================
    // CONTACT FORM
    // ==========================================

    function initContactForm() {

        const form = $("contactUsForm");

        if (!form) {

            return;

        }

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                if (!form.reportValidity()) {

                    return;

                }

                const name =
                    getValue("contactName");

                const phone =
                    getValue("contactPhone");

                const userMessage =
                    getValue("contactMessage");

                const message =
                    "Hello Savla Hri Travels!\n\n" +
                    "I have a question.\n\n" +
                    "Name: " + name + "\n" +
                    "Phone: " + phone + "\n" +
                    "Message: " + userMessage + "\n\n" +
                    "Please contact me. Thank you.";

                const feedback =
                    $("contactFeedback");

                if (feedback) {

                    feedback.textContent =
                        "Opening WhatsApp with your message...";

                }

                openWhatsApp(message);

            }
        );

    }

    // ==========================================
    // FARE CALCULATOR
    // ==========================================

    function initFareCalculator() {

        const form = $("fareCalculatorForm");

        if (!form) {

            return;

        }

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const vehicleSelect =
                    $("calcVehicle");

                const kmInput =
                    $("calcKm");

                const daysInput =
                    $("calcDays");

                if (
                    !vehicleSelect ||
                    !kmInput ||
                    !daysInput
                ) {

                    return;

                }

                const vehicle =
                    vehicleSelect.value;

                const km =
                    Number(kmInput.value);

                const days =
                    Number(daysInput.value);

                if (
                    !Number.isFinite(km) ||
                    !Number.isFinite(days) ||
                    km <= 0 ||
                    days <= 0
                ) {

                    alert(
                        "Please enter a valid distance and number of days."
                    );

                    return;

                }

                // Example rates only.
                // Update these to your actual business rates.
                const rates = {

                    "urbania-16": 33,
                    "14": 20,
                    "17": 22,
                    "20": 25,
                    "26": 30,
                    "32": 38,
                    "45": 50

                };

                const rate =
                    rates[vehicle] || 33;

                // Example minimum distance per day.
                const minimumKm =
                    300 * days;

                const billableKm =
                    Math.max(km, minimumKm);

                const vehicleFare =
                    billableKm * rate;

                const driverAllowance =
                    500 * days;

                const total =
                    vehicleFare + driverAllowance;

                const vehicleName =
                    vehicleSelect
                        .selectedOptions[0]
                        ?.textContent ||
                    "Selected vehicle";

                const result =
                    $("calcResult");

                if (!result) {

                    return;

                }

                result.style.display = "block";

                // Build the result safely.
                result.replaceChildren();

                const box =
                    document.createElement("div");

                box.className =
                    "fare-result-box";

                const heading =
                    document.createElement("h5");

                heading.textContent =
                    "Estimated Fare";

                box.appendChild(heading);

                function addLine(label, value) {

                    const paragraph =
                        document.createElement("p");

                    paragraph.textContent =
                        label + ": " + value;

                    box.appendChild(paragraph);

                }

                addLine(
                    "Vehicle",
                    vehicleName
                );

                addLine(
                    "Billable distance",
                    billableKm.toLocaleString("en-IN") +
                    " km"
                );

                addLine(
                    "Vehicle fare",
                    "₹" +
                    vehicleFare.toLocaleString("en-IN")
                );

                addLine(
                    "Driver allowance",
                    "₹" +
                    driverAllowance.toLocaleString("en-IN")
                );

                const totalLine =
                    document.createElement("p");

                totalLine.className =
                    "fare-total";

                totalLine.textContent =
                    "Estimated total: ₹" +
                    total.toLocaleString("en-IN");

                box.appendChild(totalLine);

                const note =
                    document.createElement("small");

                note.textContent =
                    "This is an estimate only. Tolls, parking, " +
                    "permits, taxes and other charges may be extra. " +
                    "Please confirm the final quotation with Savla Hri Travels.";

                box.appendChild(note);

                const whatsappButton =
                    document.createElement("button");

                whatsappButton.type =
                    "button";

                whatsappButton.className =
                    "btn-whatsapp mt-3";

                whatsappButton.textContent =
                    "Ask Owner on WhatsApp";

                whatsappButton.addEventListener(
                    "click",
                    () => {

                        const message =
                            "Hello Savla Hri Travels!\n\n" +
                            "Please confirm the fare for my trip.\n\n" +
                            "Vehicle: " + vehicleName + "\n" +
                            "Distance: " + km + " km\n" +
                            "Days: " + days + "\n" +
                            "Estimated fare: ₹" +
                            total.toLocaleString("en-IN") +
                            "\n\nPlease send the final quotation.";

                        openWhatsApp(message);

                    }
                );

                box.appendChild(whatsappButton);

                result.appendChild(box);

                result.scrollIntoView({

                    behavior: "smooth",

                    block: "nearest"

                });

            }
        );

    }

    // ==========================================
    // INITIALIZE WEBSITE FEATURES
    // ==========================================

    function initWebsite() {

        initNavigation();

        initBookingForm();

        initContactForm();

        initFareCalculator();

        console.log(
            "Savla Hri Travels JavaScript loaded successfully."
        );

    }

    // Wait for HTML to finish loading.
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initWebsite
        );

    } else {

        initWebsite();

    }

})();
/* =========================================================
   SAVLA HRI TRAVELS - AUTOMATIC GALLERY SLIDER
   Changes the visible group of photos automatically
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector(".gallery-grid");

    if (!gallery) {
        return;
    }

    const photos = Array.from(
        gallery.querySelectorAll(".gallery-item")
    );

    // At least 5 photos are required to see a change.
    if (photos.length <= 4) {
        return;
    }

    let currentIndex = 0;

    // Display four photos at a time.
    const visibleCount = 4;

    function showGalleryPhotos() {

        photos.forEach(function (photo, index) {

            const relativeIndex =
                (index - currentIndex + photos.length) %
                photos.length;

            const isVisible = relativeIndex < visibleCount;

            photo.style.display = isVisible ? "block" : "none";

            if (isVisible) {
                photo.style.opacity = "1";
                photo.style.transform = "translateX(0)";
            }
        });

        // Advance to the next group of photos.
        currentIndex =
            (currentIndex + visibleCount) % photos.length;
    }

    showGalleryPhotos();

    // Change the photos every 4 seconds.
    setInterval(showGalleryPhotos, 4000);

});
/* =========================================================
   SAVLA HRI TRAVELS - AUTOMATIC GALLERY SLIDER
   Changes the visible group of photos automatically
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector(".gallery-grid");

    if (!gallery) {
        return;
    }

    const photos = Array.from(
        gallery.querySelectorAll(".gallery-item")
    );

    // At least 5 photos are required to see a change.
    if (photos.length <= 4) {
        return;
    }

    let currentIndex = 0;

    // Display four photos at a time.
    const visibleCount = 4;

    function showGalleryPhotos() {

        photos.forEach(function (photo, index) {

            const relativeIndex =
                (index - currentIndex + photos.length) %
                photos.length;

            const isVisible = relativeIndex < visibleCount;

            photo.style.display = isVisible ? "block" : "none";

            if (isVisible) {
                photo.style.opacity = "1";
                photo.style.transform = "translateX(0)";
            }
        });

        // Advance to the next group of photos.
        currentIndex =
            (currentIndex + visibleCount) % photos.length;
    }

    showGalleryPhotos();

    // Change the photos every 4 seconds.
    setInterval(showGalleryPhotos, 4000);

});