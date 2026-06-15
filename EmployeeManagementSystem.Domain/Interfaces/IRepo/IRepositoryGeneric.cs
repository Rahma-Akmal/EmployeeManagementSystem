namespace EmployeeManagementSystem.Domain.Interfaces.IRepo;

public interface IRepositoryGeneric<T> where T : class
{
    IQueryable<T> GetQueryable();

    Task<T?> GetByIdAsync(int id);

    Task<T?> GetFirstOrDefaultAsync(
        Expression<Func<T, bool>> predicate,
        params Expression<Func<T, object>>[] includes);
    Task AddAsync(T entity);

    Task UpdateAsync(T entity);

    Task DeleteAsync(T entity);
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
    Task<T?> GetItemAsync(Expression<Func<T, bool>> predicate);

}
