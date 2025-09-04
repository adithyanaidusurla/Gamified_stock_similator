# 📈 Stock Trading Simulator with AI Feedback

Welcome to the **Stock Trading Simulator**, a FastAPI-based MVP where users can simulate stock trading, get AI-powered feedback, and level up their trading strategies using S Coins 💰.

---

## 🚀 Features

- 🧑 User Registration & Login
- 💸 S Coin Virtual Wallet System
- 💼 Buy/Sell Trade Simulator
- 📊 Stock Prediction Input System
- 🤖 AI Feedback on Predictions (based on accuracy)
- 🔼 Level Up System for Users
- 📈 Database-integrated trading & prediction history
- ⚡ FastAPI-powered Backend
- 🔐 PostgreSQL with SQLAlchemy ORM
- 📝 Built using Jupyter Notebooks for rapid development

---

## 📁 Project Structure

stock_trading_sim/
│
├── app/
│   ├── main.ipynb                # FastAPI App Entry Point
│   ├── database.ipynb            # Database Connection Logic (Jupyter)
│   ├── database.py               # Script version for imports
│   ├── models.ipynb              # SQLAlchemy Database Models
│   ├── models.py                 # Script version for imports
│   ├── schemas.ipynb             # Pydantic Schemas (Request/Response)
│   ├── schemas.py                # Script version for imports
│   └── routes/
│       ├── users.ipynb           # User Authentication Routes (Jupyter)
│       ├── users.py              # Script version for imports
│       ├── trading.ipynb         # Trading Logic Routes (Jupyter)
│       ├── trading.py            # Script version for imports
│       ├── ai.ipynb              # AI Prediction & Feedback Routes (Jupyter)
│       └── ai.py                 # Script version for imports
│
├── .env                          # Environment Variables (e.g., DATABASE_URL)
├── requirements.txt              # Python Package Dependencies
└── README.md                     # Project Overview & Setup Guide.



✅ .ipynb – Development / Prototyping

Jupyter Notebooks are used to:
Quickly build, test, and iterate on APIs and logic in an interactive environment.
Visually debug and verify outputs step-by-step.
Make development beginner-friendly, especially in MVP or solo dev phases.
➡ Ideal for:

Writing models, schemas, routes interactively
Verifying DB queries
Experimenting with AI logic


✅ .py – Production / Deployment

The .py scripts are converted from notebooks using:
jupyter nbconvert --to script your_notebook.ipynb
These are the files actually used when running the FastAPI app with uvicorn, since .ipynb cannot be directly imported in production Python apps.
➡ Essential for:

Import statements like:
from app.models import User
from app.schemas import UserCreate
Running the app (main.py)
Avoiding Jupyter dependency at runtime



📝 Example:
# You cannot do this from inside a notebook:
from app.database import Base, engine
# Hence, we maintain `database.py` alongside `database.ipynb`


⚡ Bonus Tip:
You can keep notebooks as your internal dev playground and .py files clean and modular for production and deployment environments like Docker, Render, or Railway.


---

## 🛠 Technologies Used

- **FastAPI** – lightning-fast web API
- **SQLAlchemy** – ORM for PostgreSQL
- **Pydantic v2** – Data validation
- **Uvicorn** – ASGI server
- **Dotenv** – Secure .env loading
- **Jupyter Notebook** – Interactive development
- **Passlib (bcrypt)** – (Optional for secure password hashing)

---

## ⚙ Setup & Run Locally

### 1. Clone Repo
```bash
git clone https://github.com/your-username/stock_trading_sim.git
cd stock_trading_sim


### 2. Set up Environment
DATABASE_URL=postgresql://username:password@localhost:5432/yourdb



### 3.Install Dependencies
pip install -r requirements.txt


### 4. Run Server
uvicorn app.main:app --reload




## 📦 Database Setup

Run this once from models.ipynb to create tables:

Base.metadata.create_all(bind=engine)



## 📜 License

MIT License – All rights reserved by **Adithya Naidu**.


## 👨‍💻 Author

**Adithya Naidu** – AI Enthusiast