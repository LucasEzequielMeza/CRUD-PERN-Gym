CREATE TABLE client (
    id SERIAL PRIMARY KEY,                       -- Crea una columna `id` que es un identificador único para cada cliente. `SERIAL` indica que se incrementará automáticamente. `PRIMARY KEY` establece que esta columna será la clave principal.
    first_name VARCHAR(255) NOT NULL,            -- Crea una columna `name` para almacenar el nombre del cliente. `VARCHAR(255)` especifica que puede contener hasta 255 caracteres. `NOT NULL` asegura que este campo no puede estar vacío.
    last_name VARCHAR(255) NOT NULL,             -- Crea una columna `last_name` para almacenar el apellido del cliente. `VARCHAR(255)` permite hasta 255 caracteres y `NOT NULL` asegura que no puede estar vacío.
    address VARCHAR(255) NOT NULL,               -- Crea una columna `address` para almacenar la dirección del cliente. `VARCHAR(255)` permite hasta 255 caracteres y `NOT NULL` asegura que no puede estar vacío.
    birth_date DATE NOT NULL,                    -- Crea una columna `birth_date` para almacenar la fecha de nacimiento del cliente. `DATE` indica que el tipo de dato es una fecha. `NOT NULL` asegura que no puede estar vacío.
    email VARCHAR(255) UNIQUE NOT NULL,          -- Crea una columna `email` para almacenar el correo electrónico del cliente. `VARCHAR(255)` permite hasta 255 caracteres. `UNIQUE` asegura que el correo electrónico sea único para cada cliente. `NOT NULL` asegura que no puede estar vacío.
    phone_number VARCHAR(20) UNIQUE NOT NULL,    -- Crea una columna `phone_number` para almacenar el número de teléfono del cliente. `VARCHAR(20)` permite hasta 20 caracteres. `UNIQUE` asegura que el número de teléfono sea único. `NOT NULL` asegura que no puede estar vacío.
    password VARCHAR(255) NOT NULL,              -- Crea una columna `password` para almacenar la contraseña del cliente. `VARCHAR(255)` permite hasta 255 caracteres y `NOT NULL` asegura que no puede estar vacío.
    membership_start_date DATE,         -- Crea una columna `membership_start_date` para almacenar la fecha de inicio de la membresía del cliente. `DATE` indica que el tipo de dato es una fecha. `NOT NULL` asegura que no puede estar vacío.
    membership_expiry_date DATE,        -- Crea una columna `membership_expiry_date` para almacenar la fecha de vencimiento de la membresía del cliente. `DATE` indica que el tipo de dato es una fecha. `NOT NULL` asegura que no puede estar vacío.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,        -- Crea una columna `created_at` para almacenar la fecha y hora de creación del registro. `TIMESTAMP` indica que el tipo de dato es una marca de tiempo. `DEFAULT CURRENT_TIMESTAMP` establece el valor por defecto como la fecha y hora actuales.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP         -- Crea una columna `updated_at` para almacenar la fecha y hora de la última actualización del registro. `TIMESTAMP` indica que el tipo de dato es una marca de tiempo. `DEFAULT CURRENT_TIMESTAMP` establece el valor por defecto como la fecha y hora actuales.
    role VARCHAR(50) NOT NULL
);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_client_updated_at
BEFORE UPDATE ON client
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    type_class VARCHAR(50),
    title VARCHAR(100),
    description TEXT,
    data_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_timestamp
BEFORE UPDATE ON clases
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TABLE exercise (
    id INT PRIMARY KEY,
    name_exercise VARCHAR(100),
    description TEXT,
    body_part VARCHAR(50),
    link VARCHAR(255), -- Opcional: enlace a un video de demostración
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_timestamp
BEFORE UPDATE ON exercise
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TABLE routines (
    id SERIAL PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    description TEXT,
    day_of_week VARCHAR(20), -- Ejemplo: "Lunes", "Martes", etc.
    duration INT, -- Duración en minutos
    goals VARCHAR(255), -- Objetivos de la rutina
    completed BOOLEAN DEFAULT FALSE, -- Indicador de si la rutina ha sido completada
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_timestamp
BEFORE UPDATE ON routines
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();




CREATE TABLE membership (
    id SERIAL PRIMARY KEY,                       -- Identificador único de la membresía
    client_id INT NOT NULL,                      -- Referencia al identificador del cliente en la tabla `client`
    start_date DATE NOT NULL,                    -- Fecha de inicio de la membresía
    end_date DATE NOT NULL,                      -- Fecha de vencimiento de la membresía
    membership_type VARCHAR(255) NOT NULL,       -- Tipo de membresía (mensual, trimestral, anual, etc.)
    status VARCHAR(50) NOT NULL,                 -- Estado de la membresía (activa, expirada, suspendida, etc.)
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE  -- Clave foránea que referencia al cliente y elimina sus membresías en cascada si se elimina el cliente
);


CREATE TABLE payment (
    id SERIAL PRIMARY KEY,                       -- Identificador único del pago
    client_id INT NOT NULL,                      -- Referencia al identificador del cliente en la tabla `client`
    payment_date DATE NOT NULL,                  -- Fecha del pago realizado por el cliente
    amount DECIMAL(10, 2) NOT NULL,              -- Monto pagado
    payment_method VARCHAR(50) NOT NULL,         -- Método de pago utilizado (efectivo, tarjeta, transferencia, etc.)
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE  -- Clave foránea que referencia al cliente y elimina sus pagos en cascada si se elimina el cliente
);
