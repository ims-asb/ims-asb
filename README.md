# ASB Hub

A free, self-hosted team coordination app for middle and high school ASB (Associated Student Body) programs.

Built by Luke Li, IMS ASB Treasurer 2026–27. No servers, no subscriptions, no monthly fees.

---

## What it does

| Feature | Details |
|---|---|
| **Events** | Calendar + list view, AI date suggester (Groq), event reminders |
| **Meeting Notes** | Secretary/Treasurer/Advisor only — gated by role |
| **Ideas board** | Upvoting, status tracking (idea → progress → done → shelved) |
| **Chat** | Real-time #General + DMs, typing indicators, read receipts, profanity filter |
| **People** | Member roster with online indicators |
| **Announcements** | Pinned cards on the home tab |
| **Role-based access** | 8 roles with individual passwords |
| **PWA** | Installable on iOS and Android — works offline |
| **Dark mode** | System-preference aware |
| **Test mode** | Full fake dataset for demos without touching real data |
| **Year archive** | Save year's data to Firebase and start fresh |

There's also a separate **Financial Manager** app (`finance.html`) for tracking ASB budgets, club hours, and project funding — kept separate for privacy reasons.

---

## Quick start (15 minutes)

### 1. Firebase (free)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project
2. Add a **Realtime Database** (Build → Realtime Database → Create)
3. Start in **test mode** (or set rules to `{ ".read": true, ".write": true }` manually)
4. Go to Project Settings → General → scroll to "Your apps" → add a Web app
5. Copy the config object — you'll need it in the next step

### 2. Configure the app

Open `index.html` and find the `SCHOOL_CONFIG` block near the top of the `<script>` tag. Fill in your values:

```js
const SCHOOL_CONFIG = {
  schoolName: 'Your School Abbreviation',   // e.g. 'WHS'
  schoolFullName: 'Washington High School',
  schoolYear: '2026–2027',

  firebase: {
    apiKey:            "paste from Firebase console",
    authDomain:        "your-project.firebaseapp.com",
    // ... rest of Firebase config
  },

  githubUrl: 'https://github.com/you/your-fork',  // or null to hide
  financeUrl: null,  // URL of financial manager app, or null to hide
};
```

### 3. Set passwords

Find `ROLE_PWS` (a few lines below `SCHOOL_CONFIG`) and set your own passwords for each role:

```js
const ROLE_PWS = {
  'Treasurer':      'your-treasurer-password',
  'President':      'your-president-password',
  'Vice President': 'your-vp-password',
  'Secretary':      'your-secretary-password',
  'Advisor':        'your-advisor-password',
  'Bookkeeper':     'your-bookkeeper-password',
  'Member':         'your-member-password',
  'Supporter':      'your-supporter-password',
  '7th Grade Rep':  'your-rep-password',
};
```

### 4. Set known members (optional)

Find `KNOWN_MEMBERS` and add your officers. When someone types their name during onboarding, it auto-detects their role and skips the role selector:

```js
const KNOWN_MEMBERS = [
  { patterns: ['alex johnson', 'alex'], role: 'Treasurer' },
  { patterns: ['ms. chen', 'chen'],     role: 'Advisor'   },
  // add more...
];
```

### 5. Deploy

The simplest free option is **GitHub Pages**:

1. Fork this repo (or create a new one)
2. Rename `index.html` and upload it
3. Go to Settings → Pages → Source: main branch
4. Your app is live at `https://yourusername.github.io/your-repo`

Other options: Netlify, Vercel, Cloudflare Pages — all work fine, all have free tiers.

---

## AI date suggester (optional)

The Events tab has an AI button that suggests the best date for an event, avoiding clashes with existing events and school calendars.

1. Get a free API key at [console.groq.com/keys](https://console.groq.com/keys) (no credit card)
2. In the app, open ☰ Menu → Groq → paste your key
3. The key is saved to localStorage and synced to Firebase so your whole team shares it

---

## Roles explained

| Role | Access |
|---|---|
| **Treasurer** | Everything + technical controls (Firebase, Groq, test mode) |
| **President, VP, Secretary** | All tabs including meeting notes |
| **Advisor** | All tabs including meeting notes + destructive controls |
| **Bookkeeper** | Home + Events + Finance link only |
| **Member** | Home, Events, Ideas, Chat, People |
| **Supporter** | Same as Member, read-only (no deletes) |
| **7th Grade Rep** | Same as Member |

---

## Financial Manager

`finance.html` is a separate app for tracking:
- ASB budget (income/expenses, fundraising goal, CSV export)
- Club teacher hours (25h warning, 30h hard limit, payroll CSV)
- Club budgets (per-club allocation + spending)
- Project funding (multi-entry ledger per project)

Set it up the same way — fill in its own Firebase config (can be the same project, different path) and upload to a separate GitHub Pages repo.

---

## Tech stack

- **Vanilla HTML/CSS/JS** — no build step, no npm, no framework
- **Firebase Realtime Database** — live sync
- **GitHub Pages** — hosting
- **Groq API** — AI date suggester (llama-3.3-70b-versatile)
- **Service Worker** — offline support + PWA install

Single file by design — everything in `index.html` so there's nothing to build or configure beyond what's in `SCHOOL_CONFIG`.

---

## Customizing further

The app uses CSS custom properties for theming — change these in the `:root` block to match your school colors:

```css
:root {
  --accent: #2a5caa;  /* primary blue — change to your school color */
  --green:  #1a6b4a;
  --red:    #b83030;
}
```

To rename "ASB" to your program name (e.g. "SGA", "Student Council"), search for `ASB Hub` in the HTML and replace.

---

## License

**CC BY-NC-ND 4.0** — with explicit permission for school customizations.

**You can:**
- Use it freely at your school
- Customize school name, colors, passwords, and Firebase config (explicitly permitted even under ND)

**You can't:**
- Sell it or use it commercially
- Redistribute significantly modified versions without permission

For major feature changes or anything beyond school setup tweaks, reach out first at [github.com/ims-asb](https://github.com/ims-asb).

---

## Credits

Built by [Luke Li](https://github.com/ims-asb) with Claude (Anthropic).  
Issaquah Middle School ASB, 2026–27.
