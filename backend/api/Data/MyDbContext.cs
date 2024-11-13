using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.Property(u => u.Id).HasColumnName("id");
                entity.Property(u => u.UserName).HasColumnName("user_name");
                entity.Property(u => u.Password).HasColumnName("password");
                entity.Property(u => u.FirstName).HasColumnName("first_name");
                entity.Property(u => u.LastName).HasColumnName("last_name");
            });

            modelBuilder.Entity<Models.Task>(entity =>
            {
                entity.ToTable("tasks");
                entity.Property(t => t.Id).HasColumnName("id");
                entity.Property(t => t.UserId).HasColumnName("user_id");
                entity.Property(t => t.Name).HasColumnName("name");
                entity.Property(t => t.Description).HasColumnName("description");
                entity.Property(t => t.DateAdded).HasColumnName("date_added");
                entity.Property(t => t.Priority).HasColumnName("priority");
                entity.Property(t => t.BackLogged).HasColumnName("back_logged");
                entity.Property(t => t.Completed).HasColumnName("completed");

                entity.Property(t => t.Priority).HasConversion<string>();

            });

            modelBuilder.Entity<Note>(entity =>
            {
                entity.ToTable("notes");
                entity.Property(t => t.Id).HasColumnName("id");
                entity.Property(t => t.UserId).HasColumnName("user_id");
                entity.Property(t => t.Name).HasColumnName("name");
                entity.Property(t => t.DateAdded).HasColumnName("date_added");
                entity.Property(t => t.Content).HasColumnName("content");
            });
        }
    }
}
