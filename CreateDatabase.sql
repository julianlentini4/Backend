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
    
/*    TURNOS
CREATE TABLE Turno (
	idTurno INT AUTO_INCREMENT PRIMARY KEY, 
    fechaTurno DATE, 
    horaTurno TIME, 
    estadoTurno VARCHAR(50)
    ); 

     
CREATE TABLE paciente_turno (
	idPaciente INT, 
    idTurno INT, 
    PRIMARY KEY (idPaciente, idTurno), 
    FOREIGN KEY (idPaciente) REFERENCES Paciente(idPaciente), 
    FOREIGN KEY (idTurno) REFERENCES Turno(idTurno)
    ); */
    
CREATE TABLE Agenda (
	idAgenda INT AUTO_INCREMENT, 
    matricula int,
    tipo VARCHAR(50),
    PRIMARY KEY (matricula, idAgenda),
    foreign key (matricula) references Medico(matricula)
    ); 
    
CREATE TABLE Dia (
	nroDia INT PRIMARY KEY, 
    nombre VARCHAR(50)
    ); 
    
CREATE TABLE Medico (
	matricula INT ,
    nombre VARCHAR(100), 
    idEspecialidad int,
    -- dni VARCHAR(50)
    PRIMARY KEY (matricula),
    FOREIGN KEY (idEspecialidad) REFERENCES Especialidad(idEspecialidad)
    ); 
    
CREATE TABLE Especialidad (
	idEspecialidad INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100)
    ); 
    
CREATE TABLE Sala (
	nroSala INT PRIMARY KEY, 
	estado VARCHAR(50)
    ); 
    
CREATE TABLE Ingreso (
	idIngreso INT AUTO_INCREMENT PRIMARY KEY, 
    tipo VARCHAR(50), 
    descripcion VARCHAR(255)
    ); 
    
CREATE TABLE Informe (
	idInforme INT AUTO_INCREMENT PRIMARY KEY, 
    nroAcceso VARCHAR(50),
    matricula INT,
    descripcion VARCHAR(255), 
    fechaInicio DATE, 
    fechaFirmado DATE, 
    estado VARCHAR(50),
    
    foreign key (nroAcceso) references paciente_ingreso(nroAcceso),
    foreign key (matricula) references Medico(matricula)
    ); 

CREATE TABLE dia_agenda (
	idAgenda INT, 
    nroDia INT, 
    PRIMARY KEY (idAgenda, nroDia), 
    FOREIGN KEY (idAgenda) REFERENCES Agenda(idAgenda), 
    FOREIGN KEY (nroDia) REFERENCES Dia(nroDia)
    ); 
    
CREATE TABLE paciente_ingreso (
	nroAcceso VARCHAR(50),
    descripcion VARCHAR(50),
	fechaRecepcion DATE, 
    horaRecepcion TIME, 
    matricula INT,
    dni INT, 
    idIngreso INT, 
    PRIMARY KEY (nroAcceso), 
    FOREIGN KEY (matricula) REFERENCES Medico(matricula),
    FOREIGN KEY (dni) REFERENCES Paciente(dni), 
    FOREIGN KEY (idIngreso) REFERENCES Ingreso(idIngreso)
    );

CREATE TABLE medico_especialidad (
	matricula INT, 
    idEspecialidad INT, 
    PRIMARY KEY (matricula, idEspecialidad), 
    FOREIGN KEY (matricula) REFERENCES Medico(matricula), 
    FOREIGN KEY (idEspecialidad) REFERENCES Especialidad(idEspecialidad)
    ); 
    
CREATE TABLE internado (
	dni INT, 
    nroSala INT, 
    fechaInternacion DATE, 
    fechaAlta DATE, 
    PRIMARY KEY (dni, nroSala), 
    FOREIGN KEY (dni) REFERENCES Paciente(dni), 
    FOREIGN KEY (nroSala) REFERENCES Sala(nroSala)
    );
    
    -- INSERT VALORES
-- INSERT INTO Paciente (dni,nombre, apellido, mail, obraSocial) VALUES (44291173 ,'Juan', 'Pérez', 'juan.perez@example.com', 'OSDE'), (44299173 ,'Ana', 'García', 'ana.garcia@example.com', 'Swiss Medical'); 
-- INSERT INTO Turno (fechaTurno, horaTurno, estadoTurno) VALUES ('2024-09-17', '10:00:00', 'Confirmado'), ('2024-09-18', '11:00:00', 'Pendiente'); 
-- INSERT INTO Medico (matricula, apellido, nombre, dni) VALUES (12345, 'Lopez', 'Carlos', '30123456'), (67890, 'Fernandez', 'Maria', '30987654'); 
-- INSERT INTO Especialidad (nombre) VALUES ('Cardiología'), ('Neurología');
