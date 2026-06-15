namespace EmployeeManagementSystem.Infrastructure.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private readonly Dictionary<string, object> _repositories = new();

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public IRepositoryGeneric<T> Repository<T>() where T : class
    {
        var key = typeof(T).Name;

        if (!_repositories.ContainsKey(key))
        {
            var repo = new RepositoryGeneric<T>(_context);
            _repositories[key] = repo;
        }

        return (IRepositoryGeneric<T>)_repositories[key];
    }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
