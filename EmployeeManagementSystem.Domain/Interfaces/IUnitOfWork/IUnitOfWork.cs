namespace EmployeeManagementSystem.Domain.Interfaces.IUnitOfWork;

public interface IUnitOfWork : IDisposable
{
    IRepositoryGeneric<T> Repository<T>() where T : class;

    Task<int> CompleteAsync();
}
