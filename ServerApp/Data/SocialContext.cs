using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Data
{
    public class SocialContext : IdentityDbContext<User, Role, int>
    {
        public SocialContext(DbContextOptions<SocialContext> options) : base(options)
        {

        }

        public DbSet<UserToUser> UserToUser { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<UserLikePost> LikedPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserToUser>()
                .HasKey(k => new { k.UserId, k.FollowerId });

            builder.Entity<UserToUser>()
                .HasOne(l => l.User)
                .WithMany(a => a.Followers)
                .HasForeignKey(l => l.FollowerId);

            builder.Entity<UserToUser>()
                .HasOne(l => l.Follower)
                .WithMany(a => a.Followings)
                .HasForeignKey(l => l.UserId);

        }
    }
}