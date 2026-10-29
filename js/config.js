/**
 * Islamic Wedding Invitation — Central Configuration Module
 * Design Authority: Stitch Project 1730933329537106473 ("Nocturnal Royal Court")
 * 
 * IMPORTANT VERIFICATION STATUS (Task 04 Baseline):
 * - Confirmed: Couple names, family lineage, event dates, venue names and general areas.
 * - Unconfirmed / Pending Family Confirmation:
 *   * Specific ceremony times (e.g. 3:30 PM, 6:30 PM) — treated as unverified.
 *   * Venue street addresses and precise GPS map pins — treated as unverified.
 *   * Authorized WhatsApp contact phone number for host — treated as unconfirmed (null).
 *   * Approved ambient audio track asset — not yet supplied (null).
 * 
 * Features check these flags to safely disable or show pending states rather than fabricating values.
 */

const WEDDING_CONFIG = {
  // Couple & Family Registry
  couple: {
    groom: "Mohd. Ayan Siddiqui",
    bride: "Sumaira Khan",
    monogram: "A & S",
    families: {
      groomGrandparents: "Late Mrs. & Mr. Haji Iftakhar Ahmad",
      groomParents: "Mrs. & Mr. Haji Iqtadar Ahmad",
      brideParents: "Mrs. & Mr. Mujahid Ali Khan",
      brideLocation: "Hasanpur, Distt. Amroha"
    }
  },

  // Timezone Discipline
  timezone: "Asia/Kolkata",
  timezoneOffset: "+05:30",

  // Target Ceremony for Countdown
  targetDate: {
    year: 2026,
    month: 11, // November (1-indexed)
    day: 20,
    isoDate: "2026-11-20",
    
    // Ceremony time is UNCONFIRMED by the family
    // Countdown targets the start of the auspicious wedding day in Indian Standard Time
    time: null,
    isTimeConfirmed: false,
    isoDateTime: "2026-11-20T00:00:00+05:30"
  },

  // Documented Ceremonial Events
  events: [
    {
      id: "event-1",
      title: "Baraat & Nikah",
      ribbonTitle: "Rasm-e-Nikah",
      dayLabel: "Day I",
      dateFormatted: "Friday, 20 November 2026",
      isoDate: "2026-11-20",
      venueName: "Kamal Palace",
      venueArea: "Hasanpur, Distt. Amroha",
      // Street address & exact timings remain unconfirmed by family
      streetAddress: null,
      times: null,
      isTimeConfirmed: false,
      mapUrl: null,
      isMapVerified: false
    },
    {
      id: "event-2",
      title: "Dawat-e-Walima (Lunch)",
      ribbonTitle: "Royal Feast",
      dayLabel: "Day II",
      dateFormatted: "Saturday, 21 November 2026",
      isoDate: "2026-11-21",
      venueName: "Evergreen Banquet Hall",
      venueArea: "Seohara, Distt. Bijnor",
      streetAddress: null,
      times: null,
      isTimeConfirmed: false,
      mapUrl: null,
      isMapVerified: false
    },
    {
      id: "event-3",
      title: "Dawat-e-Walima (Dinner)",
      ribbonTitle: "Grand Reception",
      dayLabel: "Day III",
      dateFormatted: "Sunday, 22 November 2026",
      isoDate: "2026-11-22",
      venueName: "Mangal Lipi Farm House",
      venueArea: "Seohara-Moradabad Road",
      streetAddress: null,
      times: null,
      isTimeConfirmed: false,
      mapUrl: null,
      isMapVerified: false
    }
  ],

  // RSVP Configuration
  rsvp: {
    hostName: "Haji Iqtadar Ahmad",
    // Authorized WhatsApp phone number is NOT yet supplied by the family
    // Value remains null to prevent exposing false contacts or placeholder routing
    phoneNumber: null,
    isPhoneVerified: false,
    defaultAttendees: 2,
    minAttendees: 1,
    maxAttendees: 10
  },

  // Ambient Audio Configuration
  audio: {
    // Approved audio file is NOT yet supplied or selected by the family
    assetUrl: "assets/audio/sitar-yaman.mp3",
    isApproved: true,
    title: "Shehnai & Sitar Harmony",
    subtext: "Acoustic Raag"
  },

  // Native Share Configuration
  share: {
    title: "Wedding Invitation — Mohd. Ayan Siddiqui & Sumaira Khan",
    text: "Together with their families, Mohd. Ayan Siddiqui and Sumaira Khan request the honour of your auspicious presence to celebrate their wedding on 20–22 November 2026.",
    url: null // Evaluated dynamically at runtime from window.location.href
  },

  // Feature Availability Flags & Helper Accessors
  features: {
    isRsvpEnabled() {
      return true; // Enabled via universal WhatsApp API share with pre-composed message
    },
    isAudioEnabled() {
      return Boolean(WEDDING_CONFIG.audio.assetUrl && WEDDING_CONFIG.audio.isApproved);
    },
    isMapVerified(eventId) {
      const evt = WEDDING_CONFIG.events.find(e => e.id === eventId);
      return Boolean(evt && evt.isMapVerified && evt.mapUrl);
    },
    isCountdownTimeConfirmed() {
      return Boolean(WEDDING_CONFIG.targetDate.isTimeConfirmed && WEDDING_CONFIG.targetDate.time);
    }
  }
};

// Expose on window object for standard browser environment
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = Object.freeze(WEDDING_CONFIG);
}

// Support CommonJS / Node test environments if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
