namespace EmployeeManagementSystem.Web.Controllers;

public class DepartmentController(IDepartmentService _departmentService) : Controller
{
    public IActionResult Index()
    {
        return View();
    }
    [HttpPost]
    public async Task<IActionResult> GetDepartments([FromBody] DepartmentFilterDto filter)
    {
        var result = await _departmentService.GetAllAsync(filter);

        if (!result.IsSuccess || result.Data == null)
            return Ok(new { recordsTotal = 0, recordsFiltered = 0, data = new List<DepartmentDto>() });

        return Ok(new
        {
            recordsTotal = result.Data.RecordsTotal,
            recordsFiltered = result.Data.RecordsFiltered,
            data = result.Data.Data
        });
    }
}
