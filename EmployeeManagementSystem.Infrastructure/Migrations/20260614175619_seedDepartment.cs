using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EmployeeManagementSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class seedDepartment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsDeleted", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 6, 14, 17, 56, 14, 726, DateTimeKind.Utc).AddTicks(9852), null, false, "IT", null },
                    { 2, new DateTime(2026, 6, 14, 17, 56, 14, 726, DateTimeKind.Utc).AddTicks(9857), null, false, "HR", null },
                    { 3, new DateTime(2026, 6, 14, 17, 56, 14, 726, DateTimeKind.Utc).AddTicks(9859), null, false, "Marketing", null },
                    { 4, new DateTime(2026, 6, 14, 17, 56, 14, 726, DateTimeKind.Utc).AddTicks(9860), null, false, "Software Engineering", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
