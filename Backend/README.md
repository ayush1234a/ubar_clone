# /users/register Endpoint Documentation

## Description
This endpoint registers a new user. It accepts user details including full name, email, and password. On successful registration, it returns a status code of 201 with a token and user data; if there are validation errors, it returns a status code of 400.

## Request
**Method:** POST  
**URL:** /users/register  

### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe" // optional: if not provided, ensure to modify validations as needed
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

- **fullname.firstname:** Required, at least 3 characters.
- **fullname.lastname:** Optional (but recommended), at least 3 characters if provided.
- **email:** Required, must be a valid email address.
- **password:** Required, at least 5 characters.

## Responses

### Success (201)
```json
{
  "token": "jwt-token",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    // ... other user data
  }
}
```

### Error (400)
```json
{
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

## /users/login Endpoint Documentation

### Description
This endpoint authenticates an existing user. It accepts an email and password, and on successful login returns a token and user data; if validation fails or credentials are invalid, it returns an error status.

### Request
**Method:** POST  
**URL:** /users/login  

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Responses

##### Success (200)
```json
{
  "token": "jwt-token",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ... other user data
  }
}
```

##### Error (400 / 401)
```json
{
  "errors": [
    {
      "msg": "Validation error message or invalid credentials",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

## /users/profile Endpoint Documentation

### Description
This endpoint retrieves the profile information of the authenticated user. It requires a valid authentication token.

### Request
**Method:** GET  
**URL:** /users/profile

#### Headers
```json
{
  "Authorization": "Bearer jwt-token"
}
```

### Responses

##### Success (200)
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ... other user data
  }
}
```

##### Error (401)
```json
{
  "message": "Unauthorized access"
}
```

## /users/logout Endpoint Documentation

### Description
This endpoint logs out the current user by invalidating their token. It requires a valid authentication token.

### Request
**Method:** GET  
**URL:** /users/logout

#### Headers
```json
{
  "Authorization": "Bearer jwt-token"
}
```

### Responses

##### Success (200)
```json
{
  "message": "Logged out successfully"
}
```

##### Error (401)
```json
{
  "message": "Unauthorized access"
}
```

