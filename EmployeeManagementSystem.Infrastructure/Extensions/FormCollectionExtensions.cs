namespace EmployeeManagementSystem.Infrastructure.Extensions
{
    public static class FormCollectionExtensions
    {
        public static DataTableParameters  DataTableParameters(this IFormCollection form)
        {
            return new DataTableParameters
            {
                PageNumber = int.Parse(form["start"]!),
                PageSize = int.Parse(form["size"]!),
                SortDirection = form["order[0][dir]"]!,
                SortColumn = form[
                    $"columns[{form["order[0][column]"]}][data]"]!,
                Search = form["search[value]"]!
            };
        }
    }

}
