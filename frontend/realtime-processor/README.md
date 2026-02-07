# 🚀 SentinelX — Ultra Pro Real-Time Monitoring Dashboard

> *High-frequency event ingestion + virtualized UI + custom secure backend — built with production mindset.*

SentinelX is a full-stack system designed to process **5,000+ live events at brutal speed (30ms stream)** without UI lag, while keeping backend secure and database optimized.

This is not tutorial code — this is how real systems are built.

---
Dashboards usually break when:

* thousands of DOM nodes render
* APIs get spammed
* validation is weak
* DB queries slow down

SentinelX solves it with:

* React virtualization
* custom rate limiter
* handmade validator
* indexed Mongo schema
* clean service architecture

---

##  Architecture

```
[ Stream Simulator 30ms ]
            ↓
[ React Virtualized UI ]
            ↓
[ Custom Validator ] → [ Rate Limiter ]
            ↓
[ Service Layer ]
            ↓
[ MongoDB Indexed Storage ]
```

Every core logic written from scratch — **no shortcut libraries.**

---

##  Features

### Frontend (React.js)

* Virtualized list using react-virtuoso
* Memoization strategy

  * useCallback
  * useMemo
  * React.memo
* Sliding window – max 5000 in memory
* Real-time polling of latest DB records
* Cyber-glass UI with animations
* NEW badge for fresh events
* Zero re-render hell

### Backend (Node.js)

#### 🛡 Custom Rate Limiter

* Sliding window algorithm
* IP based tracking
* Auto cleanup
* 429 protection
* No third-party package

####  Custom Validator

* Required fields
* Type checks
* Min constraints
* Multi-error response

#### Clean Architecture

* Route → Middleware → Service → Model
* Async processing
* Security first design

### Database (MongoDB)

* Indexed for high write + fast read
* Compound indexes
* Status lifecycle
* Time-series friendly

```js
eventSchema.index({ source: 1, createdAt: -1 });
```

---

## Performance

| Metric          | Result      |
| --------------- | ----------- |
| Events Rendered | 5000+       |
| UI Lag          | 0           |
| Stream Speed    | 30ms        |
| Rate Limit      | 100 req/min |
| Query           | Indexed     |

---

##  Tech Stack

* React.js
* Node.js / Express
* MongoDB / Mongoose
* Axios
* react-virtuoso
* Tailwind CSS

---
##  Setup

### Client

```bash
cd client
npm install
npm start
```

### Server

```bash
cd server
npm install
npm run dev
```

---

## 🔌 API Endpoints

### POST /api/events

```json
{
  "source": "sensor-5",
  "value": 320,
  "meta": {
    "uiId": "a1b2",
    "uiTime": "12:30:22"
  }
}
```

### GET /api/events/latest

Returns latest records sorted by time.

---

## 🛠 Code Philosophy

* Performance over hype
* Understand before automate
* Security by design
* Traditional clean structure
* No magic libraries

---
