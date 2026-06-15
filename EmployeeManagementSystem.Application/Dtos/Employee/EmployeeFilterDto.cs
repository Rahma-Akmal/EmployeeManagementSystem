namespace EmployeeManagementSystem.Application.Dtos.Employee;

public class EmployeeFilterDto: IDataTableQuery
{
    public int? DepartmentId { get; set; }
    public bool? IsActive { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string SortColumn { get; set; } = "Id";
    public string SortDirection { get; set; } = "asc";
    public string? Search { get; set; }
}
