using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class UserLikePost
    {
        [Key]
        public int Id { get; set; }
        public int LikedPostId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}