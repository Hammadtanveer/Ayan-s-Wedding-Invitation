/**
 * Islamic Wedding Invitation — Web Share & Toast Feedback Module
 * Design Authority: Stitch Project 1730933329537106473 ("Nocturnal Royal Court")
 * 
 * Progressive enhancement for sharing:
 * 1. Native Web Share API (mobile/modern browsers).
 * 2. Clipboard API fallback (desktop/unsupported share environments).
 * 3. Accessible toast alert rendering using approved Nocturnal Royal Court tokens.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WeddingShare = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {

  let activeToastTimeout = null;

  /**
   * Displays an accessible, design-consistent floating feedback toast.
   * Uses Nocturnal Royal Court dark emerald and gold styling.
   * @param {string} message
   * @param {string} iconName Material symbol icon name (default: 'info')
   * @param {number} durationMs Display duration in milliseconds (default: 3500)
   */
  function showToast(message, iconName = 'info', durationMs = 3500) {
    let toast = document.getElementById('royalToastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'royalToastNotice';
      toast.className = 'royal-toast-container';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    // Clear any previous dismissal timer
    if (activeToastTimeout) {
      clearTimeout(activeToastTimeout);
      activeToastTimeout = null;
    }

    toast.replaceChildren();
    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-outlined royal-toast-icon';
    iconSpan.textContent = iconName;
    const textSpan = document.createElement('span');
    textSpan.className = 'royal-toast-text';
    textSpan.textContent = message;
    toast.appendChild(iconSpan);
    toast.appendChild(textSpan);

    toast.classList.add('visible');

    activeToastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
      activeToastTimeout = null;
    }, durationMs);
  }

  /**
   * Executes share flow via Web Share API or Clipboard fallback.
   * @param {Object} config
   */
  async function triggerShare(config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const shareTitle = config && config.share ? config.share.title : document.title;
    const shareText = config && config.share ? config.share.text : 'Royal Wedding Invitation — Mohd. Ayan Siddiqui & Sumaira Khan';
    const shareUrl = window.location.href;

    // 1. Try Native Web Share API
    if (navigator && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        showToast('Invitation shared successfully!', 'check');
        return true;
      } catch (err) {
        // User cancellation is not an error; ignore AbortError
        if (err.name === 'AbortError') {
          return false;
        }
        console.info('[Share] Web Share failed, falling back to clipboard copy:', err.message);
      }
    }

    // 2. Clipboard API Fallback
    if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Invitation link copied to clipboard!', 'check');
        return true;
      } catch (copyErr) {
        console.warn('[Share] Clipboard writeText failed:', copyErr);
      }
    }

    // 3. Last-resort fallback for older legacy contexts
    try {
      const tempInput = document.createElement('input');
      tempInput.value = shareUrl;
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      const success = document.execCommand('copy');
      document.body.removeChild(tempInput);
      if (success) {
        showToast('Invitation link copied to clipboard!', 'check');
        return true;
      }
    } catch (e) {
      // Ignored
    }

    showToast(`Invitation URL: ${shareUrl}`, 'link');
    return false;
  }

  /**
   * Initializes the Share button in Screen 7.
   * @param {Object} config
   */
  function init(config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const shareBtn = document.getElementById('shareInviteBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerShare(config);
      });
    }

    // Expose showToast globally via window.WeddingUI for other modules
    if (typeof window !== 'undefined') {
      window.WeddingUI = window.WeddingUI || {};
      window.WeddingUI.showToast = showToast;
    }
  }

  return {
    init,
    triggerShare,
    showToast
  };
});
