# Security, Privacy & Data Protection

**Document ID:** `DOC-07`  
**Classification:** `PROPOSED`  
**Focus:** Privacy by Design, Safe Integrations & Zero-Tracking Architecture  

---

## 1. Privacy by Design & Data Minimization

Traditional wedding websites often ask guests to fill out complex forms that store personal names, phone numbers, email addresses, and dietary restrictions in third-party cloud databases. This creates substantial privacy exposure.

### The Ponytail Privacy Standard
- **Zero Database / Zero PII Storage:** This application does not collect, log, or persist guest information on any server.
- **Direct P2P RSVP:** All RSVP responses are routed directly through guest-to-host encrypted messaging via WhatsApp (`https://api.whatsapp.com/send`). The website acts purely as a client-side link generator.
- **Zero Third-Party Advertising Trackers:** No Facebook Pixel, Google Analytics, or third-party marketing beacons are installed.

---

## 2. Safe URL Construction & XSS Prevention

All dynamic links generated client-side must be strictly sanitized:

### 1. WhatsApp Intent Deep Links
```javascript
// Strict parameter encoding prevents URL injection
function getWhatsAppRSVPLink(phoneNumber, guestMessage) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(guestMessage);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}
```

### 2. Google Maps Navigation Links
- Query strings must strictly encode geographical locations via `encodeURIComponent` to prevent parameter tampering.
- Example: `https://maps.google.com/?q=${encodeURIComponent(venueName + ', ' + venueCity)}`

### 3. Open Graph & Canonical Meta
- Absolute canonical URL must be declared in `<link rel="canonical" href="...">` to prevent search engine confusion or spoofing.

---

## 3. Host Contact & Phone Number Protection

1. **Scraping Mitigation:**
   - Raw phone numbers must not be exposed as plain, unformatted email/tel spam magnets in the HTML body.
   - The WhatsApp button embeds the phone number directly within the sanitized action handler rather than printing a plain text mobile number that web crawlers can harvest.
2. **Environment Configuration:**
   - The host's real WhatsApp number will be injected via a single configuration variable (`CONFIG.RSVP_PHONE_NUMBER`) during deployment, keeping it isolated from public documentation.

---

## 4. Audio Playback & Browser Permission Sandbox

Browsers enforce strict Autoplay Policies (such as Chrome's Autoplay Policy and Safari's Audio Session rules) to prevent jarring user experiences:
1. **Never Autoplay with Audio Output:** The `<audio>` element must remain paused upon initial page load.
2. **User Gesture Requirement:** Audio playback is strictly triggered by an explicit user click or tap on the floating music icon or the "Tap to open" envelope button.
3. **Graceful Error Catching:**
   ```javascript
   audioElement.play().catch(error => {
     console.warn('Audio playback blocked or interrupted:', error);
     // Update UI toggle to paused state without throwing fatal uncaught error
   });
   ```

---

## 5. Third-Party Resource Integrity (Content Security Policy)

When deploying, a strong Content Security Policy (CSP) should be configured in HTTP response headers:

```http
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'unsafe-inline'; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data: https://lh3.googleusercontent.com; 
  media-src 'self'; 
  connect-src 'self'; 
  frame-ancestors 'none';
```
*(Prevents iframe clickjacking and unauthorized script injection).*
