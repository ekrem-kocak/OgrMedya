using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Models;

namespace ServerApp.DTO
{
    public class PostForListDTO
    {
        public int Id { get; set; }
        public string Context { get; set; }
        public ICollection<PostImageForListDTO> Images { get; set; }
        public int LikeCount { get; set; }
        public DateTime Created { get; set; }

        public int UserId { get; set; }
        public UserForListDTO User { get; set; }
    }
}