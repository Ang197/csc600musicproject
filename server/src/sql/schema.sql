CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	song_artist text NOT NULL,
	releaseDate text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, song_artist, releaseDate, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'Unknown', '2015','E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
 (2, 'Tetris Theme Song', 'Hirokazu Tanaka', '1984','E4 B3 C4 D4 C4 B3 A3 A3 C4 E4 D4 C4 B3 C4 D4 E4 C4 A3 A3 D4 F4 A4 G4 F4 E4 C4 E4 D4 C4 B3 B3 C4 D4 E4 C4 A3 A3'),
 (3, 'Smoke on the Water', 'Deep Purple', '1972', 'G3, B3, D4, B3, G3, D4, B3, G3, B3, G3'),
 (4, 'Seven Nation Army', 'The White Stripes', '2003', 'E3, G3, G3, G#3, G3, E3, C3, B2'),
 (5, 'Mario Theme Song', 'Koji Kondo', '1985','E4 E4 E4 C4 E4 G4 G3 C4 G3 E3 A3 B3 A3 G3 E4 G4 A4 F4 G4 E4 C4 D4 B3'),
 (6, 'Zeldas Lullaby', 'Koji Kondo', '1998', 'E4 B4 D5 B4 G4 E4 B4 D5 B4 G4 E4 B4 C5 B4 A4'),
 (7, 'Harry Potter Theme (Hedwigs Theme)', 'John Williams', '2001', 'E4 E4 F#4 E4 B4 A4 F#4 E4 F#4 E4 B4 C#5 A4 A4'),
 (8, 'Happy Birthday', 'Patty Hill and Mildred J. Hill', '1893', 'G4 G4 A4 G4 C5 B4 G4 G4 A4 G4 D5 C5'),
 (9, 'Star Wars Main Theme', 'John Williams', '1977', 'G4 G4 G4 D5 B4 G5 D5 B4 G5 D5 G5 A5 G5 F#5 E5 D5 C5 B4 G5'),
 (10, 'Song of Storms', 'Koji Kondo', '1998', 'D4 F4 D5 D4 F4 D5 E4 F4 E4 C4 A4 A4 C4 E4');
