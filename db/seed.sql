/*
3 departments
10 employees
7 roles
*/
USE employees_db;

INSERT INTO departments(name) VALUES('IT');
INSERT INTO departments(name) VALUES('Marketing');
INSERT INTO departments(name) VALUES('Finance');

INSERT INTO roles(title, salary, department_id) VALUES('Network Admin.', 87500, 1);-- 1
INSERT INTO roles(title, salary, department_id) VALUES('IT Project Manager', 115000, 1);-- 2
INSERT INTO roles(title, salary, department_id) VALUES('Developer', 70000, 1);-- 3
INSERT INTO roles(title, salary, department_id) VALUES('Marketing Manager', 70000, 2);-- 4
INSERT INTO roles(title, salary, department_id) VALUES('SEO Specialist', 58000, 2);-- 5
INSERT INTO roles(title, salary, department_id) VALUES('Bookkeeper', 90000, 3);-- 6
INSERT INTO roles(title, salary, department_id) VALUES('Finance Manager', 125000, 3);-- 7

INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Karina', 'Mohammad', 3, 2); 
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Ted', 'Shaw', 2, 2);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Dean', 'Chikatilo', 5, 6);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Aqila', 'Abbas', 3, 2); 
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Tom', 'Ratched', 6, 10);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Lama', 'Rahman', 4, 6);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Mina', 'Rashid', 6, 10);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Harold', 'Earle', 3, 2);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Fred', 'Dahmer', 1, 2);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('Karen', 'Aziz', 7, 10);