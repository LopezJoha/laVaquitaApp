Tabla de Usuarios: 

CREATE TABLE users 
    (id integer primary key NOT NULL, 
    name varchar(100) NOT NULL, 
    email varchar(50) NOT NULL, 
    password varchar(100) NOT NULL, 
    createdAt date NOT NULL); 

INSERT INTO users (id, name, email, password, createAt) values (1, 'Johana Lopez', '@gmail.com','1234', NOW()); 


Tabla Grupo 

CREATE TABLE group 
(id integer PRIMARY KEY NOT NULL, 
    CONSTRAINT fk_group_owner_user_id integer FOREIGN KEY(users.id) 
        REFERENCES users(id)); 