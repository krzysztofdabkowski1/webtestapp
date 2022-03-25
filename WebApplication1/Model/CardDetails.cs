using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestWebAPI.Model
{
    public class CardDetails
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "int")]
        public int bundleId { get; set; }

        [Column(TypeName="nvarchar(100)")]
        public string nativeExpression { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string foreignExpression { get; set; }

    }
}
