using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
  private readonly AppDbContext _context;
  public DepartmentsController(AppDbContext context) => _context = context;

  [HttpGet]
  public async Task<IActionResult> GetDepartments()
  {
    var depts = await _context.Departments
      .Include(d => d.Users)
      .Select(d => new DepartmentDto
      {
        Id = d.Id,
        Name = d.Name,
        Users = d.Users.Select(u => new UserDto
          {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            DepartmentId = u.DepartmentId
          }).ToList()
        })
        .ToListAsync();

    return Ok(depts);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetDepartment(int id)
  {
    var d = await _context.Departments
      .Include(d => d.Users)
      .Where(d => d.Id == id)
      .Select(d => new DepartmentDto
        {
          Id = d.Id,
          Name = d.Name,
          Users = d.Users.Select(u => new UserDto
          {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            DepartmentId = u.DepartmentId
          }).ToList()
        })
        .FirstOrDefaultAsync();

    return d == null ? NotFound() : Ok(d);
  }

  [HttpPost]
  public async Task<IActionResult> CreateDepartment([FromBody] DepartmentDto dto)
  {
    var dept = new Department { Name = dto.Name };
    _context.Departments.Add(dept);
    await _context.SaveChangesAsync();
    return Ok(dept);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateDepartment(int id, [FromBody] DepartmentDto dto)
  {
    var dept = await _context.Departments.FindAsync(id);
    if (dept == null) return NotFound();
    dept.Name = dto.Name;
    await _context.SaveChangesAsync();
    return Ok(dept);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteDepartment(int id)
  {
    var dept = await _context.Departments.FindAsync(id);
    if (dept == null) return NotFound();
    _context.Departments.Remove(dept);
    await _context.SaveChangesAsync();
    return NoContent();
  }
}
