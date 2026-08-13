# Beat Sequencer

A full-stack web application for creating, saving, and sharing musical beats directly in the browser. Users can build drum patterns on a programmable step sequencer, save presets to their account, and share beats publicly via a link — no login required for listeners.


![Beat Sequencer screenshot](docs/screenshot-main.png)

## Features

- 🎛️ **Step sequencer grid** — programmable patterns across Kick, Snare, Hi-hat, and Tom tracks
- ▶️ **Adjustable tempo (BPM)** with accurate playback timing
- 🔐 **User accounts** — secure registration and login
- 💾 **Save & load beats** — persist your own patterns to your account
- 🔗 **Public sharing** — generate a shareable link so anyone can listen to a beat, even while logged out
- 🎨 **Responsive dark-mode UI**

## Tech Stack

**Frontend**
- React
- React Router
- Web Audio API for playback/sequencing
- Vite 

**Backend**
- Java 21 / Spring Boot
- Spring Web (REST API)
- Spring Data JPA
- Spring Security
- PostgreSQL

**Tooling**
- Docker (local PostgreSQL instance)
- Maven

## Architecture

```
beat-sequencer-api/
├── src/                      # Spring Boot backend (REST API, auth, persistence)
└── beat-sequencer-frontend/  # React frontend
```

The backend exposes a REST API for authentication, beat CRUD operations, and public beat retrieval. The frontend is a single-page React app that consumes this API and handles real-time sequencing/playback via the Web Audio API.

## Getting Started

### Prerequisites
- Java 21
- Node.js & npm
- Docker (for local PostgreSQL) or a local PostgreSQL install

### 1. Clone the repo
```bash
git clone https://github.com/ActionGT/beat-sequencer-api.git
cd beat-sequencer-api
```

### 2. Start a local PostgreSQL database
```bash
docker run -d --name beat-sequencer-db -e POSTGRES_PASSWORD=your_password_here -p 5432:5432 postgres
```
Then create the database:
```sql
CREATE DATABASE beat_sequencer_db;
```

### 3. Configure environment variables
The backend reads database credentials from environment variables — nothing is hardcoded. Set the following before running:
```bash
export DB_USERNAME=postgres
export DB_PASSWORD=your_password_here
```

### 4. Run the backend
```bash
./mvnw spring-boot:run
```
The API will be available at `http://localhost:8080`. You can confirm it's running via the health check endpoint:
```
GET http://localhost:8080/api/health
```

### 5. Run the frontend
```bash
cd beat-sequencer-frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## What I Learned Building This

This project was built to apply and extend skills from my Higher Diploma in Computing (Software Development) — particularly full-stack architecture, REST API design, authentication flows, and relational database modeling. It combines two of my interests: web development and music production.

## Roadmap / Possible Next Steps
- Deploy to a live environment
- Add preset categories/tagging
- Export beats as audio files
- Export beats as Midi files
- Add a suite of Instruments that play in sync
## License
This project is open for review as part of my developer portfolio. Feel free to explore the code.

---
Built by [Gary Tracey](https://www.linkedin.com/in/gary-tracey-326968193) · [Other projects](https://github.com/ActionGT)
