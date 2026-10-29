/**
 * Islamic Wedding Invitation — Master Application Controller
 * Design Authority: Stitch Project 1730933329537106473 ("Nocturnal Royal Court")
 * Task 04: Functional Integrations & Configuration Orchestration
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.WEDDING_CONFIG;
  if (!config) {
    console.error('[App] WEDDING_CONFIG is missing.');
    return;
  }

  console.info('Initializing Wedding Application with Central Configuration...');

  // 1. Initialize Functional Modules with Central Configuration
  if (window.WeddingShare) {
    window.WeddingShare.init(config);
  }

  if (window.WeddingCountdown) {
    window.WeddingCountdown.init(config);
  }

  if (window.WeddingCalendar) {
    window.WeddingCalendar.init(config);
  }

  if (window.WeddingRSVP) {
    window.WeddingRSVP.init(config);
  }

  if (window.WeddingAudio) {
    window.WeddingAudio.init(config);
  }

  // 2. Gatefold Opening Decree Trigger
  const sealButton = document.getElementById('revealDecreeBtn');
  const heroSection = document.getElementById('royal-hero');
  if (sealButton && heroSection) {
    sealButton.addEventListener('click', (event) => {
      event.preventDefault();
      sealButton.setAttribute('aria-expanded', 'true');
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // 3. Bottom Roman Numeral Navigation & Section Tracking
  const navTabs = document.querySelectorAll('.nav-tab-item');
  const sections = document.querySelectorAll('.screen-section');

  navTabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = tab.getAttribute('href')?.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            navTabs.forEach((tab) => {
              if (tab.getAttribute('data-section') === currentId) {
                tab.classList.add('active');
                tab.setAttribute('aria-current', 'page');
              } else {
                tab.classList.remove('active');
                tab.removeAttribute('aria-current');
              }
            });
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // 4. Venue Map Actions Discipline
  const mapButtons = document.querySelectorAll('.btn-event-map');
  mapButtons.forEach((btn) => {
    const eventId = btn.getAttribute('data-event-id');
    const evt = config.events.find((e) => e.id === eventId);
    const isVerified = evt && evt.isMapVerified && evt.mapUrl;

    if (!isVerified) {
      btn.setAttribute('aria-disabled', 'true');
      btn.classList.add('btn-royal-disabled');
      btn.setAttribute('title', 'Venue coordinates awaiting family confirmation');

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const venue = evt ? evt.venueName : 'Venue';
        const msg = `Verified map directions for ${venue} will be activated once GPS coordinates are confirmed by the host family.`;
        if (window.WeddingUI && window.WeddingUI.showToast) {
          window.WeddingUI.showToast(msg);
        } else {
          alert(msg);
        }
      });
    } else {
      btn.removeAttribute('aria-disabled');
      btn.classList.remove('btn-royal-disabled');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(evt.mapUrl, '_blank', 'noopener,noreferrer');
      });
    }
  });

  // 5. Send Du'a Benediction Toast Trigger
  const duaBtn = document.getElementById('duaButton');
  const toastEl = document.getElementById('blessingToast');
  if (duaBtn && toastEl) {
    duaBtn.addEventListener('click', () => {
      toastEl.style.display = 'block';
      duaBtn.style.opacity = '0.6';
      duaBtn.style.pointerEvents = 'none';
      duaBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px;">check</span><span>Du’a Offered</span>';
      if (window.WeddingUI && window.WeddingUI.showToast) {
        window.WeddingUI.showToast('Your benediction has been graciously recorded in the guestbook.', 'favorite');
      }
    });
  }
});
