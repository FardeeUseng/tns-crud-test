namespace Backend.DTOs;

public class UserDto
{
  public int Id { get; set; }
  public string Name { get; set; } = "";
  public string Email { get; set; } = "";
  public int DepartmentId { get; set; }
}
