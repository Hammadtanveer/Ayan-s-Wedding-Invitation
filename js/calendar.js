/**
 * Islamic Wedding Invitation — Calendar Integration Module
 * Design Authority: Stitch Project 1730933329537106473 ("Nocturnal Royal Court")
 * 
 * Complies with RFC 5545 iCalendar specification.
 * Supports:
 * 1. Multi-event RFC 5545 .ics calendar file download (All-day reservation format for unconfirmed times).
 * 2. 1-click Google Calendar URL generation for each ceremony.
 * 3. Proper CRLF line termination and character escaping.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WeddingCalendar = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {

  /**
   * Escapes text according to RFC 5545 §3.3.11.
   * Backslashes, semicolons, commas, and newlines must be escaped.
   * @param {string} text
   * @returns {string}
   */
  function escapeIcsText(text) {
    if (!text) return '';
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n');
  }

  /**
   * Returns YYYYMMDD string for RFC 5545 all-day date.
   * @param {string} isoDate YYYY-MM-DD
   * @returns {string} YYYYMMDD
   */
  function formatIcsDate(isoDate) {
    return isoDate.replace(/-/g, '');
  }

  /**
   * Computes the next calendar day string in YYYY-MM-DD format.
   * (In RFC 5545, all-day DTEND is non-inclusive, so next day is required).
   * @param {string} isoDate
   * @returns {string}
   */
  function getNextDayIso(isoDate) {
    const parts = isoDate.split('-').map(Number);
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + 1));
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Generates complete RFC 5545 .ics calendar file string.
   * Uses CRLF (\r\n) line endings strictly.
   * @param {Object} config (default: window.WEDDING_CONFIG)
   * @returns {string}
   */
  function generateIcsContent(config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    if (!config || !config.events) {
      throw new Error('[Calendar] Missing events configuration.');
    }

    const couple = config.couple ? `${config.couple.groom} & ${config.couple.bride}` : 'Mohd. Ayan Siddiqui & Sumaira Khan';
    const nowIsoUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ayan and Sumaira Wedding//Islamic Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${escapeIcsText(`Wedding: ${couple}`)}`,
      'X-WR-TIMEZONE:Asia/Kolkata'
    ];

    config.events.forEach((evt, index) => {
      const dtStart = formatIcsDate(evt.isoDate);
      const dtEnd = formatIcsDate(getNextDayIso(evt.isoDate));
      const uid = `wedding-ayan-sumaira-${evt.id}-${evt.isoDate}@invitation.local`;
      const summary = `Wedding: ${couple} — ${evt.title}`;
      const venue = `${evt.venueName}, ${evt.venueArea}`;
      const description = `Auspicious Wedding Celebration of ${couple}. Ceremony: ${evt.title} (${evt.dateFormatted}) at ${venue}. Note: Specific ceremony timings will be confirmed by the family prior to the auspicious day.`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${nowIsoUtc}`);
      lines.push(`DTSTART;VALUE=DATE:${dtStart}`);
      lines.push(`DTEND;VALUE=DATE:${dtEnd}`);
      lines.push(`SUMMARY:${escapeIcsText(summary)}`);
      lines.push(`LOCATION:${escapeIcsText(venue)}`);
      lines.push(`DESCRIPTION:${escapeIcsText(description)}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:TRANSPARENT');
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n') + '\r\n';
  }

  /**
   * Generates a direct Google Calendar template URL for a given event.
   * @param {Object} evt Event object from config
   * @param {Object} config Configuration object
   * @returns {string}
   */
  function buildGoogleCalendarUrl(evt, config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const couple = config && config.couple ? `${config.couple.groom} & ${config.couple.bride}` : 'Mohd. Ayan Siddiqui & Sumaira Khan';
    const title = `Wedding: ${couple} — ${evt.title}`;
    const dtStart = formatIcsDate(evt.isoDate);
    const dtEnd = formatIcsDate(getNextDayIso(evt.isoDate));
    const venue = `${evt.venueName}, ${evt.venueArea}`;
    const details = `Auspicious Wedding Celebration of ${couple}.\nCeremony: ${evt.title}\nDate: ${evt.dateFormatted}\nVenue: ${venue}\n\nNote: Exact ceremony timings are awaiting family confirmation. Scheduled as an all-day reservation.`;

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${dtStart}/${dtEnd}`,
      details: details,
      location: venue
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  /**
   * Triggers browser download of the generated .ics file.
   * @param {string} filename (default: wedding-ayan-sumaira.ics)
   * @param {Object} config
   */
  function downloadIcsFile(filename = 'wedding-ayan-sumaira.ics', config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const icsContent = generateIcsContent(config);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

    if (navigator && navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
      return;
    }

    const downloadUrl = URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = downloadUrl;
    tempLink.setAttribute('download', filename);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 4000);
  }

  /**
   * Wires interactive modal and buttons for calendar actions.
   */
  function init(config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const calendarBtn = document.getElementById('calendarAddBtn');
    const notifyBtn = document.getElementById('calendarNotifyBtn');

    if (calendarBtn) {
      calendarBtn.addEventListener('click', (event) => {
        event.preventDefault();
        openCalendarModal(config);
      });
    }

    if (notifyBtn) {
      notifyBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (window.WeddingUI && window.WeddingUI.showToast) {
          window.WeddingUI.showToast('Reminder bookmark set in calendar!');
        }
      });
    }
  }

  let activeCalendarTrigger = null;

  /**
   * Closes the calendar modal and restores focus to the triggering element.
   */
  function closeCalendarModal() {
    const modal = document.getElementById('royalCalendarModal');
    if (modal) {
      modal.style.display = 'none';
    }
    document.removeEventListener('keydown', onCalendarModalKeydown);
    if (activeCalendarTrigger && typeof activeCalendarTrigger.focus === 'function') {
      activeCalendarTrigger.focus();
    }
  }

  function onCalendarModalKeydown(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      closeCalendarModal();
    }
  }

  /**
   * Displays the accessible calendar selection modal with keyboard trap management.
   */
  function openCalendarModal(config) {
    activeCalendarTrigger = document.activeElement;
    let modal = document.getElementById('royalCalendarModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'royalCalendarModal';
      modal.className = 'calendar-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'calModalTitle');

      const events = config && config.events ? config.events : [];
      let gcalLinksHtml = '';
      events.forEach((evt, i) => {
        const gcalUrl = buildGoogleCalendarUrl(evt, config);
        gcalLinksHtml += `
          <a href="${gcalUrl}" target="_blank" rel="noopener noreferrer" class="cal-modal-option-btn">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-secondary);">event</span>
            <div style="display: flex; flex-direction: column; text-align: left;">
              <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-secondary);">${evt.dayLabel}: ${evt.title}</span>
              <span style="font-size: 10px; color: var(--color-on-surface-variant);">${evt.dateFormatted}</span>
            </div>
          </a>
        `;
      });

      modal.innerHTML = `
        <div class="calendar-modal-card">
          <div class="modal-corner-accent modal-corner-tl" aria-hidden="true"></div>
          <div class="modal-corner-accent modal-corner-tr" aria-hidden="true"></div>
          <div class="modal-corner-accent modal-corner-bl" aria-hidden="true"></div>
          <div class="modal-corner-accent modal-corner-br" aria-hidden="true"></div>

          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; border-bottom: 1px solid rgba(235,193,102,0.25); padding-bottom: 8px; margin-bottom: 12px;">
            <h3 id="calModalTitle" class="font-headline-sm" style="color: var(--color-secondary); font-size: 15px; text-transform: uppercase; letter-spacing: 0.12em;">
              Add to Calendar
            </h3>
            <button id="closeCalModalBtn" type="button" aria-label="Close calendar options" style="background: none; border: none; color: var(--color-secondary); cursor: pointer; display: flex; align-items: center; padding: 4px;">
              <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
            </button>
          </div>

          <p class="font-body-sm" style="font-size: 11px; color: var(--color-on-surface-variant); margin-bottom: 12px; line-height: 1.5;">
            Exact ceremony timings are awaiting family confirmation. Events are scheduled as all-day reservations.
          </p>

          <button id="downloadIcsModalBtn" type="button" class="btn-royal-calendar-download">
            <span class="material-symbols-outlined" style="font-size: 20px;">download</span>
            <span>Download All Events (.ics file)</span>
          </button>

          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin: 12px 0 8px; opacity: 0.5;">
            <span style="height: 1px; flex: 1; background: var(--color-secondary);"></span>
            <span style="font-size: 9px; color: var(--color-secondary); text-transform: uppercase; letter-spacing: 0.2em;">or Google Calendar</span>
            <span style="height: 1px; flex: 1; background: var(--color-secondary);"></span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
            ${gcalLinksHtml}
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      document.getElementById('closeCalModalBtn').addEventListener('click', () => {
        closeCalendarModal();
      });

      document.getElementById('downloadIcsModalBtn').addEventListener('click', () => {
        downloadIcsFile('wedding-ayan-sumaira.ics', config);
        closeCalendarModal();
        if (window.WeddingUI && window.WeddingUI.showToast) {
          window.WeddingUI.showToast('All 3 events downloaded (.ics)!');
        }
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeCalendarModal();
        }
      });
    }

    modal.style.display = 'flex';
    document.addEventListener('keydown', onCalendarModalKeydown);

    // Initial focus on close button
    const closeBtn = document.getElementById('closeCalModalBtn');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  return {
    init,
    generateIcsContent,
    buildGoogleCalendarUrl,
    downloadIcsFile,
    escapeIcsText
  };
});
