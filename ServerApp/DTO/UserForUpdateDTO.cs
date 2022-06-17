using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.DTO
{
    public class UserForUpdateDTO
    {
        public string? UniversityName { get; set; }
        public string? Department { get; set; }
        public int? Class { get; set; }
        public string? Introduction { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}