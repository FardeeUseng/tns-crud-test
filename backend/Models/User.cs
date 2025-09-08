namespace Backend.Models;

public class User
{
  public int Id { get; set; }
  public string Name { get; set; } = "";
  public string Email { get; set; } = "";

  public int DepartmentId { get; set; }

  // ป้องกัน reference cycle
  [System.Text.Json.Serialization.JsonIgnore]
  public Department? Department { get; set; }
}
