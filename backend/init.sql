CREATE TABLE Image (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE CHECK(length(title) <= 256),
    description TEXT,
    author TEXT NOT NULL,
    signature TEXT NOT NULL,
    send_date DATE NOT NULL DEFAULT CURRENT_DATE
);
