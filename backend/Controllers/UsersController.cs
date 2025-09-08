using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  private readonly AppDbContext _context;
  public UsersController(AppDbContext context) => _context = context;

  [HttpGet]
  public async Task<IActionResult> GetUsers()
  {
    var users = await _context.Users
      .Select(u => new UserDto
      {
        Id = u.Id,
        Name = u.Name,
        Email = u.Email,
        DepartmentId = u.DepartmentId
      })
      .ToListAsync();
    return Ok(users);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetUser(int id)
  {
    var u = await _context.Users
      .Where(u => u.Id == id)
      .Select(u => new UserDto
      {
        Id = u.Id,
        Name = u.Name,
        Email = u.Email,
        DepartmentId = u.DepartmentId
      })
      .FirstOrDefaultAsync();
    return u == null ? NotFound() : Ok(u);
  }

  [HttpPost]
  public async Task<IActionResult> CreateUser([FromBody] UserDto dto)
  {
    var user = new User
    {
      Name = dto.Name,
      Email = dto.Email,
      DepartmentId = dto.DepartmentId
    };
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return Ok(user);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto dto)
  {
    var user = await _context.Users.FindAsync(id);
    if (user == null) return NotFound();
    user.Name = dto.Name;
    user.Email = dto.Email;
    user.DepartmentId = dto.DepartmentId;
    await _context.SaveChangesAsync();
    return Ok(user);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteUser(int id)
  {
    var user = await _context.Users.FindAsync(id);
    if (user == null) return NotFound();
    _context.Users.Remove(user);
    await _context.SaveChangesAsync();
    return NoContent();
  }
}
