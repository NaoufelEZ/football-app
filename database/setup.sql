-- Football App Database Setup - English Schema
-- =============================================

-- Drop existing table if needed
DROP TABLE IF EXISTS teams CASCADE;

-- Create teams table (English) with UNIQUE constraint
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,  -- 👈 UNIQUE EKLENDİ
    country VARCHAR(50),
    founded_year INTEGER,
    logo_url TEXT,
    stadium VARCHAR(100),
    manager VARCHAR(100),
    league VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample teams data (NOW WITH UNIQUE CONSTRAINT)
INSERT INTO teams (name, country, founded_year, stadium, manager, league) VALUES 
('Galatasaray', 'Turkey', 1905, 'Rams Park', 'Okan Buruk', 'Super Lig'),
('Fenerbahçe', 'Turkey', 1907, 'Ülker Stadium', 'İsmail Kartal', 'Super Lig'),
('Beşiktaş', 'Turkey', 1903, 'Vodafone Park', 'Fernando Santos', 'Super Lig'),
('Trabzonspor', 'Turkey', 1967, 'Şenol Güneş Stadium', 'Abdullah Avcı', 'Super Lig'),
('Manchester City', 'England', 1880, 'Etihad Stadium', 'Pep Guardiola', 'Premier League'),
('Barcelona', 'Spain', 1899, 'Camp Nou', 'Xavi Hernández', 'La Liga'),
('Real Madrid', 'Spain', 1902, 'Santiago Bernabéu', 'Carlo Ancelotti', 'La Liga'),
('Bayern Munich', 'Germany', 1900, 'Allianz Arena', 'Thomas Tuchel', 'Bundesliga'),
('Paris Saint-Germain', 'France', 1970, 'Parc des Princes', 'Luis Enrique', 'Ligue 1'),
('Juventus', 'Italy', 1897, 'Allianz Stadium', 'Massimiliano Allegri', 'Serie A')
ON CONFLICT (name) DO NOTHING;

-- Create update trigger for teams
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at 
BEFORE UPDATE ON teams 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verification queries
SELECT '✅ Database setup completed successfully!' as message;
SELECT '📊 Total teams:' as info, COUNT(*) as count FROM teams;
SELECT '🏆 Sample teams:' as info, name, country FROM teams ORDER BY name LIMIT 5;