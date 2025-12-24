# ai-microservice
calculate students grade and performance

Student Score AI Microservice

## 🌐 Public URL

**Endpoint:** `https://ai-microservice-kn4j.onrender.com`

---

## 📝 Project Overview

This is a **stateless AI microservice** built with **Node.js** and **Express**. It is designed to be part of a distributed system, receiving student score data and returning an automated performance analysis.

### What this AI does:

1. Receives an array of student scores via a `POST` request.
2. Calculates the mathematical average of the scores.
3. Generates a text summary based on specific performance rules.

---

## ⚙️ Logic Rules

The service categorizes performance based on the following average thresholds:

| Average Score | Summary Result |
| --- | --- |
| **Below 50** | "Poor performance" |
| **50 – 75** | "Overall performance is average. More practice recommended." |
| **Above 75** | "Good" |

---

## 🚀 API Specification

### Endpoint: `POST /analyze`

### Sample Request (Input)

**Method:** `POST`

**Body Type:** `JSON`

```json
{
  "scores": [70, 80, 60],
  "maxScore": 100
}

```

### Sample Response (Output)

**Status:** `200 OK`

```json
{
  "average": 70,
  "summary": "Overall performance is average. More practice recommended."
}

```

---

## 🛠️ Tech Stack

* **Backend:** Node.js & Express
* **Deployment:** Render / Railway
* **Testing:** Thunder Client
