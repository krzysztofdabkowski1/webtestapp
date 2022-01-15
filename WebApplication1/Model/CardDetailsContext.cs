using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestWebAPI.Model
{
    public class CardDetailsContext: DbContext
    {
        public CardDetailsContext(DbContextOptions<CardDetailsContext> options): base(options)
        {
                     
        }

        public DbSet<CardDetails> CardDetails { get; set; }
    }
}
