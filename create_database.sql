-- Database name

-- Document your create tables SQL here
CREATE TABLE treats (
id SERIAL PRIMARY KEY,
name varchar(120) NOT NULL,
description varchar(360) NOT NULL,
pic varchar(240) NOT NULL
);
INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
SELECT *
FROM treats;
