# Employee Management System

A simple Employee Management System built with ASP.NET Core MVC and SQL Server.

## Features

* Add new employees
* Edit employee information
* Delete employees
* View employees in a searchable and filterable table
* Search by employee name or department
* Employee status management (Active / Inactive)
* Department management with employee-department relationship
* Server-side DataTables integration
* Validation and error handling
* Clean responsive UI

## Technologies Used

* ASP.NET Core MVC
* C#
* Entity Framework Core
* SQL Server
* HTML / CSS / JavaScript
* jQuery & DataTables
* Bootstrap

## Architecture

The project follows a clean layered architecture using:

* Repository Pattern
* Service Layer
* Unit of Work Pattern

## Database

The project uses Entity Framework Core migrations.
To create the database, run:

```bash
dotnet ef database update
```

## Notes

* Update the SQL Server connection string inside `appsettings.json`
* The project includes custom error handling and validation
* Built as part of a technical assessment task
