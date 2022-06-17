using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Models;

namespace ServerApp.DTO
{
    public class UserForListDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string? UniversityName { get; set; }
        public string? Department { get; set; }
        public string? Class { get; set; }
        public bool EmailConfirmed { get; set; }

        public string ProfileImageUrl { get; set; }
        public ICollection<PostDTO> Posts { get; set; }
    }
}