/**
 * SAVLA HARI TRAVELS - Main JavaScript Engine
 * Handles WhatsApp Inquiries, Direct Calls, Filters, Modals, Fare Calculations, and Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  // Owner Contact Configuration
  const PRIMARY_PHONE = '9359685876';
  const SECONDARY_PHONE = '9689029182';
  const OWNER_EMAIL = 'savlahritravels@gmail.com';
  const WHATSAPP_COUNTRY_CODE = '91';

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // Sticky Navbar on Scroll
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Trip Type Tabs in Booking Form
  const tabButtons = document.querySelectorAll('.booking-tab-btn');
  const tripTypeInput = document.getElementById('inquiryTripType');
  const returnDateField = document.getElementById('returnDateWrapper');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tripType = btn.getAttribute('data-type');
      if (tripTypeInput) tripTypeInput.value = tripType;

      // Toggle return date visibility for One-Way vs Round Trip
      if (returnDateField) {
        if (tripType === 'One-Way Drop') {
          returnDateField.style.display = 'none';
        } else {
          returnDateField.style.display = 'block';
        }
      }
    });
  });

  // Quick Booking Form Submission (WhatsApp Integration)
  const bookingForm = document.getElementById('quickBookingForm');
  const feedbackBox = document.getElementById('bookingFeedback');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const pickup = document.getElementById('inquiryPickup')?.value.trim() || 'Pune';
      const destination = document.getElementById('inquiryDrop')?.value.trim() || 'Outstation';
      const departDate = document.getElementById('inquiryDate')?.value || 'As soon as possible';
      const returnDate = document.getElementById('inquiryReturnDate')?.value || 'N/A';
      const vehicle = document.getElementById('inquiryVehicle')?.value || 'Force Urbania 16 Seater';
      const name = document.getElementById('inquiryName')?.value.trim() || 'Valued Traveler';
      const phone = document.getElementById('inquiryPhone')?.value.trim() || '';
      const tripType = tripTypeInput ? tripTypeInput.value : 'Round Trip';

      // Build structured WhatsApp message
      const message = 
`*🚌 NEW BOOKING INQUIRY - SAVLA HARI TRAVELS 🚌*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📍 *Pickup Location:* ${pickup}
🏁 *Destination:* ${destination}
🧳 *Trip Type:* ${tripType}
🚐 *Vehicle Needed:* ${vehicle}
📅 *Departure Date:* ${departDate}
🔄 *Return Date:* ${returnDate}

_Hello Savla Hari Travels, please confirm availability and provide your best quotation._`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_COUNTRY_CODE}${PRIMARY_PHONE}?text=${encodedMsg}`;

      // Show confirmation UI
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <strong><i class="fas fa-check-circle me-1"></i> Opening WhatsApp to send your inquiry...</strong><br>
          If WhatsApp does not open automatically, <a href="${whatsappUrl}" target="_blank" class="fw-bold text-decoration-underline text-success">click here to chat directly</a> or call us at 
          <a href="tel:+91${PRIMARY_PHONE}" class="fw-bold text-danger">+91 ${PRIMARY_PHONE}</a> / 
          <a href="tel:+91${SECONDARY_PHONE}" class="fw-bold text-danger">+91 ${SECONDARY_PHONE}</a>.<br>
          <small class="text-muted">Email inquiry also sent to: ${OWNER_EMAIL}</small>
        `;
      }

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    });
  }

  // Fleet Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      vehicleCards.forEach(col => {
        if (filter === 'all' || col.getAttribute('data-category') === filter) {
          col.style.display = 'block';
        } else {
          col.style.display = 'none';
        }
      });
    });
  });

  // Direct Vehicle Inquiry Button Click (pre-fills WhatsApp message)
  window.inquireVehicle = function(vehicleName, rateText) {
    let rateInfo = rateText ? ` (${rateText})` : '';
    const message = 
`*🚌 VEHICLE INQUIRY - SAVLA HARI TRAVELS 🚌*

Hello, I am interested in hiring:
👉 *Vehicle:* ${vehicleName}${rateInfo}

Please share details regarding daily packages, availability, and best quotation for my upcoming journey from Pune.`;

    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_COUNTRY_CODE}${PRIMARY_PHONE}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  // Direct Tour Package Inquiry Button Click (pre-fills WhatsApp message)
  window.inquireTourPackage = function(tourName, duration) {
    const message = 
`*🗺️ TOUR PACKAGE INQUIRY - SAVLA HARI TRAVELS 🗺️*

Hello, I would like to inquire about the:
👉 *Tour Package:* ${tourName} (${duration})

Please share the pricing, itinerary, and available bus/Urbania/tempo traveller options from Pune.`;

    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_COUNTRY_CODE}${PRIMARY_PHONE}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  // Gallery Lightbox
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  // Interactive Fare Estimator
  const calcForm = document.getElementById('fareCalculatorForm');
  const calcResult = document.getElementById('calcResult');

  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const km = parseFloat(document.getElementById('calcKm')?.value || 0);
      const vehicleType = document.getElementById('calcVehicle')?.value || 'urbania-16';
      const days = parseInt(document.getElementById('calcDays')?.value || 1);

      // Base rates per km in Pune region
      let perKmRate = 33;
      let vehicleTitle = 'Force Urbania 16 Seater';

      if (vehicleType === 'urbania-16') {
        perKmRate = 33; // Exactly ₹33 per km as requested!
        vehicleTitle = 'Force Urbania 16 Seater Luxury Van (₹33/km)';
      } else if (vehicleType === '14') {
        perKmRate = 20;
        vehicleTitle = '14 Seater Tempo Traveller (₹20/km)';
      } else if (vehicleType === '17') {
        perKmRate = 22;
        vehicleTitle = '17 Seater Executive Tempo (₹22/km)';
      } else if (vehicleType === '20') {
        perKmRate = 25;
        vehicleTitle = '20 Seater Maharaja Tempo (₹25/km)';
      } else if (vehicleType === '26') {
        perKmRate = 30;
        vehicleTitle = '26 Seater Mini Bus (₹30/km)';
      } else if (vehicleType === '32') {
        perKmRate = 38;
        vehicleTitle = '32 Seater Luxury Coach (₹38/km)';
      } else if (vehicleType === '45') {
        perKmRate = 50;
        vehicleTitle = '45-50 Seater Luxury Coach (₹50/km)';
      }

      // Min 300 km/day calculation standard in Maharashtra
      const billableKm = Math.max(km, days * 300);
      const driverAllowance = days * 500;
      const estimatedFuelCost = billableKm * perKmRate;
      const totalEstimate = estimatedFuelCost + driverAllowance;

      if (calcResult) {
        calcResult.style.display = 'block';
        calcResult.innerHTML = `
          <div class="card p-3 border-warning bg-light">
            <h5 class="fw-bold text-dark mb-2"><i class="fas fa-calculator text-warning me-2"></i>Estimated Fare Breakdown</h5>
            <p class="mb-1"><strong>Vehicle:</strong> ${vehicleTitle}</p>
            <p class="mb-1"><strong>Rate:</strong> ₹${perKmRate} / km</p>
            <p class="mb-1"><strong>Estimated Billable Distance:</strong> ${billableKm} km (Min 300 km/day standard)</p>
            <p class="mb-1"><strong>Approximate Base Fare:</strong> ₹${totalEstimate.toLocaleString('en-IN')}*</p>
            <small class="text-muted d-block mb-3">*Note: Toll, parking & state permit taxes are extra as per actual receipts. Contact owner for final best discount.</small>
            <button type="button" class="btn btn-whatsapp btn-sm text-white" onclick="inquireFareWithDetails('${vehicleTitle}', ${km}, ${days}, ${totalEstimate})">
              <i class="fab fa-whatsapp me-1"></i> Send this Estimate to Owner for Final Booking
            </button>
          </div>
        `;
      }
    });
  }

  window.inquireFareWithDetails = function(vehicle, km, days, estimate) {
    const message = 
`*💰 FARE QUOTE REQUEST - SAVLA HARI TRAVELS 💰*

Hello, I calculated an approximate trip estimate on your website:
🚐 *Vehicle:* ${vehicle}
🛣️ *Estimated Distance:* ${km} km
📅 *Total Days:* ${days} day(s)
💵 *Website Estimate:* ₹${estimate}

Please provide your best discounted final package quote for this trip.`;

    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_COUNTRY_CODE}${PRIMARY_PHONE}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  // Contact Form Submission
  const contactForm = document.getElementById('contactUsForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const phone = document.getElementById('contactPhone')?.value || '';
      const msg = document.getElementById('contactMessage')?.value || '';

      const fullMessage = 
`*✉️ CONTACT MESSAGE - SAVLA HARI TRAVELS ✉️*

👤 *From:* ${name}
📞 *Phone:* ${phone}
📧 *Email Copy:* ${OWNER_EMAIL}
📝 *Message:* ${msg}

_Please get back to me regarding my inquiry._`;

      const encoded = encodeURIComponent(fullMessage);
      const url = `https://wa.me/${WHATSAPP_COUNTRY_CODE}${PRIMARY_PHONE}?text=${encoded}`;

      if (contactFeedback) {
        contactFeedback.style.display = 'block';
        contactFeedback.innerHTML = `<i class="fas fa-check-circle me-1"></i> Thank you ${name}! Opening WhatsApp to connect with Savla Hari Travels owner. Also reachable at ${OWNER_EMAIL}.`;
      }

      window.open(url, '_blank');
    });
  }
});
