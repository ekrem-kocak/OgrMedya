using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.DTO
{
    public class UserForPostCreateDTO
    {
        public string Context { get; set; }
        public ICollection<UserForCreatePostImageDTO> Images { get; set; }
    }
}