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
using ServerApp.Helpers;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [ServiceFilter(typeof(LastActiveActionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ISocialRepository _socialRepository;
        private readonly IMapper _mapper;

        public UsersController(ISocialRepository socialRepository, IMapper mapper)
        {
            _socialRepository = socialRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserQueryParams userParams)
        {
            await Task.Delay(300);
            userParams.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var users = await _socialRepository.GetUsers(userParams);

            if (users is null)
            {
                return NotFound();
            }
            var result = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _socialRepository.GetUser(id);

            var result = _mapper.Map<UserForDetailsDTO>(user);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDTO model)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return BadRequest("not valid request");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _socialRepository.GetUser(id);

            if (model.ProfileImageUrl.Length == 0)
            {
                model.ProfileImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png";
            }

            _mapper.Map(model, user);

            var result = await _socialRepository.SaveChanges();
            System.Console.WriteLine(result);
            if (result)
            {
                return Ok();
            }

            throw new System.Exception("güncelleme sırasında bir hata oluştu");
        }

        [HttpPost("{followerUserId}/follow/{userId}")]
        public async Task<IActionResult> FollowUser(int followerUserId, int userId)
        {
            if (followerUserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (followerUserId == userId)
                return BadRequest("Kendizi takip edemezsiniz");

            var IsAlreadyFollowed = await _socialRepository
                .IsAlreadyFollowed(followerUserId, userId);

            if (IsAlreadyFollowed)
                return BadRequest("Zaten kullanıcıyı takip ediyorsunuz");

            if (await _socialRepository.GetUser(userId) == null)
                return NotFound();

            var follow = new UserToUser()
            {
                UserId = userId,
                FollowerId = followerUserId
            };

            _socialRepository.Add<UserToUser>(follow);

            if (await _socialRepository.SaveChanges())
                return Ok();

            return BadRequest("Hata Oluştu");

        }

        [HttpPost("{followerUserId}/unfollow/{userId}")]
        public async Task<IActionResult> UnfollowUser(int followerUserId, int userId)
        {
            if (followerUserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (followerUserId == userId)
                return BadRequest();

            if (await _socialRepository.GetUser(userId) == null)
                return NotFound();

            var unfollow = new UserToUser()
            {
                UserId = userId,
                FollowerId = followerUserId
            };

            _socialRepository.Delete<UserToUser>(unfollow);

            if (await _socialRepository.SaveChanges())
                return Ok(unfollow);

            return BadRequest("Hata Oluştu");
        }
    }
}