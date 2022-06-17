using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Context { get; set; }
        public ICollection<Image> Images { get; set; }
        public int LikeCount { get; set; }
        public DateTime Created { get; set; }

        public int UserId { get; set; }
        //  Normalde nullable fakat yukarıdaki tanımlama ile zorunlu yaptık
        public User User { get; set; }
    }
}