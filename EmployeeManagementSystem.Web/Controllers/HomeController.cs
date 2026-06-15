namespace EmployeeManagementSystem.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerFeature>();

            var exception = exceptionFeature?.Error;

            var model = new ErrorViewModel
            {
                Message = exception?.Message ?? "Unknown error",
                StackTrace = exception?.StackTrace,
                RequestId = HttpContext.TraceIdentifier
            };

            return View(model);
        }
    }
}
