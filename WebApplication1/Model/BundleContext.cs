using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestWebAPI.Model
{
    public class BundleContext : DbContext
    {
        public BundleContext(DbContextOptions<BundleContext> options) : base(options)
        {

        }

        public DbSet<Bundle> Bundle { get; set; }
        public DbSet<CardDetails> Card { get; set; }
    }
}
