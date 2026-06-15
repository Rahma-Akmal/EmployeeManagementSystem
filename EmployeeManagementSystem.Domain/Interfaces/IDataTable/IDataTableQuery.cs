namespace EmployeeManagementSystem.Domain.Interfaces.IDataTable;

public interface IDataTableQuery
{
    int PageSize { get; set; }
    int PageNumber { get; set; }
    string SortColumn { get; set; }
    string SortDirection { get; set; }
    string? Search { get; set; }
}
