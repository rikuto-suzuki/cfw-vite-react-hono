-- Migration number: 0002 	 2025-07-27T02:28:18.280Z

INSERT INTO todos (title, description, is_done, created_at, updated_at)
VALUES
('Sample Todo 1', 'This is a sample todo item.', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sample Todo 2', 'This is another sample todo item.', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sample Todo 3', 'This is yet another sample todo item.', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);