namespace EmployeeManagementSystem.Application.ReturnObject;

public class Result<T>
{
    public bool IsSuccess { get; private set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ErrorMessage { get; private set; }


    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Message { get; private set; }


    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ErrorCode { get; private set; }


    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? StatusCode { get; private set; }

    public T? Data { get; private set; }
    private Result() { }

    public static Result<T> Success(T? data) =>
        new Result<T> { IsSuccess = true, Data = data };

    public static Result<T> Success(string message) =>
    new Result<T>
    {
        IsSuccess = true,
        Message = message
    };

    public static Result<T> Success(string message, string statusCode, T? data) =>
        new Result<T> { IsSuccess = true, Data = data, Message = message, StatusCode = statusCode };

    public static Result<T> Failure(string errorMessage, string? errorCode = null) =>
        new Result<T> { IsSuccess = false, ErrorMessage = errorMessage, ErrorCode = errorCode };
}
