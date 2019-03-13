# Disney Parents Backend

- Designed by Brandon Lent

## Tech Used

- NodeJS & express.
- Bcrypt & JWT for handling Authentication.
- KnexJS
  - Generates the DB
  - Seeds the DB
  - Configures the DB
- SQLite3 for local database
- Postgres for server database.
- Twilio
  - Sends text message when user replies to your post
- Jest for testing

## Usage

**The Package manager used for this project is yarn**

1. Clone and change directory into the project.
2. Install dependancies

```
yarn install
```

3. Start the server

```
yarn server
```

## Schema

- The schema consists of three seperate tables, **users, posts, and commentSection**

## **users** TABLE

```
Data Structure:
   id: int -> Auto increments
   username: string -> REQUIRED
   password: string -> REQUIRED
   accountType: string -> REQUIRED
```

## **posts** TABLE

```
Data Structure:
   id: int -> Auto increments
   title: string -> REQUIRED
   meetingPlace: string -> REQUIRED
   time: string -> REQUIRED,
   numOfKids: int -> REQUIRED
   timestamps: int, int -> auto generates
   user_id: int -> FK to users table 'id' field | REQUIRED
```

## **commentSection** TABLE

```
Data structure:
   id: int -> Auto increments
   comment: string -> REQUIRED
   repliedBy: string -> REQUIRED
   timestamps: int, int -> auto generates
   post_id: int -> FK to posts table 'id' field | REQUIRED
```

---

## Accessing Data

### Register

```
URL: /api/auth/register
TYPE: POST
--------------
Data required:
{
   username: string,
   password: string,
   accountType: string
}
--------------
Data sent back:
{
   "message": "Account created!",
   "username": string
}
```

### Login

```
URL: /api/auth/login
TYPE: POST
--------------
Data required:
{
   username: string,
   password: string
}
--------------
Data sent back:
{
   message: "Welcome!",
   token: string,
   username: string,
   userId: int,
   accountType: string
}
```

### Get ALL Users

```
URL: /api/users
TYPE: GET
--------------
Data required:
headers:{
   Authorization: token
}
--------------
Data sent back
{
   users: [
      id: int,
      username: string,
      password: string
   ]
}
```

### Get User by Id

```
URL: /api/users/:id
TYPE: GET
--------------
Data required:
headers:{
   Authorization: token
}
--------------
Data sent back
{
   users: {
      id: int,
      username: string,
      password: string,
      accountType: string
   }
}
```

### Update User

```
URL: /api/users/:id
TYPE: PUT
--------------
Data required:
headers:{
   Authorization: token
}
body: {
   username: string,
   password: string,
   accountType: strng
}
--------------
Data sent back
{

}
```

### Get All Posts

```
URL: /api/posts
TYPE: GET
--------------
Data required:
headers:{
   Authorization: token
}
--------------
Data sent back
[
   {
      id: int,
      title: string,
      meetingPlace: string,
      time: string,
      numOfKids: int,
      user_id: int,
      created_at: string,
      updated_at: string,
      postedBy: string,
      comment: [
         {
            id: int,
            comment: string,
            repliedBy: string,
            post_id: int,
            created_at: string,
            updated_at: string
         }
      ]
   }
]
```
