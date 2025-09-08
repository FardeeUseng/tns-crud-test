using Microsoft.EntityFrameworkCore;
using MyApiProject.Models;

namespace MyApiProject.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Department> Departments => Set<Department>();
}
