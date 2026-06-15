namespace EmployeeManagementSystem.Application.Services;

public class EmployeeService(IUnitOfWork _unitOfWork) : IEmployeeService
{
    public async Task<Result<GridResult<EmployeeListDto>>> GetAllAsync(EmployeeFilterDto filter)
    {
        var query = _unitOfWork.Repository<Employee>()
            .GetQueryable();

        if (!string.IsNullOrEmpty(filter.Search))
        {
            var text = filter.Search.ToLower();
            query = query.Where(e =>
                e.FullName.ToLower().Contains(text) ||
                e.Department.Name.ToLower().Contains(text));
        }

        if (filter.DepartmentId.HasValue)
            query = query.Where(e => e.DepartmentId == filter.DepartmentId.Value);

        if (filter.IsActive.HasValue)
            query = query.Where(e => e.IsActive == filter.IsActive.Value);

        var mapped = query.Select(e => new EmployeeListDto
        {
            Id = e.Id,
            FullName = e.FullName,
            Email = e.Email,
            MobileNumber = e.MobileNumber,
            JobTitle = e.JobTitle,
            DepartmentName = e.Department.Name,
            HireDate = e.HireDate,
            IsActive = e.IsActive
        });

        var result = await mapped.ToPagedResultAsync(filter);

        return Result<GridResult<EmployeeListDto>>.Success(result);
    }

    public async Task<Result<EmployeeListDto>> GetByIdAsync(int id)
    {
        var employee = await _unitOfWork.Repository<Employee>()
            .GetQueryable()
            .Where(e => e.Id == id && !e.IsDeleted)
            .Select(e => new EmployeeListDto
            {
                Id = e.Id,
                FullName = e.FullName,
                Email = e.Email,
                MobileNumber = e.MobileNumber,
                JobTitle = e.JobTitle,
                DepartmentName = e.Department.Name,
                HireDate = e.HireDate,
                IsActive = e.IsActive,
                DeptId = e.DepartmentId

            })
            .FirstOrDefaultAsync();

        if (employee == null)
            return Result<EmployeeListDto>.Failure("Employee Not Found");

        return Result<EmployeeListDto>.Success(employee);
    }

    public async Task<Result<string>> CreateAsync(CreateEmployeeDto dto)
    {
        try
        {
            if (await IsEmailExistsAsync(dto.Email, 0))
                return Result<string>.Failure("Email Already Exists");

            var employee = new Employee
            {
                FullName = dto.FullName,
                Email = dto.Email,
                MobileNumber = dto.MobileNumber,
                JobTitle = dto.JobTitle,
                HireDate = dto.HireDate,
                DepartmentId = dto.DepartmentId,
                IsActive = dto.IsActive,
            };

            await _unitOfWork.Repository<Employee>().AddAsync(employee);

            if (await _unitOfWork.CompleteAsync() > 0)
                return Result<string>.Success("Employee Added Successfully");

            return Result<string>.Failure("An Error Happened While Creating");
        }
        catch (Exception)
        {
            return Result<string>.Failure("An Unexpected Error Happened");
        }
    }

    public async Task<Result<string>> UpdateAsync(UpdateEmployeeDto dto)
    {
        try
        {
            var employee = await _unitOfWork.Repository<Employee>()
                .GetItemAsync(e => e.Id == dto.Id && !e.IsDeleted);

            if (employee == null)
                return Result<string>.Failure("Employee Not Found");

            if (await IsEmailExistsAsync(dto.Email, dto.Id))
                return Result<string>.Failure("Email Already Exists");

            employee.FullName = dto.FullName;
            employee.Email = dto.Email;
            employee.MobileNumber = dto.MobileNumber;
            employee.JobTitle = dto.JobTitle;
            employee.HireDate = dto.HireDate;
            employee.DepartmentId = dto.DepartmentId;
            employee.IsActive = dto.IsActive;
            employee.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.Repository<Employee>().UpdateAsync(employee);

            if (await _unitOfWork.CompleteAsync() > 0)
                return Result<string>.Success("Employee Updated Successfully");

            return Result<string>.Failure("An Error Happened While Updating");
        }
        catch (Exception)
        {
            return Result<string>.Failure("An Unexpected Error Happened");
        }
    }

    public async Task<Result<string>> DeleteAsync(int id)
    {
        try
        {
            var employee = await _unitOfWork.Repository<Employee>()
                .GetItemAsync(e => e.Id == id && !e.IsDeleted);

            if (employee == null)
                return Result<string>.Failure("Employee Not Found");

            employee.IsDeleted = true;
            employee.DeletedAt = DateTime.UtcNow;

            await _unitOfWork.Repository<Employee>().UpdateAsync(employee);

            if (await _unitOfWork.CompleteAsync() > 0)
                return Result<string>.Success("Employee Deleted Successfully");

            return Result<string>.Failure("An Error Happened While Deleting");
        }
        catch (Exception)
        {
            return Result<string>.Failure("An Unexpected Error Happened");
        }
    }

    public async Task<Result<string>> ToggleActiveAsync(int id)
    {
        try
        {
            var employee = await _unitOfWork.Repository<Employee>()
                .GetItemAsync(e => e.Id == id && !e.IsDeleted);

            if (employee == null)
                return Result<string>.Failure("Employee Not Found");

            employee.IsActive = !employee.IsActive;

            await _unitOfWork.Repository<Employee>().UpdateAsync(employee);

            if (await _unitOfWork.CompleteAsync() > 0)
                return Result<string>.Success(
                    employee.IsActive ? "Employee Activated" : "Employee Deactivated");

            return Result<string>.Failure("An Error Happened");
        }
        catch (Exception)
        {
            return Result<string>.Failure("An Unexpected Error Happened");
        }
    }

    public async Task<bool> IsEmailExistsAsync(string email, int currentId)
    {
        return await _unitOfWork.Repository<Employee>()
            .ExistsAsync(e => e.Email == email && e.Id != currentId);
    }
}
