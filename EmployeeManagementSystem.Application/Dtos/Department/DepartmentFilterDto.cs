namespace EmployeeManagementSystem.Application.Dtos.Department;
public class DepartmentFilterDto:IDataTableQuery
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string SortColumn { get; set; } = "Id";
    public string SortDirection { get; set; } = "asc";
    public string? Search { get ; set; }
}
