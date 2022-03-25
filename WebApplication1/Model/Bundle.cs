using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestWebAPI.Model
{
    public class Bundle
    {
        [Key]
        public int bundleID{ get; set; }

        [Column(TypeName = "int")]
        public int ownerID { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string name { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string description { get; set; }

        [Column(TypeName = "int")]
        public int cardsQuantity { get; set; }

        [Column(TypeName = "date")]
        public DateTime startDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime updateDate { get; set; }

        [Column(TypeName = "nvarchar(5)")]
        public string nativeLang { get; set; }
    
        [Column(TypeName = "nvarchar(5)")]
        public string foreignLang { get; set; }

        [Column(TypeName = "int")]
        public int isPublic { get; set; }
    }
}
