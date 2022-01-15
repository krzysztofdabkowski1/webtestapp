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
        public int CardDetailsID { get; set; }

        [Column(TypeName="nvarchar(100)")]
        public string NativeExpression { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string ForeignExpression { get; set; }

        [Column(TypeName = "int")]
        public int NativeLangID { get; set; }

        [Column(TypeName = "int")]
        public int ForeignLangID { get; set; }
    }
}
