-- DELETE DATABASE SI YA EXISTE
DROP DATABASE IF EXISTS hospital;

-- CREATE DATABASE 
CREATE DATABASE hospital; USE hospital; 

-- CREATE TABLES
CREATE TABLE Paciente ( 
    dni INT PRIMARY KEY,
    nombre VARCHAR(100), 
    apellido VARCHAR(100), 
    mail VARCHAR(100), 
    obraSocial VARCHAR(100)
    ); 
    
CREATE TABLE Especialidad (
	idEspecialidad INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100)
    ); 

CREATE TABLE Medico (
	matricula INT unique,
    apellido VARCHAR(20),
    nombre VARCHAR(20), 
	dni INT unique,
    PRIMARY KEY (matricula)
    ); 

CREATE TABLE Ingreso (
	idIngreso INT AUTO_INCREMENT PRIMARY KEY, 
    tipo VARCHAR(50), 
    descripcion VARCHAR(255)
    ); 
    
CREATE TABLE Sala (
	nroSala INT PRIMARY KEY, 
	estado VARCHAR(50)
    ); 
    
/*    TURNOS
CREATE TABLE Turno (
	idTurno INT AUTO_INCREMENT PRIMARY KEY, 
    fechaTurno DATE, 
    horaTurno TIME, 
    estadoTurno VARCHAR(50)
    ); 
*/

CREATE TABLE Dia (
	nroDia INT PRIMARY KEY, 
    nombre VARCHAR(50)
    ); 


CREATE TABLE Agenda (
	idAgenda INT auto_increment, 
    matricula int,
    tipo VARCHAR(50),
    PRIMARY KEY (idAgenda),
    foreign key (matricula) references Medico(matricula) ON DELETE CASCADE
    ); 

CREATE TABLE dia_agenda (
	idAgenda INT, 
    horaAtencion TIME,
    nroDia INT,
    PRIMARY KEY (idAgenda, horaAtencion,nroDia), 
    FOREIGN KEY (idAgenda) REFERENCES Agenda(idAgenda) ON DELETE CASCADE,
    FOREIGN KEY (nroDia) REFERENCES Dia(nroDia) ON DELETE CASCADE
    ); 
    
CREATE TABLE paciente_ingreso (
	nroAcceso INT auto_increment unique,
    descripcion VARCHAR(50),
	fechaRecepcion DATE, 
    horaRecepcion TIME, 
    matricula INT,
    tipo VARCHAR(10),
    dni INT, 
    idIngreso INT, 
    PRIMARY KEY (nroAcceso), 
    FOREIGN KEY (matricula) REFERENCES Medico(matricula) ON DELETE CASCADE,
    FOREIGN KEY (dni) REFERENCES Paciente(dni) ON DELETE CASCADE, 
    FOREIGN KEY (idIngreso) REFERENCES Ingreso(idIngreso)ON DELETE CASCADE
    );
    
CREATE TABLE Informe (
	idInforme INT UNIQUE AUTO_INCREMENT PRIMARY KEY, 
    nroAcceso int UNIQUE,
    matricula INT,
    descripcion VARCHAR(255), 
    fechaInicio DATE, 
    fechaFirmado DATE, 
    estado VARCHAR(50),
    foreign key (nroAcceso) references paciente_ingreso(nroAcceso)ON DELETE CASCADE,
    foreign key (matricula) references Medico(matricula)ON DELETE CASCADE
    ); 

CREATE TABLE medico_especialidad (
	matricula INT, 
    idEspecialidad INT, 
    PRIMARY KEY (matricula, idEspecialidad), 
    FOREIGN KEY (matricula) REFERENCES Medico(matricula) ON DELETE CASCADE, 
    FOREIGN KEY (idEspecialidad) REFERENCES Especialidad(idEspecialidad) ON DELETE CASCADE
    ); 
    
CREATE TABLE internacion (
	dni INT, 
    nroSala INT, 
    fechaInternacion DATE, 
    fechaAlta DATE, 
    PRIMARY KEY (dni, nroSala), 
    FOREIGN KEY (dni) REFERENCES Paciente(dni) ON DELETE CASCADE, 
    FOREIGN KEY (nroSala) REFERENCES Sala(nroSala) ON DELETE CASCADE
    );
    
    CREATE TABLE users (
	username varchar(10) unique, 
    clave varchar(60) unique, 
    tipo varchar(20), 
    sector varchar(20),
    descripcion varchar(20), 
    PRIMARY KEY (username) 
    );

    CREATE TABLE Access (
    apiUrl varchar(20) primary key, 
    descripcion varchar(20)
    );
    
	CREATE TABLE Users_Access (
	apiUrl varchar(20), 
	tipoUsuario varchar(15),
    method varchar(6),
    PRIMARY KEY (tipo,apiUrl,method),
    FOREIGN KEY (apiUrl) REFERENCES Access(apiUrl) ON DELETE CASCADE
    );
    
    -- INSERT VALORES -- Orden correcto
