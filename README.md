# Shawty - URL Shortener and More

**Shawty** is a powerful URL shortener that not only shortens links but also provides rich analytics, QR code generation, and other advanced features. Built to integrate standard pages for GitHub, LeetCode, and Codeforces data, it also includes a UI interface to showcase user resumes.

# Provided Images

### Screenshot 1
![Image 1](https://github.com/user-attachments/assets/90355cc2-6e55-44d6-9575-3bffa9a06b1e)

### Screenshot 2
![Image 2](https://github.com/user-attachments/assets/73a817ce-d8c2-405c-bfe6-dfd332f19c5d)

### Screenshot 3
![Image 3](https://github.com/user-attachments/assets/f9982ae8-246c-4e3d-84e5-6774f4036720)

### Screenshot 4
![Image 4](https://github.com/user-attachments/assets/db75e94b-6a8e-49fc-a290-075280a886ef)

---

## ✨ Features

- **URL Shortening**: Generate short links for any URL.
- **Analytics Dashboard**: Tracks:
  - Number of clicks
  - Device breakdown (e.g., tablets)
  - Real-time graphs for visual insights
- **Standard Pages**:
  - GitHub data visualization
  - LeetCode statistics
  - Codeforces performance insights
- **QR Code Generation**: Quickly generate QR codes for shortened URLs.
- **Resume Viewer**: Interactive UI to showcase resumes.
- **Live Demo**: [Try it live here](https://shawty-eight.vercel.app/).
- **Working Demo Video**: [Watch the demo here](https://x.com/manashanand2/status/1825420273694191831).

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or Yarn

### Steps to Install

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ManashAnand/Shawty.git
   cd Shawty
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build the Project**:
   ```bash
   npm run build
   ```

5. **Start the Production Server**:
   ```bash
   npm start
   ```

---

## 🛠️ Development

### Running in Development Mode
To test changes locally, use the following command:
```bash
npm run dev
```

This starts a local development server and watches for file changes.

---

## 📁 Project Structure

```plaintext
Shawty/
├── Wrapper/                # Added TanStack and Supabase signup
├── actions/                # Added GitHub functionality
├── app/                    # Rectify small bug
├── components/             # Added Codeforces widget
├── hooks/                  # Added Bento grid
├── lib/                    # Added some components
├── public/                 # Added some components
├── utils/
│   └── supabase/           # Made template
├── .dockerignore           # Rectify small bug
├── .eslintrc.json          # Initial commit from Create Next App
├── .gitignore              # Rectify small bug
├── Dockerfile              # Rectify small bug
├── README.md               # Initial commit from Create Next App
├── components.json         # Added some components
├── next.config.mjs         # Added Bento grid
├── package-lock.json       # Added repo component
├── package.json            # Added repo component
├── postcss.config.mjs      # Initial commit from Create Next App
├── tailwind.config.ts      # Added a cool look to it
└── tsconfig.json           # Added TanStack and Supabase signup

```

---

## 📊 Analytics Features

- **Graphs and Insights**:
  - Real-time updates on clicks and devices
  - Interactive charts for easy analysis
- **Custom Analytics**: Detailed breakdown for user-generated links.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a Pull Request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Support

If you encounter any issues or have questions, feel free to open an [issue](https://github.com/ManashAnand/Shawty/issues) or reach out.

---

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- QR Code generation powered by [qrcode](https://www.npmjs.com/package/qrcode)
