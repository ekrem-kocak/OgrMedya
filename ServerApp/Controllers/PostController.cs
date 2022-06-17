using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Data;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PostController : ControllerBase
    {

        private readonly ISocialRepository _socialRepository;
        private readonly IMapper _mapper;

        public PostController(ISocialRepository socialRepository, IMapper mapper)
        {
            _socialRepository = socialRepository;
            _mapper = mapper;
        }

        [HttpPost("createPost")]
        public async Task<IActionResult> CreatePost(UserForPostCreateDTO model)
        {
            var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _socialRepository.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            List<Image> list = new List<Image>();
            Random rnd = new Random();

            foreach (var item in model.Images)
            {
                list.Add(new Image()
                {
                    Url = item.Url
                });
            }


            var post = new Post()
            {
                UserId = id,
                Context = model.Context,
                Images = list,
                Created = DateTime.Now
            };

            foreach (var item in post.Images)
            {
                System.Console.WriteLine(item.Id);
                System.Console.WriteLine(item.Url);
            }

            _socialRepository.Add<Post>(post);

            if (await _socialRepository.SaveChanges())
                return Ok();

            return BadRequest("Hata Oluştu");
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            await Task.Delay(300);
            var posts = await _socialRepository.GetPosts();

            if (posts is null)
            {
                return NotFound();
            }

            var result = _mapper.Map<IEnumerable<PostForListDTO>>(posts);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserPost(int id)
        {
            var posts = await _socialRepository.GetUserPosts(id);

            if (posts is null)
            {
                return NotFound();
            }

            var result = _mapper.Map<IEnumerable<PostForListDTO>>(posts);

            return Ok(result);
        }

        [HttpPost("like")]
        public async Task<IActionResult> LikePost(int postId, int userId)
        {
            var post = await _socialRepository.GetPostById(postId);
            var user = await _socialRepository.GetUser(userId);

            if (post is null || user is null)
            {
                return NotFound();
            }

            var likedPost = new UserLikePost()
            {
                UserId = userId,
                LikedPostId = postId
            };

            _socialRepository.Add<UserLikePost>(likedPost);

            post.LikeCount += 1;

            if (await _socialRepository.SaveChanges())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("dislike")]
        public async Task<IActionResult> DislikePost(int postId, int userId)
        {
            var post = await _socialRepository.GetPostById(postId);
            var user = await _socialRepository.GetUser(userId);

            if (post is null || user is null)
            {
                return NotFound();
            }

            post.LikeCount -= 1;

            var deletedPost = await _socialRepository.GetDeletedPost(userId, postId);

            _socialRepository.Delete<UserLikePost>(deletedPost);

            if (await _socialRepository.SaveChanges())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet("getLikedPostByUserId/{id}")]
        public async Task<IActionResult> GetLikedPostByUserId(int id)
        {
            var likedPosts = await _socialRepository.GetLikedPostByUserId(id);

            if (likedPosts is null)
            {
                return NotFound();
            }

            var result = _mapper.Map<IEnumerable<LikedPostDTO>>(likedPosts);

            return Ok(result);
        }

        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            var post = await _socialRepository.GetPostById(postId);

            if (post is null)
            {
                return NotFound();
            }

            _socialRepository.Delete<Post>(post);

            if (await _socialRepository.SaveChanges())
            {
                return Ok();
            }

            return BadRequest();
        }

    }
}