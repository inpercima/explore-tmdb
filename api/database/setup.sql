-- Database setup script for custom items
-- This script creates the necessary tables for storing custom movie/TV items

CREATE TABLE IF NOT EXISTS custom_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  comment TEXT,
  media_type VARCHAR(10) NOT NULL CHECK(media_type IN ('movie', 'tv')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100) NOT NULL
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_custom_items_created_at ON custom_items(created_at);

-- Create index on media_type for filtering
CREATE INDEX IF NOT EXISTS idx_custom_items_media_type ON custom_items(media_type);
