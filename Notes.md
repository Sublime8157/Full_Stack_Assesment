## Environment Setup

1. Copy `.env.example` to `.env`
2. Update database credentials inside `.env`
3. Run:

   dotnet ef database update
   dotnet run


In frontend:
1. Copy `.env.example` to `.env`
2. Run:
   npm install
   npm run dev


## Important Notes

There should be a feature where it can add users but i was not able to do that, 
so as  you can see in Frontend on add button the userId was hardcoded to 1 where 
it should not be hardcoded.

So before testing kindly add atleast 1 user, for your convience please run the script below on your postgre command
"INSERT INTO "Users" ("Email", "PasswordHash")
VALUES ('test@example.com', 'hashed_password_here')
RETURNING *;"
