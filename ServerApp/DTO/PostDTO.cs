using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Models;

namespace ServerApp.DTO
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Context { get; set; }
        public int LikeCount { get; set; }
        public DateTime Created { get; set; }   
        public ICollection<ImageDTO> Images { get; set; }
        public User User { get; set; }
    }
}