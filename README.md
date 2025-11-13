# ☕ **CupFund – Support Creators, One Cup at a Time**

CupFund is a simple and engaging crowdfunding platform where fans can support their favorite developers, creators, artists, and influencers by buying them a “cup” (donation). Designed with a clean UI and a smooth payment flow, CupFund helps creators raise funds effortlessly.

---

## 🚀 **Features**

- 🔐 **User Authentication** using Google & GitHub (NextAuth.js)
- 👤 **Creator Profile Pages** with custom description, image & socials
- 💳 **Secure Payments** powered by Razorpay
- 📊 **Creator Dashboard** with earnings & supporter messages
- 🎨 **Customizable UI** for profile themes
- 📱 **Responsive & Modern UI** built with Tailwind CSS
- 🗄️ **MongoDB Integration** for users and payments
- ⚡ **Next.js App Router** with API routes

---

## 🛠️ **Tech Stack**

- **Next.js 14 (App Router)**
- **React**
- **Tailwind CSS**
- **MongoDB + Mongoose**
- **NextAuth.js**
- **Razorpay Payments**
- **Node.js**

---

## 📦 **Installation & Setup**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/laxman-goud/cupfund.git
cd cupfund
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

```env
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

MONGODB_URI=your_mongo_uri

NEXT_PUBLIC_RAZORPAY_KEY=your_public_key
RAZORPAY_SECRET=your_secret_key

NEXT_PUBLIC_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=supersecret#123

```

### 4️⃣ Start development server

```bash
npm run dev
```

## ❤️ **Contributing**

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📝 **License**

This project is licensed under the **MIT License**.x
