namespace EmployeeManagementSystem.Web.Controllers;

public class EmployeesController(
    IEmployeeService _employeeService,
    IDepartmentService _departmentService) : Controller
{
    public async Task<IActionResult> Index()
    {
        var deps = await _departmentService.GetAllForDropdownAsync();
        ViewBag.Departments = deps.Data;
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> GetEmployees([FromBody] EmployeeFilterDto filter)
    {
        var result = await _employeeService.GetAllAsync(filter);

        if (!result.IsSuccess || result.Data == null)
            return Ok(new { recordsTotal = 0, recordsFiltered = 0, data = new List<EmployeeListDto>() });

        return Ok(new
        {
            recordsTotal = result.Data.RecordsTotal,
            recordsFiltered = result.Data.RecordsFiltered,
            data = result.Data.Data
        });
    }

    [HttpGet]
    public async Task<IActionResult> Create()
    {
        var model = new EmployeeFormViewModel();
        await FillDropdowns(model);
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(EmployeeFormViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { isSuccess = false, message = "Please fill required fields" });

        var dto = new CreateEmployeeDto
        {
            FullName = model.FullName,
            Email = model.Email,
            MobileNumber = model.MobileNumber,
            JobTitle = model.JobTitle,
            HireDate = model.HireDate!.Value,
            DepartmentId = model.DepartmentId!.Value,
            IsActive = model.IsActive
        };

        var result = await _employeeService.CreateAsync(dto);

        return result.IsSuccess
            ? Ok(new { isSuccess = true })
            : BadRequest(new { isSuccess = false, message = result.ErrorMessage });
    }
    private async Task FillDropdowns(EmployeeFormViewModel model)
    {
        var result = await _departmentService.GetAllForDropdownAsync();
        model.Departments = result.Data.Select(x => new SelectListItem
        {
            Value = x.Id.ToString(),
            Text = x.Name,
            Selected = x.Id == model.DepartmentId
        }).ToList();
    }

    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var result = await _employeeService.GetByIdAsync(id);

        if (!result.IsSuccess)
            return NotFound();

        var emp = result.Data;

        var model = new EmployeeFormViewModel
        {
            Id = emp.Id,
            FullName = emp.FullName,
            Email = emp.Email,
            MobileNumber = emp.MobileNumber,
            JobTitle = emp.JobTitle,
            HireDate = emp.HireDate,
            DepartmentId = emp.DeptId,
            IsActive = emp.IsActive,
        };

        await FillDropdowns(model);
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(EmployeeFormViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { isSuccess = false, message = "Please fill all required fields" });

        var dto = new UpdateEmployeeDto
        {
            Id = model.Id,
            FullName = model.FullName,
            Email = model.Email,
            MobileNumber = model.MobileNumber,
            JobTitle = model.JobTitle,
            HireDate = model.HireDate!.Value,
            DepartmentId = model.DepartmentId!.Value,
            IsActive = model.IsActive,
        };

        var result = await _employeeService.UpdateAsync(dto);

        return result.IsSuccess
            ? Ok(new { isSuccess = true })
            : BadRequest(new { isSuccess = false, message = result.ErrorMessage });
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _employeeService.DeleteAsync(id);

        if (!result.IsSuccess)
        {
            return BadRequest(new
            {
                isSuccess = false,
                message = result.ErrorMessage
            });
        }

        return Ok(new
        {
            isSuccess = true,
            message = result.Data
        });
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleActive(int id)
    {
        var result = await _employeeService.ToggleActiveAsync(id);

        return Json(new
        {
            isSuccess = result.IsSuccess,
            message = result.IsSuccess ? result.Data : result.ErrorMessage
        });
    }

}
