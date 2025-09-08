namespace Backend.DTOs;

public class DepartmentDto
{
  public int Id { get; set; }
  public string Name { get; set; } = "";
  public List<UserDto> Users { get; set; } = new();
}
