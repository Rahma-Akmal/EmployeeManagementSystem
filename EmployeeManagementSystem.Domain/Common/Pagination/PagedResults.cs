namespace EmployeeManagementSystem.Domain.Common.Pagination;

public class PagedResults<T> where T : class
{
    public IEnumerable<T> Data { get; set; } = new List<T>();

    public long TotalOfPages { get; set; }

    public long PageNumber { get; set; } = 1L;

    public int PageSize { get; set; } = 10;

    public int TotalOfItems { get; set; }

}


