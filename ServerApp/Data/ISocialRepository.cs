using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Models;

namespace ServerApp.Data
{
    public interface ISocialRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChanges();

        Task<User> GetUser(int id);
        Task<IEnumerable<User>> GetUsers(UserQueryParams userParams);

        Task<IEnumerable<Post>> GetPosts();
        Task<Post> GetPostById(int postId);
        Task<IEnumerable<Post>> GetUserPosts(int id);
        Task<IEnumerable<UserLikePost>> GetLikedPostByUserId(int id);
        Task<UserLikePost> GetDeletedPost(int id, int postId);


        Task<bool> IsAlreadyFollowed(int followerUserId, int userId);
    }
}