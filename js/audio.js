/**
 * Islamic Wedding Invitation — Ambient Audio Controller Module
 * Design Authority: Stitch Project 1730933329537106473 ("Nocturnal Royal Court")
 * 
 * STRICT AUDIO POLICIES:
 * - NO AUTOPLAY: Playback exclusively starts upon deliberate user tap/click.
 * - ASSET DISCIPLINE: If no approved local audio file is supplied, remains safely disabled.
 * - ACCESSIBILITY: Supports prefers-reduced-motion and synchronizes ARIA states.
 * - ERROR HANDLING: Traps autoplay policy restrictions and missing asset errors gracefully.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WeddingAudio = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {

  let audioElement = null;
  let isPlaying = false;
  let waveIntervalId = null;

  /**
   * Initializes audio controller and binds to header and hero controls.
   * @param {Object} config
   */
  function init(config = (typeof window !== 'undefined' ? window.WEDDING_CONFIG : null)) {
    const headerBtn = document.getElementById('headerAudioBtn');
    const heroBtn = document.getElementById('heroAudioToggleBtn');
    const isAudioApproved = config && config.features && config.features.isAudioEnabled();
    const assetUrl = config && config.audio ? config.audio.assetUrl : null;

    // Visual equalizer bar elements inside hero strip
    const soundBars = document.querySelectorAll('.sound-bar');
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function randomizeBars() {
      if (prefersReducedMotion || !soundBars.length) return;
      soundBars.forEach(bar => {
        const h = Math.floor(Math.random() * 14) + 4;
        bar.style.height = `${h}px`;
      });
    }

    function resetBars() {
      if (soundBars.length >= 4) {
        soundBars[0].style.height = '8px';
        soundBars[1].style.height = '16px';
        soundBars[2].style.height = '12px';
        soundBars[3].style.height = '20px';
      }
    }

    function updateUIState(playing) {
      isPlaying = playing;

      // Update header button
      if (headerBtn) {
        const icon = headerBtn.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = playing ? 'volume_up' : 'music_note';
        }
        headerBtn.setAttribute('aria-pressed', String(playing));
      }

      // Update hero toggle button
      if (heroBtn) {
        const icon = heroBtn.querySelector('.audio-icon-box .material-symbols-outlined');
        if (icon) {
          icon.textContent = playing ? 'pause' : 'play_arrow';
        }
        heroBtn.setAttribute('aria-pressed', String(playing));
      }

      // Manage animated sound wave bars
      if (playing && !prefersReducedMotion) {
        if (!waveIntervalId) {
          waveIntervalId = setInterval(randomizeBars, 200);
        }
      } else {
        if (waveIntervalId) {
          clearInterval(waveIntervalId);
          waveIntervalId = null;
        }
        resetBars();
      }
    }

    // IF AUDIO IS NOT CONFIGURED OR UNAPPROVED:
    if (!isAudioApproved || !assetUrl) {
      const disabledTitle = 'Ambient audio accompaniment will be enabled once confirmed by the family';

      [headerBtn, heroBtn].forEach(btn => {
        if (!btn) return;
        btn.setAttribute('aria-disabled', 'true');
        btn.classList.add('btn-royal-disabled');
        btn.setAttribute('title', disabledTitle);

        btn.addEventListener('click', (event) => {
          event.preventDefault();
          const notice = 'Ambient audio accompaniment is pending family track selection.';
          if (window.WeddingUI && window.WeddingUI.showToast) {
            window.WeddingUI.showToast(notice);
          } else {
            alert(notice);
          }
        });
      });

      return {
        isAvailable: () => false,
        isPlaying: () => false,
        toggle: () => false
      };
    }

    // IF APPROVED AUDIO IS PRESENT:
    try {
      audioElement = new Audio(assetUrl);
      audioElement.loop = true;
      audioElement.preload = 'none';

      audioElement.addEventListener('ended', () => updateUIState(false));
      audioElement.addEventListener('error', (e) => {
        console.warn('[Audio] Failed to load audio file:', e);
        updateUIState(false);
      });
    } catch (err) {
      console.warn('[Audio] HTML5 Audio constructor error:', err);
    }

    function togglePlayPause() {
      if (!audioElement) return;

      if (!isPlaying) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => updateUIState(true))
            .catch(err => {
              console.info('[Audio] Playback prevented by browser policy:', err.message);
              updateUIState(false);
            });
        }
      } else {
        audioElement.pause();
        updateUIState(false);
      }
    }

    [headerBtn, heroBtn].forEach(btn => {
      if (!btn) return;
      btn.removeAttribute('aria-disabled');
      btn.classList.remove('btn-royal-disabled');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePlayPause();
      });
    });

    return {
      isAvailable: () => true,
      isPlaying: () => isPlaying,
      toggle: togglePlayPause
    };
  }

  return {
    init
  };
});
