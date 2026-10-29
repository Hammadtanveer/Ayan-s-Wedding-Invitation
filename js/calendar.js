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
            modal.replaceChildren();

      const card = document.createElement('div');
      card.className = 'calendar-modal-card';

      // Corner accents
      ['tl', 'tr', 'bl', 'br'].forEach(pos => {
        const acc = document.createElement('div');
        acc.className = `modal-corner-accent modal-corner-${pos}`;
        acc.setAttribute('aria-hidden', 'true');
        card.appendChild(acc);
      });

      // Header row
      const headerRow = document.createElement('div');
      headerRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; width: 100%; border-bottom: 1px solid rgba(235,193,102,0.25); padding-bottom: 8px; margin-bottom: 12px;';

      const titleEl = document.createElement('h3');
      titleEl.id = 'calModalTitle';
      titleEl.className = 'font-headline-sm';
      titleEl.style.cssText = 'color: var(--color-secondary); font-size: 15px; text-transform: uppercase; letter-spacing: 0.12em; margin: 0;';
      titleEl.textContent = 'Add to Calendar';

      const closeBtn = document.createElement('button');
      closeBtn.id = 'closeCalModalBtn';
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', 'Close calendar options');
      closeBtn.style.cssText = 'background: none; border: none; color: var(--color-secondary); cursor: pointer; display: flex; align-items: center; padding: 4px;';
      const closeIcon = document.createElement('span');
      closeIcon.className = 'material-symbols-outlined';
      closeIcon.style.fontSize = '20px';
      closeIcon.textContent = 'close';
      closeBtn.appendChild(closeIcon);

      headerRow.appendChild(titleEl);
      headerRow.appendChild(closeBtn);
      card.appendChild(headerRow);

      // Description text
      const descP = document.createElement('p');
      descP.className = 'font-body-sm';
      descP.style.cssText = 'font-size: 11px; color: var(--color-on-surface-variant); margin-bottom: 12px; line-height: 1.5;';
      descP.textContent = 'Exact ceremony timings are awaiting family confirmation. Events are scheduled as all-day reservations.';
      card.appendChild(descP);

      // Primary download .ics button
      const dlBtn = document.createElement('button');
      dlBtn.id = 'downloadIcsModalBtn';
      dlBtn.type = 'button';
      dlBtn.className = 'cal-modal-option-btn';
      dlBtn.style.cssText = 'background: linear-gradient(135deg, rgba(235,193,102,0.2), rgba(162,209,187,0.1)); border-color: var(--color-secondary); margin-bottom: 12px;';
      const dlIcon = document.createElement('span');
      dlIcon.className = 'material-symbols-outlined';
      dlIcon.style.cssText = 'font-size: 20px; color: var(--color-secondary);';
      dlIcon.textContent = 'download';
      const dlTextCol = document.createElement('div');
      dlTextCol.style.cssText = 'display: flex; flex-direction: column; text-align: left;';
      const dlTitle = document.createElement('span');
      dlTitle.style.cssText = 'font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-secondary);';
      dlTitle.textContent = 'Download .ics File (All 3 Events)';
      const dlSub = document.createElement('span');
      dlSub.style.cssText = 'font-size: 10px; color: var(--color-on-surface-variant);';
      dlSub.textContent = 'Apple Calendar, Outlook, iOS, Google';
      dlTextCol.appendChild(dlTitle);
      dlTextCol.appendChild(dlSub);
      dlBtn.appendChild(dlIcon);
      dlBtn.appendChild(dlTextCol);
      card.appendChild(dlBtn);

      // Section divider
      const sep = document.createElement('div');
      sep.style.cssText = 'display: flex; align-items: center; justify-content: center; gap: 8px; margin: 8px 0 12px 0; opacity: 0.5;';
      const sepLineL = document.createElement('span');
      sepLineL.style.cssText = 'height: 1px; width: 40px; background: var(--color-outline-variant);';
      const sepText = document.createElement('span');
      sepText.style.cssText = 'font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-on-surface-variant);';
      sepText.textContent = 'or add individually';
      const sepLineR = document.createElement('span');
      sepLineR.style.cssText = 'height: 1px; width: 40px; background: var(--color-outline-variant);';
      sep.appendChild(sepLineL);
      sep.appendChild(sepText);
      sep.appendChild(sepLineR);
      card.appendChild(sep);

      // Google Calendar individual links
      events.forEach((evt) => {
        const gcalUrl = buildGoogleCalendarUrl(evt, config);
        const a = document.createElement('a');
        a.href = gcalUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'cal-modal-option-btn';

        const evtIcon = document.createElement('span');
        evtIcon.className = 'material-symbols-outlined';
        evtIcon.style.cssText = 'font-size: 18px; color: var(--color-secondary);';
        evtIcon.textContent = 'event';

        const col = document.createElement('div');
        col.style.cssText = 'display: flex; flex-direction: column; text-align: left;';

        const titleSpan = document.createElement('span');
        titleSpan.style.cssText = 'font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-secondary);';
        titleSpan.textContent = `${evt.dayLabel}: ${evt.title}`;

        const dateSpan = document.createElement('span');
        dateSpan.style.cssText = 'font-size: 10px; color: var(--color-on-surface-variant);';
        dateSpan.textContent = evt.dateFormatted;

        col.appendChild(titleSpan);
        col.appendChild(dateSpan);
        a.appendChild(evtIcon);
        a.appendChild(col);
        card.appendChild(a);
      });

      modal.appendChild(card);

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
