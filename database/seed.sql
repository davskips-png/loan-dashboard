-- Insert sample user (password: password hashed with bcryptjs)
INSERT INTO users (email, password_hash, name)
VALUES ('admin@loansdashboard.com', '$2a$10$R9h7cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm6', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Insert sample loans
INSERT INTO loans (user_id, loan_id, customer_name, principal_amount, interest_rate, start_date, end_date, status)
VALUES
  (1, 'LOAN001', 'John Doe', 50000.00, 12.5, '2024-01-01', '2025-01-01', 'active'),
  (1, 'LOAN002', 'Jane Smith', 75000.00, 11.0, '2024-02-01', '2025-02-01', 'active'),
  (1, 'LOAN003', 'Bob Johnson', 100000.00, 13.5, '2023-06-01', '2024-06-01', 'closed'),
  (1, 'LOAN004', 'Alice Williams', 60000.00, 12.0, '2024-03-01', '2025-03-01', 'active'),
  (1, 'LOAN005', 'Charlie Brown', 45000.00, 10.5, '2024-04-01', '2025-04-01', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample disbursements
INSERT INTO disbursements (loan_id, amount, disbursement_date)
VALUES
  (1, 50000.00, '2024-01-01'),
  (2, 75000.00, '2024-02-01'),
  (3, 100000.00, '2023-06-01'),
  (4, 60000.00, '2024-03-01'),
  (5, 45000.00, '2024-04-01')
ON CONFLICT DO NOTHING;

-- Insert sample collections
INSERT INTO collections (loan_id, amount, collection_date, collection_type)
VALUES
  (1, 5000.00, '2024-02-01', 'payment'),
  (1, 5000.00, '2024-03-01', 'payment'),
  (2, 7500.00, '2024-03-01', 'payment'),
  (2, 7500.00, '2024-04-01', 'payment'),
  (3, 100000.00, '2024-06-01', 'full_payment'),
  (4, 6000.00, '2024-04-01', 'payment'),
  (5, 4500.00, '2024-05-01', 'payment')
ON CONFLICT DO NOTHING;