INSERT INTO Access (ApiUrl, descripcion) 
VALUES 
('/sala', 'Sala'),
('/paciente', 'Paciente'),
('/internacion', 'Internacion');   
    
INSERT INTO users (username, clave, tipo, sector, descripcion) 
VALUES 
('JULIAN', '123456', 'ADMIN', 'SISTEMAS', 'JULIAN LENTINI'),
('JUANMA', '123455', 'OPERADOR', 'CONSULTORIOS', 'JUAN MANUEL'),
('CIRA', '123454', 'ADMIN', 'SISTEMAS', 'CIRA LENTINI');

INSERT INTO Users_Access(apiUrl,username) 
VALUES 
('/sala', 'JUANMA'),
('/internacion', 'CIRA'),
('/paciente', 'PAPAa');
    
INSERT INTO Paciente (dni, nombre, apellido, mail, obraSocial) 
VALUES 
(44291173, 'Juan', 'Pérez', 'juan.perez@example.com', 'OSDE'),
(44299173, 'Ana', 'García', 'ana.garcia@example.com', 'Swiss Medical'),
(44301174, 'Pedro', 'López', 'pedro.lopez@example.com', 'IOMA'),
(44302175, 'Lucía', 'Martínez', 'lucia.martinez@example.com', 'Galeno');

INSERT INTO Especialidad (nombre) 
VALUES 
('Cardiología'),
('Neurología'),
('Pediatría'),
('Dermatología');

INSERT INTO Sala (nroSala, estado) 
VALUES 
(101, 'Disponible'),
(102, 'Ocupada'),
(103, 'Limpieza'),
(104, 'Disponible');

INSERT INTO Ingreso (tipo, descripcion) 
VALUES 
('Urgencia', 'Ingreso por accidente'),
('Programado', 'Cirugía programada'),
('Consulta', 'Consulta médica regular'),
('Emergencia', 'Ingreso por emergencia médica');

INSERT INTO Medico (matricula,apellido, nombre, dni) 
VALUES 
(12345,'Lepi' ,'Carlos',44291172 ), 
(67890,'fernanda' ,'María',44290130),
(54321,'fer' ,'Mario',44290131),
(98765,'Pelado' ,'Marianel',44290122);

INSERT INTO paciente_ingreso (descripcion, fechaRecepcion, horaRecepcion, matricula,tipo, dni, idIngreso) 
VALUES 
('Accidente automovilístico', '2024-09-20', '09:30:00', 12345,'Diag' ,44291173, 1),
('Consulta médica', '2024-09-21', '10:00:00', 67890, 'Int',44299173, 3),
('Operación de rodilla', '2024-09-22', '11:30:00', 54321, 'Int',44301174, 2),
('Chequeo general', '2024-09-23', '12:00:00', 98765, 'Guardia',44302175, 4);


INSERT INTO Informe (nroAcceso, matricula, descripcion, fechaInicio, fechaFirmado, estado) 
VALUES 
(1, 12345, 'Informe detallado de consulta', '2024-09-20', '2024-09-21', 'Firmado'),
(2, 67890, 'Informe de urgencia', '2024-09-22', '2024-09-23', 'Firmado'),
(3, 54321, 'Informe de cirugía', '2024-09-25', NULL, 'Pendiente'),
(4, 98765, 'Informe de seguimiento', '2024-09-26', '2024-09-27', 'Firmado');

INSERT INTO Agenda (idAgenda, matricula, tipo) 
VALUES 
(1, 12345, 'Consulta'),
(2, 12345, 'Cirugía'),
(3, 54321, 'Control'),
(4, 98765, 'Consulta');

INSERT INTO Dia (nroDia, nombre) 
VALUES 
(1, 'Lunes'),
(2, 'Martes'),
(3, 'Miércoles'),
(4, 'Jueves');

INSERT INTO dia_agenda (idAgenda,horaAtencion,nroDia) 
VALUES 
(1,'10:30:00' ,1),
(2,'10:20:00',2),
(3,'10:30:00' ,3),
(4,'10:40:00',4);

INSERT INTO medico_especialidad (matricula, idEspecialidad) 
VALUES 
(12345, 1),
(67890, 2),
(54321, 1),
(98765, 2);

INSERT INTO internacion (dni, nroSala, fechaInternacion, fechaAlta) 
VALUES 
(44291173, 101, '2024-09-17', '2024-09-20'),
(44299173, 102, '2024-09-18', NULL),
(44301174, 103, '2024-09-19', '2024-09-22'),
(44302175, 104, '2024-09-20', NULL);

INSERT INTO users_access (apiUrl, tipoUsuario, method)
VALUES
('/users','ADMIN','GET')