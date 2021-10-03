## Java vs JavaScript (JS)
- JS is single-threaded
    - one piece of your application running at any point in time
- In Java you create a new thread and make the DB request, and wait till the results come
- In Node.js
    - libuv is used when making network calls for DB requests, when reading files
        - async system calls
        - a pool of threads is maintained and used
    - once operation is complete, your callback function (part of the application) is queued for execution
        - when the Node.js runtime is free (function call stack is empty) it executes your callback function
