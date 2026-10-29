/**
 * Islamic Wedding Invitation — Countdown Timer Module
 * Design Authority: Stitch Project 1730933329537106473 ("Nocturnal Royal Court")
 * 
 * Accurately computes remaining time in Asia/Kolkata timezone (+05:30).
 * Handles past target timestamps safely (floors at 0).
 * Avoids per-frame rendering by updating once per second.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WeddingCountdown = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {

  let timerInterval = null;

  /**
   * Calculates time breakdown from target timestamp down to 0.
   * @param {number} targetEpochMs UTC millisecond epoch of target.
   * @param {number} currentEpochMs UTC millisecond epoch of current time (default: Date.now()).
   * @returns {{ days: number, hours: number, minutes: number, seconds: number, isElapsed: boolean, totalMs: number }}
   */
  function calculateTimeDelta(targetEpochMs, currentEpochMs = Date.now()) {
    const totalMs = Math.max(0, targetEpochMs - currentEpochMs);
    const isElapsed = totalMs <= 0;

    const seconds = Math.floor((totalMs / 1000) % 60);
    const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
    const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds,
      isElapsed,
      totalMs
    };
  }

  /**
   * Helper to format numbers with leading zeroes.
   * @param {number} n
   * @returns {string}
   */
  function padZero(n) {
    return n < 10 ? '0' + n : String(n);
  }

  /**
   * Renders countdown state to DOM elements.
   * Uses textContent to prevent XSS.
   */
  function updateDOM(elements, delta) {
    if (!elements) return;

    if (elements.days) {
      elements.days.textContent = String(delta.days);
    }
    if (elements.hours) {
      elements.hours.textContent = padZero(delta.hours);
    }
    if (elements.minutes) {
      elements.minutes.textContent = padZero(delta.minutes);
    }
    if (elements.seconds) {
      elements.seconds.textContent = padZero(delta.seconds);
    }
  }

  /**
   * Initializes countdown loop.
   * @param {Object} config Configuration object (default: window.WEDDING_CONFIG).
   * @returns {{ stop: Function, tick: Function, getDelta: Function }}
   */
  function init(config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    if (!config || !config.targetDate) {
      console.warn('[Countdown] No targetDate configuration found.');
      return null;
    }

    const targetIso = config.targetDate.isoDateTime || '2026-11-20T00:00:00+05:30';
    const targetEpoch = Date.parse(targetIso);

    if (isNaN(targetEpoch)) {
      console.error('[Countdown] Invalid target ISO timestamp:', targetIso);
      return null;
    }

    const elements = {
      days: document.getElementById('countdownDays'),
      hours: document.getElementById('countdownHours'),
      minutes: document.getElementById('countdownMinutes'),
      seconds: document.getElementById('countdownSeconds'),
      timerContainer: document.querySelector('[role="timer"]')
    };

    function tick() {
      const delta = calculateTimeDelta(targetEpoch, Date.now());
      updateDOM(elements, delta);

      if (delta.isElapsed && timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        if (elements.timerContainer) {
          elements.timerContainer.setAttribute('aria-label', 'The auspicious wedding day has arrived. Mubarak!');
        }
      }
      return delta;
    }

    // Run initial tick immediately
    tick();

    // Clear any previous running timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    // Update once per second
    timerInterval = setInterval(tick, 1000);

    return {
      stop: function () {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      },
      tick,
      getDelta: function () {
        return calculateTimeDelta(targetEpoch, Date.now());
      }
    };
  }

  return {
    init,
    calculateTimeDelta,
    padZero
  };
});
