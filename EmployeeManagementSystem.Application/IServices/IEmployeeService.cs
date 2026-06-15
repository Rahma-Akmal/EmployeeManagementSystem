namespace EmployeeManagementSystem.Application.IServices;

public interface IEmployeeService
{
    Task<Result<GridResult<EmployeeListDto>>> GetAllAsync(EmployeeFilterDto filter);
    Task<Result<EmployeeListDto>> GetByIdAsync(int id);
    Task<Result<string>> CreateAsync(CreateEmployeeDto dto);
    Task<Result<string>> UpdateAsync(UpdateEmployeeDto dto);
    Task<Result<string>> DeleteAsync(int id); 
    Task<Result<string>> ToggleActiveAsync(int id);
    Task<bool> IsEmailExistsAsync(string email, int currentId);
}