namespace EmployeeManagementSystem.Application.Extensions;

public static class QueryableExtensions
{
    public static async Task<GridResult<T>> ToPagedResultAsync<T>(
         this IQueryable<T> query,
         IDataTableQuery parameters)
    {
        var totalRecords = await query.CountAsync();

        if (!string.IsNullOrEmpty(parameters.SortColumn))
        {
            query = query.OrderBy($"{parameters.SortColumn} {parameters.SortDirection}");
        }

        var data = await query
            .Skip(parameters.PageNumber)
            .Take(parameters.PageSize)
            .ToListAsync();

        return new GridResult<T>
        {
            RecordsTotal = totalRecords,
            RecordsFiltered = totalRecords,
            Data = data
        };
    }
}
