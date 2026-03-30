# Back-End API Documentation

This document describes the API contracts for the bar service area features.
The front-end currently uses mock data; these endpoints should be implemented
to replace the stubs.

---

## Authentication & Authorization

### User Roles

| Role     | Level | Description                                    |
| -------- | ----- | ---------------------------------------------- |
| `client` | 0     | Regular customer — can browse menu, place orders |
| `admin`  | 1     | Bar staff / manager — can manage tables, orders  |
| `dev`    | 2     | Developer — full access including system config  |

### Auth Flow

- Login is done via the same entry point for all users
- The server determines the user's role based on their credentials
- Roles are stored in the user profile and returned on login
- Admin/dev users can toggle their view mode (client ↔ admin) on the front-end

### Headers

All authenticated requests must include:

```
Authorization: Bearer <jwt_token>
```

---

## Tables API

### `GET /api/tables`

List all tables with their current status.

**Required Role:** `admin`

**Response:**

```json
{
  "tables": [
    {
      "id": "1",
      "number": 1,
      "seats": 4,
      "status": "available" | "occupied" | "reserved",
      "currentOrderTotal": 0.00,
      "guestName": "Hamlet"
    }
  ]
}
```

### `GET /api/tables/:tableId`

Get details for a specific table.

**Required Role:** `admin`

**Response:**

```json
{
  "id": "1",
  "number": 1,
  "seats": 4,
  "status": "occupied",
  "currentOrderTotal": 45.90,
  "guestName": "Hamlet"
}
```

### `PATCH /api/tables/:tableId/status`

Update the status of a table.

**Required Role:** `admin`

**Request Body:**

```json
{
  "status": "available" | "occupied" | "reserved",
  "guestName": "Hamlet"
}
```

**Response:** Updated table object.

---

## Orders API

### `GET /api/tables/:tableId/orders`

Get the current active order for a table.

**Required Role:** `admin`

**Response:**

```json
{
  "orderId": "order-123",
  "tableId": "2",
  "status": "open",
  "items": [
    {
      "id": "item-1",
      "name": "Romeo & Juliet Berry",
      "price": 18.90,
      "quantity": 2,
      "emoji": "🍓"
    }
  ],
  "subtotal": 37.80,
  "serviceTax": 3.78,
  "total": 41.58,
  "createdAt": "2026-03-30T10:00:00Z"
}
```

### `POST /api/tables/:tableId/orders`

Create a new order for a table (opens the table).

**Required Role:** `admin`

**Request Body:**

```json
{
  "guestName": "Hamlet"
}
```

**Response:** New order object with empty items array.

### `POST /api/tables/:tableId/orders/:orderId/items`

Add an item to an existing order.

**Required Role:** `admin`

**Request Body:**

```json
{
  "menuItemId": "romeo-berry",
  "quantity": 1
}
```

**Response:** Updated order object.

### `PATCH /api/tables/:tableId/orders/:orderId/items/:itemId`

Update an item quantity in an order.

**Required Role:** `admin`

**Request Body:**

```json
{
  "quantity": 3
}
```

**Response:** Updated order object.

### `DELETE /api/tables/:tableId/orders/:orderId/items/:itemId`

Remove an item from an order.

**Required Role:** `admin`

**Response:** Updated order object.

### `POST /api/tables/:tableId/orders/:orderId/close`

Close the bill for a table. Marks the order as closed and the table as available.

**Required Role:** `admin`

**Response:**

```json
{
  "orderId": "order-123",
  "tableId": "2",
  "status": "closed",
  "subtotal": 37.80,
  "serviceTax": 3.78,
  "total": 41.58,
  "closedAt": "2026-03-30T12:30:00Z"
}
```

---

## Admin Dashboard API

### `GET /api/admin/dashboard`

Get dashboard statistics.

**Required Role:** `admin`

**Response:**

```json
{
  "tables": {
    "total": 8,
    "occupied": 4,
    "available": 3,
    "reserved": 1
  },
  "revenue": {
    "today": 1280.40,
    "openOrders": 4,
    "closedToday": 12,
    "averageTicket": 45.50
  }
}
```

---

## Users API

### `POST /api/auth/login`

Authenticate a user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user-1",
    "email": "user@example.com",
    "name": "User Name",
    "photo": "https://...",
    "role": "client" | "admin" | "dev"
  }
}
```

### `GET /api/auth/me`

Get current authenticated user profile.

**Required Role:** any authenticated user

**Response:** User object with role.

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "You do not have permission to access this resource."
  }
}
```

Common error codes:

| Code             | HTTP Status | Description                |
| ---------------- | ----------- | -------------------------- |
| `UNAUTHORIZED`   | 401         | Missing or invalid token   |
| `FORBIDDEN`      | 403         | Insufficient permissions   |
| `NOT_FOUND`      | 404         | Resource not found         |
| `VALIDATION`     | 422         | Invalid request body       |
| `INTERNAL_ERROR` | 500         | Unexpected server error    |

---

## WebSocket Events (Socket.IO)

For real-time updates in the bar service area:

| Event                  | Direction       | Payload                     | Description                   |
| ---------------------- | --------------- | --------------------------- | ----------------------------- |
| `table:status_changed` | Server → Client | `{ tableId, status }`       | Table status was updated      |
| `order:updated`        | Server → Client | `{ orderId, tableId, ... }` | Order items changed           |
| `order:closed`         | Server → Client | `{ orderId, tableId }`      | An order was closed           |
| `dashboard:refresh`    | Server → Client | Dashboard stats object      | Dashboard data needs refresh  |
