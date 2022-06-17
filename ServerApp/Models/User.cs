using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ServerApp.Models
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public string? UniversityName { get; set; }
        public string? Department { get; set; }
        public int? Class { get; set; }
        public string? Introduction { get; set; }

        public string? ProfileImageUrl { get; set; }

        public ICollection<UserToUser> Followings { get; set; }
        public ICollection<UserToUser> Followers { get; set; }

        public ICollection<Post> Posts { get; set; }
        public ICollection<UserLikePost> LikedPosts { get; set; }
    }
}