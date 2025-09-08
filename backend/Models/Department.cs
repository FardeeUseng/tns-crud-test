namespace Backend.Models;

public class Department
{
  public int Id { get; set; }
  public string Name { get; set; } = "";

  // Navigation property
  public List<User> Users { get; set; } = new();
}
