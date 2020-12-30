
# TaskManager

NodeJS express backend for a simple task app that remember your todos.

## Indices

* [Users](#users)
  
  * [Register](#1-register)
  * [Login](#2-login)
  * [Get Profile](#3-get-profile)
  * [Update Profile](#4-update-profile)
  * [Upload Profile Picture](#5-upload-profile-picture)
  * [Get Profile Picture](#6-get-profile-picture)
  * [Delete Profile Picture](#7-delete-profile-picture)
  * [Logout](#8-logout)
  * [Delete Account](#9-delete-account)

* [Tasks](#tasks)
  * [New Task](#1-new-task)
  * [List Tasks](#2-list-tasks)
  * [Get Task by ID](#3-get-task-by-id)
  * [Update Task by ID](#4-update-task-by-id)
  * [Delete Task by ID](#5-delete-task-by-id)

--------

## users

User account management related APIs

### 1. Register

Creates a new user

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://task-9715.herokuapp.com/users
```

***Body:***

```js
{
    "name": "Harshit",
    "age": 23,
    "password": "MightyCat",
    "email": "harshit9715@gmail.com"
}
```

### 2. Login

Login a user with email and password

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://task-9715.herokuapp.com/users/login
```

***Body:***

```js
{
    "email": "harshit9715@gmail.com",
    "password": "MightyCat"
}
```

### 3. Get Profile

Get current user's profile.

***Endpoint:***

```bash
Method: GET
Type: 
URL: https://task-9715.herokuapp.com/users/me
```

### 4. Update Profile

Update user profile details.

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://task-9715.herokuapp.com/users/me
```

***Body:***

```js
{
    "age": 22,
    "name": "Harshit Gupta",
    "password": "MightyCat",
    "email": "harshit9715@gmail.com"
}
```

### 5. Upload Profile Picture

Upload profile picture as multi-part formdata

***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: https://task-9715.herokuapp.com/users/me/avatar
```

***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| avatar |  |  |

### 6. Get Profile Picture

Get user's profile picture.

***Endpoint:***

```bash
Method: GET
Type: 
URL: https://task-9715.herokuapp.com/users/:id/avatar
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |

### 7. Delete Profile Picture

Delete user's profile picture.

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://task-9715.herokuapp.com/users/me/avatar
```

### 8. Logout

Logout the user from the application

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://task-9715.herokuapp.com/users/logout
```

***Body:***

```js
{
    "global": false
}
```

### 9. Delete Account

Delete user's account and profile and remove all created tasks.

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://task-9715.herokuapp.com/users/me
```

## tasks

Task related APIs.

### 1. New Task

Create a new Task

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://task-9715.herokuapp.com/tasks
```

***Body:***

```js
{
    "description": "Wash cloths",
    "completed": true
}
```

### 2. List Tasks

List all tasks

***Endpoint:***

```bash
Method: GET
Type: 
URL: https://task-9715.herokuapp.com/tasks
```

### 3. Get Task by ID

Get Task by ID

***Endpoint:***

```bash
Method: GET
Type: 
URL: https://task-9715.herokuapp.com/tasks/5fea1565266ce8e6a72e16f4
```

### 4. Update Task by ID

Update Task by ID

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://task-9715.herokuapp.com/tasks/5fea1565266ce8e6a72e16f4
```

***Body:***

```js
{
    "description": "wash cloths again",
    "completed": false
}
```

### 5. Delete Task by ID

Delete Task by ID

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://task-9715.herokuapp.com/tasks/5fea1565266ce8e6a72e16f4
```

***Available Variables:***

| Key | Value | Type |
| --- | ------|-------------|
| url | [https://task-9715.herokuapp.com](https://task-9715.herokuapp.com) |  |
| token |  |  |
| id |  |  |

--------
[Back to top](#taskmanager)
