namespace EmployeeManagementSystem.Web.Models
{
    public class EmployeeFormViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Full Name is required")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mobile is required")]
        public string MobileNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Job Title is required")]
        public string JobTitle { get; set; } = string.Empty;

        [Required(ErrorMessage = "Hire Date is required")]
        public DateTime? HireDate { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public int? DepartmentId { get; set; }
        public bool IsActive { get; set; } = true;
        public List<SelectListItem> Departments { get; set; } = new();
    }
}
