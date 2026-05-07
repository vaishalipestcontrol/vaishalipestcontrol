# 🐜 Vaishali Pest Control

> **Premium, modern, and highly-optimized web application and lead-generation portal for Vaishali Pest Control.** Built with cutting-edge Next.js 15, custom high-fidelity styling tokens, secure Supabase PostgreSQL backend, and fully-automated SMTP notification systems.

---

## ✨ Features & Highlights

### 🎨 Visual Excellence & Design Systems
*   **High-Fidelity Aesthetics**: Sleek modern dark mode elements combined with custom botanical & pest control clinical vector backgrounds.
*   **Target Pest Categories**: Dedicated, beautifully styled pages for Termite, Bedbug, Mosquito, and general Pest control services.
*   **Cinematic Hero Section**: Center-focused, high-impact branding layout featuring real-time rating badges and elegant trust metrics.
*   **Redesigned Testimonials Section**: A premium responsive carousel highlighting customer feedback with sleek hover-state transitions.

### 🛡️ Core Capabilities
*   **Lead Capture & Validation**: Fully-responsive quote request forms requesting mandatory phone details with native mobile keyboard configurations.
*   **Automated Communication**: Integrated Nodemailer SMTP mail systems with customized emails for:
    *   *Customers*: Beautifully structured, branded confirmation letters detailing their request.
    *   *Administrators*: Instant high-contrast email alerts with dedicated **"Reply via Email"** and **"Reply on WhatsApp"** quick-action buttons.
*   **Full Admin Dashboard**: Secure authentication gating pages for contacts, services, and testimonials management.

---

## 🛠️ Technology Stack

*   **Frontend & Routing**: [Next.js 15+](https://nextjs.org/) (App Router with dynamic server-side actions)
*   **Styling & UI**: Custom Vanilla CSS Utilities & CSS Variables for fluid theme transitions and pixel-perfect responsiveness.
*   **Backend & DB**: [Supabase](https://supabase.com/) (PostgreSQL Database, Auth, and secure Connection Pooling)
*   **Automated Mail Engine**: [Nodemailer](https://nodemailer.com/) (SMTP secure dispatch)

---

## 📂 Project Structure

```bash
├── public/                  # Static assets & custom high-res illustrations
│   └── images/              # Hero, botanical, and trust-badges illustrations
├── src/
│   ├── app/                 # Next.js App Router Pages & Layouts
│   │   ├── (marketing)/     # Customer-facing marketing routes
│   │   │   ├── services/    # Dedicated service pages (e.g. termite-control)
│   │   │   └── quote/       # Interactive Quote Submission Form
│   │   ├── admin/           # Admin Dashboard routes
│   │   │   ├── contacts/    # Lead requests manager (Desktop & Mobile views)
│   │   │   ├── testimonials/# Testimonials review & CRUD managers
│   │   │   └── services/    # Service pages editor
│   │   └── globals.css      # Core Design System, tokens, and utility styles
│   └── lib/                 # Core utilities
│       ├── supabase/        # Database client interfaces
│       └── mail.ts          # Advanced Nodemailer automatic mail engine
└── supabase/                # Local database configuration & versioned schema migrations
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** installed on your system.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory (using the variables provided in `.env.local.example`):

```ini
# Supabase Database Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Automated SMTP Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-smtp-sender-email@gmail.com
SMTP_PASS=your-smtp-app-password
SMTP_FROM="Vaishali Pest Control" <your-smtp-sender-email@gmail.com>
ADMIN_EMAIL=your-admin-lead-alert-recipient@gmail.com
```

### 4. Running Locally
Start the local Next.js Turbopack development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the live application.

---

## 📦 Production Deployment

### Static Code Validation
To verify type safety and perform optimization checks before releasing:
```bash
npm run build
```

### Vercel / Netlify Deployment Checklist
1. Ensure you hook your GitHub repository to your host (e.g., **Vercel** is highly recommended for Next.js 15).
2. Configure your Environment Variables inside the host settings dashboard exactly like your `.env.local` file.
3. Your database queries, validation hooks, and automated mail dispatch actions will work globally out of the box!

---

## 🛡️ License
Distributed under the **MIT License**. Created with passion for Vaishali Pest Control.