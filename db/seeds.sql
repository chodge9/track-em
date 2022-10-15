USE employee_db;
INSERT INTO department(dept_name) VALUES("accounting"),("hr"), ("sales");
INSERT INTO role(title, salary, dept_id) VALUES ("accountant", 50000, 1), ("manager", 70000, 2), ("sales", 45000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("chris", "jones", 2, null), ("lee", "smith", 1, 1), ("sara", "ton", 3, 1);