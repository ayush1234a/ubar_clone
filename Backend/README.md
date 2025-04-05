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
**Authentication:** Not Required

#### Request Body Fields
| Field | Type | Required | Validation Rules | Description |
|-------|------|----------|------------------|-------------|
| fullname.firstname | String | Yes | Min length: 3 chars | Captain's first name |
| fullname.lastname | String | Yes | - | Captain's last name |
| email | String | Yes | Valid email format | Must be unique in system |
| password | String | Yes | Min length: 8 chars | Captain's password |
| vehicle.color | String | Yes | Must be: red, blue, or green | Vehicle color |
| vehicle.plate | String | Yes | Min length: 3 chars | Vehicle plate number |
| vehicle.capacity | Number | Yes | Min: 1 | Vehicle passenger capacity |
| vehicle.vehicleType | String | Yes | Must be: car, bike, or auto | Type of vehicle |

#### Sample Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response Codes
- 201: Captain registered successfully
- 400: Validation error
- 409: Email already exists

#### Sample Success Response (201)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "captain": {
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
    "id": "captain_id"
  }
}
```

#### Sample Error Response (400)
```json
{
  "errors": [
    {
      "msg": "Please select a valid color",
      "param": "vehicle.color",
      "location": "body"
    }
  ]
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

