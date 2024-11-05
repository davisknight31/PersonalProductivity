using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        //public DbSet<>
    }
}
