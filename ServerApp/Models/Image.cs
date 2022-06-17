using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }

        public int PostId { get; set; }
        //  Normalde nullable fakat yukarıdaki tanımlama ile zorunlu yaptık
        public Post Post { get; set; }
    }
}