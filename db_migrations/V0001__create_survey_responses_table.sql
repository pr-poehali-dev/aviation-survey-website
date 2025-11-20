CREATE TABLE IF NOT EXISTS survey_responses (
    id SERIAL PRIMARY KEY,
    interest VARCHAR(50) NOT NULL,
    knowledge VARCHAR(50) NOT NULL,
    career VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_created_at ON survey_responses(created_at);
