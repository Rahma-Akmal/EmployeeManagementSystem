namespace EmployeeManagementSystem.Domain.Common.Pagination;

public class GridResult<T>
{
    public int RecordsTotal { get; set; }
    public int RecordsFiltered { get; set; }
    public List<T> Data { get; set; } = new();
}
