namespace EmployeeManagementSystem.Application.Services;

public class DepartmentService(IUnitOfWork _unitOfWork) : IDepartmentService
{
    public async Task<Result<GridResult<DepartmentDto>>> GetAllAsync(DepartmentFilterDto filter)
    {
        var query = _unitOfWork.Repository<Department>().GetQueryable();

        if (!string.IsNullOrEmpty(filter.Search))
        {
            var text = filter.Search.ToLower();
            query = query.Where(d => d.Name.ToLower().Contains(text));
        }

        var mapped = query.Select(d => new DepartmentDto
        {
            Id = d.Id,
            Name = d.Name,
            EmployeeCount = d.Employees.Count(e => !e.IsDeleted)
        });

        var result = await mapped.ToPagedResultAsync(filter);

        return Result<GridResult<DepartmentDto>>.Success(result);
    }

    public async Task<Result<List<DepartmentDto>>> GetAllForDropdownAsync()
    {
        var departments = await _unitOfWork.Repository<Department>()
            .GetQueryable()
            .Select(d => new DepartmentDto
            {
                Id = d.Id,
                Name = d.Name
            })
            .ToListAsync();

        return Result<List<DepartmentDto>>.Success(departments);
    }
}
