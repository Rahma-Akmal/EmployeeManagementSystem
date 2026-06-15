using EmployeeManagementSystem.Application.IServices;
using EmployeeManagementSystem.Application.Services;
using EmployeeManagementSystem.Domain.Interfaces.IUnitOfWork;
using EmployeeManagementSystem.Infrastructure.Data.Context;
using EmployeeManagementSystem.Infrastructure.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();
            builder.Services.AddScoped<IDepartmentService, DepartmentService>();

            var app = builder.Build();

            
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
            

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=employees}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
