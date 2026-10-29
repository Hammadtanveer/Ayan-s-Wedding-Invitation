/**
 * Islamic Wedding Invitation — WhatsApp RSVP Module
 * Design Authority: Stitch Project 1730933329537106473 ("Nocturnal Royal Court")
 * 
 * Manages guest count validation and pre-composed WhatsApp RSVP generation.
 * STRICT SECURITY/PRIVACY DISCIPLINE:
 * - Does not transmit data to any third-party analytics or databases.
 * - Phone number is unconfirmed in configuration (null); button remains visibly and accessibly disabled.
 * - Clicking disabled link provides informative user feedback rather than navigating to a broken/fake URL.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WeddingRSVP = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {

  /**
   * Cleans and normalizes phone number to international E.164 digits without plus.
   * e.g. "+91 98765-43210" -> "919876543210"
   * @param {string|null} phone
   * @returns {string|null}
   */
  function normalizePhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') return null;
    const cleanDigits = phone.replace(/[^0-9]/g, '');
    return cleanDigits.length >= 10 ? cleanDigits : null;
  }

  /**
   * Generates pre-composed message text for WhatsApp handoff.
   * @param {number} attendeeCount
   * @param {Object} config
   * @returns {string}
   */
  function buildRsvpMessage(attendeeCount, config) {
    const couple = config && config.couple ? `${config.couple.groom} & ${config.couple.bride}` : 'Mohd. Ayan Siddiqui & Sumaira Khan';
    const count = Math.max(1, Math.min(10, parseInt(attendeeCount, 10) || 1));
    return `Assalamu Alaikum! We are honored to confirm our presence at the royal wedding of ${couple}. Confirming attendees: ${count}.`;
  }

  /**
   * Generates WhatsApp deep link URL if phone number is valid; returns null otherwise.
   * @param {number} attendeeCount
   * @param {Object} config
   * @returns {string|null}
   */
  function generateWhatsAppUrl(attendeeCount, config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const rawPhone = config && config.rsvp ? config.rsvp.phoneNumber : null;
    const normalizedPhone = normalizePhoneNumber(rawPhone);
    const message = buildRsvpMessage(attendeeCount, config);

    if (normalizedPhone) {
      return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
    }
    // Universal WhatsApp share link when specific host number is open:
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }

  /**
   * Initializes RSVP counter controls and button behavior.
   * @param {Object} config
   */
  function init(config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const decBtn = document.getElementById('counterDecBtn');
    const incBtn = document.getElementById('counterIncBtn');
    const countDisplay = document.getElementById('attendeeCountDisplay');
    const rsvpLink = document.getElementById('whatsappRsvpLink');

    const minCount = config && config.rsvp ? (config.rsvp.minAttendees || 1) : 1;
    const maxCount = config && config.rsvp ? (config.rsvp.maxAttendees || 10) : 10;
    let currentCount = config && config.rsvp ? (config.rsvp.defaultAttendees || 2) : 2;

    function updateCount(newCount) {
      currentCount = Math.max(minCount, Math.min(maxCount, newCount));
      if (countDisplay) {
        countDisplay.textContent = String(currentCount);
        countDisplay.setAttribute('aria-valuenow', String(currentCount));
      }
      if (decBtn) {
        decBtn.disabled = currentCount <= minCount;
        decBtn.setAttribute('aria-disabled', String(currentCount <= minCount));
      }
      if (incBtn) {
        incBtn.disabled = currentCount >= maxCount;
        incBtn.setAttribute('aria-disabled', String(currentCount >= maxCount));
      }
    }

    if (decBtn && incBtn && countDisplay) {
      countDisplay.setAttribute('role', 'spinbutton');
      countDisplay.setAttribute('tabindex', '0');
      countDisplay.setAttribute('aria-label', 'Confirming attendees count');
      countDisplay.setAttribute('aria-valuemin', String(minCount));
      countDisplay.setAttribute('aria-valuemax', String(maxCount));
      countDisplay.setAttribute('aria-valuenow', String(currentCount));

      countDisplay.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
          e.preventDefault();
          updateCount(currentCount + 1);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
          e.preventDefault();
          updateCount(currentCount - 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          updateCount(minCount);
        } else if (e.key === 'End') {
          e.preventDefault();
          updateCount(maxCount);
        }
      });

      decBtn.addEventListener('click', () => updateCount(currentCount - 1));
      incBtn.addEventListener('click', () => updateCount(currentCount + 1));
      updateCount(currentCount);
    }

    // WhatsApp Action Button Setup
    if (rsvpLink) {
      const isEnabled = config && config.features && config.features.isRsvpEnabled();

      if (!isEnabled) {
        // Enforce safe disabled state because host phone number is unconfirmed
        rsvpLink.setAttribute('aria-disabled', 'true');
        rsvpLink.classList.add('btn-royal-disabled');
        rsvpLink.setAttribute('href', '#');
        rsvpLink.setAttribute('title', 'WhatsApp RSVP contact number is awaiting family confirmation');

        rsvpLink.addEventListener('click', (event) => {
          event.preventDefault();
          const host = config && config.rsvp && config.rsvp.hostName ? config.rsvp.hostName : 'the host family';
          const msg = `WhatsApp RSVP contact number for ${host} is awaiting confirmation. Please check back closer to the wedding date.`;
          if (window.WeddingUI && window.WeddingUI.showToast) {
            window.WeddingUI.showToast(msg);
          } else {
            alert(msg);
          }
        });
      } else {
        // Enabled state if verified phone number is supplied in future config
        rsvpLink.removeAttribute('aria-disabled');
        rsvpLink.classList.remove('btn-royal-disabled');

        rsvpLink.addEventListener('click', (event) => {
          event.preventDefault();
          const url = generateWhatsAppUrl(currentCount, config);
          if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        });
      }
    }
  }

  return {
    init,
    normalizePhoneNumber,
    buildRsvpMessage,
    generateWhatsAppUrl
  };
});
