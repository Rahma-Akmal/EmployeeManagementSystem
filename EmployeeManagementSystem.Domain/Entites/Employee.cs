namespace EmployeeManagementSystem.Domain.Entites;

public class Employee : BaseEntity
{
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string MobileNumber { get; set; } = null!;
    public string JobTitle { get; set; } = null!;
    public DateTime HireDate { get; set; }
    public bool IsActive { get; set; }
    public int DepartmentId { get; set; }
    public Department Department { get; set; } = null!;
}
