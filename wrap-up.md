## Questions

### Please provide instructions on how to run your project in a bulleted list below.

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

### If you were to continue building this out, what would you like to add next?

### If you have any other comments or info you'd like the reviewers to know, please add them below.

1. I would likely normalize the db structure by adding an account_types
   table and using a foreign key constraint to enforce the type
   of account

2. I would also likely add a created_at and updated_at timestamp

3. I would also use UUID for the account_number to:
   a. avoid any potential security issues with predictable/sequential account numbers.
   b. avoid any potential issues with account numbers being reused.
   c. ensure there are no key collisions if the db needs to be migrated or merged.

The PK changes would depend on storage constraints, as UUID is 16 bytes vs 4 bytes for an integer, also if the account_number is used as a reference in other tables it would be more efficient to use an integer. Lastly if this app will be monolothic we can just use INT as it's unlikely we'll see PK collisions, but if we are using microservices, we should use UUID.
