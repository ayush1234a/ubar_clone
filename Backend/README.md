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

