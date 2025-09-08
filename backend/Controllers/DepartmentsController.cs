using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApiProject.Data;
using MyApiProject.Models;

namespace MyApiProject.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly AppDbContext _context;
    public DepartmentsController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetDepartments()
    {
        var departments = await _context.Departments
            // .Include(d => d.Users)
            .ToListAsync();
        return Ok(departments);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDepartment(int id)
    {
        var dept = await _context.Departments
            // .Include(d => d.Users)
            .FirstOrDefaultAsync(d => d.Id == id);
        return dept == null ? NotFound() : Ok(dept);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDepartment([FromBody] Department dept)
    {
        _context.Departments.Add(dept);
        await _context.SaveChangesAsync();
        return Ok(dept);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDepartment(int id, [FromBody] Department dept)
    {
        var existing = await _context.Departments.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = dept.Name;
        await _context.SaveChangesAsync();
        return Ok(existing);
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
