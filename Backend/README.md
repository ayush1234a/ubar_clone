# API Endpoints Documentation

## Authentication Endpoints

### 1. Register User (/users/register)

**Method:** POST  
**URL:** `/users/register`
**Authentication:** Not Required

#### Request Body Fields
| Field | Type | Required | Validation Rules | Description |
|-------|------|----------|------------------|-------------|
| fullname.firstname | String | Yes | Min length: 3 chars | User's first name |
| fullname.lastname | String | No | Min length: 3 chars if provided | User's last name |
| email | String | Yes | Valid email format | Must be unique in system |
| password | String | Yes | Min length: 5 chars | User's password |

#### Sample Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

#### Response Codes
- 201: User created successfully
- 400: Validation error
- 409: Email already exists

#### Sample Success Response (201)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "id": "user_id"
  }
}
```

### 2. Login User (/users/login)

**Method:** POST  
**URL:** `/users/login`
**Authentication:** Not Required

#### Request Body Fields
| Field | Type | Required | Validation Rules | Description |
|-------|------|----------|------------------|-------------|
| email | String | Yes | Valid email format | Registered email |
| password | String | Yes | Min length: 5 chars | Account password |

#### Sample Request
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

#### Response Codes
- 200: Login successful
- 400: Validation error
- 401: Invalid credentials

#### Sample Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "id": "user_id"
  }
}
```

### 3. Get User Profile (/users/profile)

**Method:** GET  
**URL:** `/users/profile`
**Authentication:** Required

#### Headers
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Authorization | String | Yes | Format: "Bearer {token}" |

#### Response Codes
- 200: Profile retrieved successfully
- 401: Unauthorized/Invalid token

#### Sample Success Response (200)
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "id": "user_id"
  }
}
```

### 4. Logout User (/users/logout)

**Method:** GET  
**URL:** `/users/logout`
**Authentication:** Required

#### Headers
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Authorization | String | Yes | Format: "Bearer {token}" |

#### Response Codes
- 200: Logout successful
- 401: Unauthorized/Invalid token

#### Sample Success Response (200)
```json
{
  "message": "Logged out successfully"
}
```

### Error Response Format
All endpoints return errors in the following format:

```json
{
  "errors": [
    {
      "msg": "Error message description",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Authentication Notes
- Tokens are provided via JWT
- Tokens must be included in the Authorization header as "Bearer {token}"
- Tokens are automatically invalidated on logout
- Invalid tokens will receive a 401 Unauthorized response

## Captain Endpoints

### 1. Register Captain (/captain/register)

**Method:** POST  
**URL:** `/captain/register`

#### Request Body
```json
{
    "fullname": {
        "firstname": "John", // Required, minimum 3 characters
        "lastname": "Doe"    // Required
    },
    "email": "john.captain@example.com", // Required, must be unique and valid email format
    "password": "password123", // Required, minimum 8 characters
    "vehicle": {
        "color": "red",      // Required, must be one of: red, blue, green
        "plate": "ABC123",   // Required, minimum 3 characters, must be unique
        "capacity": 4,       // Required, minimum 1
        "vehicleType": "car" // Required, must be one of: car, bike, auto
    }
}
```

#### Success Response (201)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5...", // JWT token for authentication
    "captain": {
        "_id": "captain_id",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.captain@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
    }
}
```

### 2. Login Captain (/captain/login)

**Method:** POST  
**URL:** `/captain/login`

#### Request Body
```json
{
    "email": "john.captain@example.com", // Required, valid email format
    "password": "password123"            // Required, minimum 8 characters
}
```

#### Success Response (200)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5...", // JWT token stored in cookies also
    "captain": {
        "_id": "captain_id",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.captain@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

### 3. Get Captain Profile (/captain/profile)

**Method:** GET  
**URL:** `/captain/profile`

#### Headers
```json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." // Required, valid JWT token
}
```

#### Success Response (200)
```json
{
    "captain": {
        "_id": "captain_id",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.captain@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
    }
}
```

### 4. Logout Captain (/captain/logout)

**Method:** GET  
**URL:** `/captain/logout`

#### Headers
```json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." // Required, valid JWT token
}
```

#### Success Response (200)
```json
{
    "message": "Logged out successfully"
}
```

### Error Responses

#### Validation Error (400)
```json
{
    "errors": [
        {
            "msg": "Please enter a valid email address",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### Authentication Error (401)
```json
{
    "message": "Invalid email or password"
}
```

#### Authorization Error (401)
```json
{
    "message": "Access denied. No token provided"
}
```

#### Duplicate Entry Error (400)
```json
{
    "message": "Captain already exist"
}
```

### Vehicle Type Options
- car
- bike
- auto

### Vehicle Color Options
- red
- blue
- green

### Notes
- All vehicle details are mandatory
- Vehicle type must be one of the specified options
- Vehicle color must be one of the specified options
- Plate numbers must be unique in the system

