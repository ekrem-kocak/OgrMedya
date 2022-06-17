using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Data
{
    public class SocialRepository : ISocialRepository
    {
        private readonly SocialContext _context;

        public SocialRepository(SocialContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users
                        .Include(i => i.Posts)
                        .ThenInclude(post => post.Images)
                        .FirstOrDefaultAsync(i => i.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers(UserQueryParams userParams)
        {
            var users = _context.Users
                        .Include(i => i.Posts)
                        .ThenInclude(post => post.Images)
                        .Where(i => i.Id != userParams.UserId)
                        .OrderByDescending(i => i.LastActive)
                        .AsQueryable();

            if (userParams.Followers)
            {
                // takip edenler
                var result = await GetFollows(userParams.UserId, false);
                users = users.Where(u => result.Contains(u.Id));
            }

            if (userParams.Followings)
            {
                // takip edilenler
                var result = await GetFollows(userParams.UserId, true);
                users = users.Where(u => result.Contains(u.Id));
            }
            return await users.ToListAsync();
        }


        public async Task<IEnumerable<Post>> GetPosts()
        {
            var posts = await _context.Posts
                                    .Include(i => i.Images)
                                    .Include(i => i.User)
                                    .OrderByDescending(i => i.Created)
                                    .ToListAsync();

            return posts;
        }

        public async Task<Post> GetPostById(int postId)
        {
            var post = await _context.Posts
                                    .Where(p => p.Id == postId)
                                    .OrderByDescending(i => i.Created)
                                    .FirstOrDefaultAsync();
            return post;
        }


        public async Task<IEnumerable<Post>> GetUserPosts(int id)
        {
            var posts = await _context.Posts
                                    .Where(i => i.UserId == id)
                                    .OrderByDescending(i => i.Created)
                                    .Include(i => i.Images)
                                    .Include(i => i.User)
                                    .ToListAsync();

            return posts;
        }

        public async Task<IEnumerable<UserLikePost>> GetLikedPostByUserId(int id)
        {
            var posts = await _context.LikedPosts
                                        .Where(i => i.UserId == id)
                                        .ToListAsync();

            return posts;
        }

        public async Task<UserLikePost> GetDeletedPost(int id, int postId)
        {
            var post = await _context.LikedPosts
                                        .Where(i => i.UserId == id)
                                        .FirstOrDefaultAsync(i => i.LikedPostId == postId);

            return post;
        }

        public async Task<bool> IsAlreadyFollowed(int followerUserId, int userId)
        {
            return await _context.UserToUser.AnyAsync(i => i.FollowerId == followerUserId && i.UserId == userId);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        private async Task<IEnumerable<int>> GetFollows(int userId, bool isFollowers)
        {
            var user = await _context.Users
                                    .Include(i => i.Followers)
                                    .Include(i => i.Followings)
                                    .FirstOrDefaultAsync(i => i.Id == userId);

            if (isFollowers)
            {
                return user.Followers.Where(i => i.FollowerId == userId).Select(i => i.UserId);
            }
            else
            {
                return user.Followings.Where(i => i.UserId == userId).Select(i => i.FollowerId);
            }
        }
    }
}