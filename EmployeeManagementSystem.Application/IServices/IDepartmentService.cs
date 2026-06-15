namespace EmployeeManagementSystem.Application.IServices;

public interface IDepartmentService
{
    Task<Result<GridResult<DepartmentDto>>> GetAllAsync(DepartmentFilterDto filter);
    Task<Result<List<DepartmentDto>>> GetAllForDropdownAsync();
}

