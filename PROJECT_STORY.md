

# ⚡ EnergyHub Marketplace
# **Database Migration:** We evolved from SQLite for local prototyping, then Firestore for cloud storage, and finally migrated to Neon PostgreSQL for cloud scalability, SQL compatibility, and deployment flexibility.
## 🌱 Inspiration
EnergyHub Marketplace was born out of the need to democratize access to clean energy solutions. We saw a gap in the market for a platform that could connect buyers and sellers of energy products, streamline transactions, and provide real-time analytics for smarter decision-making. Our vision was to empower individuals, businesses, and communities to participate in the energy transition with transparency and ease.

## 🚀 What it does
EnergyHub Marketplace is a full-stack platform that connects buyers and sellers of energy products. It offers:
- 🔐 Secure user registration and login
- 🛒 Product catalog with search and filtering
- 📦 Order management with real-time tracking and cancellation
- ❓ QnA system for product inquiries
- 📊 Analytics dashboard for marketplace insights
- 👥 Role-based UI for buyers, sellers, and admins
- 📱 Mobile-ready responsive design

## 🛠️ How we built it
| Layer      | Technology/Tool                | Purpose/Role                                 |
|------------|-------------------------------|----------------------------------------------|
| 💻 Frontend   | React, Vite, Tailwind CSS     | SPA, UI/UX, fast development                 |
| 🖥️ Backend    | Node.js, Express              | REST API, business logic                     |
| 🗄️ Database   | Neon PostgreSQL               | Cloud data storage, SQL compatibility        |
| 🔑 Auth       | Custom (Express, Neon)        | Registration, login, session management      |
| ☁️ Deployment | Vercel                        | Serverless hosting, CI/CD                    |
| 🔗 APIs       | RESTful endpoints             | Users, products, orders, QnA                 |
| 🧪 Other      | Postman, GitHub Actions       | API testing, automation                      |

- **Frontend:** Built with React and Vite for speed, using Tailwind CSS for a modern, responsive design. All API calls use a centralized config for the backend URL, ensuring cloud compatibility.
-- **Backend:** Node.js and Express power the RESTful API, with all persistent data stored in Neon PostgreSQL. Authentication, product management, order flows, and QnA are handled via modular routes.
-- **Database Migration:** We started with SQLite for local prototyping, but quickly migrated to Neon PostgreSQL for persistent, scalable cloud storage.
- **Deployment:** Vercel was chosen for its simplicity and serverless capabilities, allowing us to focus on features rather than infrastructure.
**🏗️ Architecture Overview**
- 💻 **Frontend:** Built with React and Vite for speed, using Tailwind CSS for a modern, responsive design. All API calls use a centralized config for the backend URL, ensuring cloud compatibility.
- 🖥️ **Backend:** Node.js and Express power the RESTful API, with all persistent data stored in Firestore. Authentication, product management, order flows, and QnA are handled via modular routes.
- 🗄️ **Database Migration:** We started with SQLite for local prototyping, but quickly migrated to Firestore to overcome Vercel’s read-only file system and enable persistent, scalable cloud storage.
- ☁️ **Deployment:** Vercel was chosen for its simplicity and serverless capabilities, allowing us to focus on features rather than infrastructure.
- **Frontend:** Built with React and Vite for speed, using Tailwind CSS for a modern, responsive design. All API calls use a centralized config for the backend URL, ensuring cloud compatibility.
- **Backend:** Node.js and Express power the RESTful API, with all persistent data stored in Firestore. Authentication, product management, order flows, and QnA are handled via modular routes.
- **Database Migration:** We started with SQLite for local prototyping, but quickly migrated to Firestore to overcome Vercel’s read-only file system and enable persistent, scalable cloud storage.
- **Deployment:** Vercel was chosen for its simplicity and serverless capabilities, allowing us to focus on features rather than infrastructure.

## 🧩 Challenges we ran into
| 🐞 Challenge                                 | 💡 Solution                                      |
|-------------------------------------------|-----------------------------------------------|
| 🗄️ SQLite → Neon PostgreSQL               | ☁️ Achieved optimal cloud-native SQL solution |
| 🔗 API endpoint consistency                  | 🛠️ Centralized config and helper functions       |
| 🔑 Authentication reliability                | 🔄 Refactored backend and frontend flows         |
| ⚡ Real-time updates                         | 🔔 Leveraged Neon’s cloud capabilities           |
| 👥 UI/UX for multiple roles                  | 🧩 Role-based components and navigation          |
| 🐞 Debugging order flows                     | 📝 Modularized backend routes, improved logging  |

## 🏆 Accomplishments that we're proud of
- 🚀 Migrated the entire backend from SQLite → Neon PostgreSQL for optimal cloud scalability and SQL compatibility
- 🔐 Built a robust authentication and order management system
- 🎨 Designed a clean, responsive UI for multiple user roles
- ☁️ Achieved seamless deployment on Vercel
- 🧩 Created a modular, maintainable codebase

## 📚 What we learned
- ☁️ **Cloud-first architecture is essential:** Migrating from SQLite to Neon PostgreSQL enabled true scalability, SQL compatibility, and reliability, especially for cloud deployments like Vercel.
- 🎯 **User experience matters:** Building intuitive flows for registration, login, and order management was key to user adoption.
- 🔗 **API consistency:** Refactoring all endpoints and frontend calls to use a single cloud backend improved maintainability and reduced errors.
- 🔒 **Security and privacy:** Implementing secure authentication and data handling was a top priority.

## 🔮 What's next for Energyhub-marketplace
- 💳 Add payment integration for seamless transactions
- 📊 Expand analytics dashboard with more insights
- 🔋 Integrate more energy product categories
- 📱 Launch mobile app version
- 🌍 Add more languages for global reach

## 🧮 Math Example (LaTeX)
The total cost for an order is calculated as:

\[
	ext{Total} = \sum_{i=1}^{n} p_i \times q_i + \text{Shipping}
\]

Where \(p_i\) is the price of item \(i\), \(q_i\) is the quantity, and Shipping is a fixed or variable cost.

### ✨ Display Math Example
$$
E = mc^2
$$

## 🏗️ Built With
- ⚛️ React
- 🖥️ Node.js
- 🛠️ Express
  
- ☁️ Vercel
- 🎨 Tailwind CSS
- 🧪 Postman
- 🤖 GitHub Actions

## 🚦 Try It Out
- 🗂️ [GitHub Repository](https://github.com/SHADRACK152/energyhub_marketplace)
- 🌐 [Live Demo](https://energyhub-marketplace.vercel.app/authentication-login-register)
