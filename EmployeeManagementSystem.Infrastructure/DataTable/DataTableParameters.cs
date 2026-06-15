namespace EmployeeManagementSystem.Infrastructure.DataTable;

public class DataTableParameters : IDataTableQuery
{
    public int PageSize { get; set; } = 10;
    public int PageNumber { get; set; } = 1;
    public string SortColumn { get; set; } = "Id";
    public string SortDirection { get; set; } = "asc";
    public string? Search { get; set; }
}
