# Scoreboard API Specification

## Overview

This document outlines the specification for the Scoreboard API module, responsible for managing and updating user scores in real time while ensuring security against unauthorized score manipulations.

## Features

1. **Real-time Scoreboard Update** - The scoreboard should display the top 10 users with the highest scores, updating automatically when changes occur.
2. **Score Increment** - A user’s score increases when they perform a predefined action.
3. **Secure Score Update** - Only legitimate actions should trigger score updates, preventing unauthorized modifications.

## API Endpoints

### 1. **Update Score**
**Endpoint:** `PUT api/user/score/update`

**Description:** Increases a user’s score after a valid action.

**Request Headers:**
- `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "userId": "string", 
  "score": number
}
```

**Response:**
- **200 OK**
  ```json
  {
    "message": "Score updated successfully",
    "newScore": oldScore + score
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error": "Invalid request data"
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "error": "Invalid authentication"
  }
  ```

### 2. **Get Leaderboard**
**Endpoint:** `GET /api/score/leaderboard`

**Description:** display the top 10 users with the highest scores.

**Response:**
- **200 OK**
  ```json
  {
    "leaderboard": [
      { "userId": "user123", "score": 2000 },
      { "userId": "user456", "score": 1800 }
    ]
  }
  ```

## Security Measures

1. **Login**
   - Sending a login request to the backend. 
   - If the login is successful, stores the JWT token in localStorage and establishes a WebSocket connection.

2. **Authentication & Authorization**
   - Users must be authenticated using JWT tokens.
   - Only valid sessions can modify scores.

3. **Action Validation**
   - Each action should be verified before updating the score.
   - An `actionId` should be checked against valid records to prevent forged requests.

4. **Rate Limiting & Throttling**
   - Implement rate limiting to prevent abuse (e.g., max 10 requests per minute per user).
   - Use IP-based or user-based throttling to avoid spamming.

5. **Audit Logging**
   - Maintain logs of score updates, including `userId`, `actionId`, and timestamps for security audits.

6. **WebSockets for Real-time Updates:** 
   - Instead of polling, implement WebSockets to push live updates.
    A[Client (Browser, App)] --> B(WebSocket Connection)
    B --> A
    B --> C[WebSocket Server]
    C --> B

## Execution Flow Diagram

graph TD;
  A[User Login] -->|Backend Authenticates| B[Generate JWT Token];
  B -->|Send Token to Client| C[Client Stores Token];
  C -->|User Connects WebSocket| WS[WebSocket Connection Established];
  WS -->|Send Token for Auth| E[Validate Token];
  E --Unauthorized--> F[Reject Connection];
  E -->|Authorize WebSocket| WS_Auth[WebSocket Authenticated];

  C -->|User Performs Action| D[Send WebSocket Message];
  D -->|Backend Receives Message| G[Check Valid Action];
  G --Invalid Action--> F;
  G -->|Update User Score| H[Database Updates Score];

  H -->|Trigger Scoreboard Update| I[Leaderboard Updates];
  I -->|Send Updated Scores via WebSocket| WS_Update[Broadcast Updated Scores];
  WS_Update --> J[User's UI Displays Updated Leaderboard];



