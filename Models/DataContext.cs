using Microsoft.EntityFrameworkCore;


namespace FullStackCalendar.Models
{
    /*
     - dotnet ef migrations add <someName>
            - dotnet ef database update*/
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        // which of my models will bcome tables on the DM
        public DbSet<Task> Tasks{get; set;}

    }
}