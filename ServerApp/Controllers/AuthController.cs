using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ServerApp.Data;
using ServerApp.DTO;
using ServerApp.EmailServices;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private IEmailSender _emailSender;


        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, SocialContext context, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
                Name = model.Name,
                Gender = model.Gender,
                Created = DateTime.Now,
                LastActive = DateTime.Now,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var url = "http://localhost:4200/confirm?userId=" + user.Id + "&token=" + code + "&username=" + model.UserName + "&password=" + model.Password;

                // email

                var htmlMess = $"<body style='background-color: #f4f4f4; margin: 0 !important; padding: 0 !important; height: 100% !important;margin: 0 !important;padding: 0 !important;width: 100% !important;'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse !important;'> <tr> <td bgcolor='#FFA73B' align='center'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px; border-collapse: collapse !important;'> <tr> <td align='center' valign='top' style='padding: 40px 10px 40px 10px;'> </td></tr></table> </td></tr><tr> <td bgcolor='#FFA73B' align='center' style='padding: 0px 10px 0px 10px;'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px; border-collapse: collapse !important;'> <tr> <td bgcolor='#ffffff' align='center' valign='top' style='padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;'> <h1 style='font-size: 48px; font-weight: 400; margin: 2;'>Ho?? Geldiniz</h1> <img src=' https://img.icons8.com/clouds/100/000000/handshake.png' width='125' height='120' style='display: block; border: 0px; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;'/> </td></tr></table> </td></tr><tr> <td bgcolor='#f4f4f4' align='center' style='padding: 0px 10px 0px 10px;'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px; border-collapse: collapse !important;'> <tr> <td bgcolor='#ffffff' align='left' style='padding: 20px 30px 40px 30px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'>Ogr Medya olarak sizi aram??zda g??rmekten mutluyuz :) A????a????daki linke basarak hesab??n??z?? onaylayabilirsiniz...</p></td></tr><tr> <td bgcolor='#ffffff' align='left'> <table width='100%' border='0' cellspacing='0' cellpadding='0' style='border-collapse: collapse !important;'> <tr> <td bgcolor='#ffffff' align='center' style='padding: 20px 30px 60px 30px;'> <table border='0' cellspacing='0' cellpadding='0'> <tr> <td align='center' style='border-radius: 3px;' bgcolor='#FFA73B'> <a href='{url}' target='_blank' style='font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block; height:100%;'>Hesab??m?? Onayla</a> </td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor='#ffffff' align='left' style='padding: 0px 30px 0px 30px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'>E??er link ??al????m??yorsa a????a????daki linki taray??c??n??za yap????t??r??n??z:</p></td></tr><tr> <td bgcolor='#ffffff' align='left' style='padding: 20px 30px 20px 30px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'><a href='{url}' target='_blank' style='color: #FFA73B;'>{url}</a></p></td></tr><tr> <td bgcolor='#ffffff' align='left' style='padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'>Ogr Medya</p></td></tr></table> </td></tr></table></body>";
                await _emailSender.SendEmailAsync(user.Email, "Ogr Medya Hesap Onay??", htmlMess);
                return Ok(user);
            }

            return BadRequest(result.Errors);
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO model)
        {
            // throw new Exception("interval error");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user is null)
                return BadRequest(new { message = "username is incorrect" });

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return BadRequest(new
                {
                    message = "L??tfen hesab??n??z?? onaylay??n??z"
                });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (result.Succeeded)
            {
                return Ok(new
                {
                    token = GenerateJwtToken(user)
                });
            }
            return Unauthorized();
        }

        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId is null || token is null)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, token.Replace(" ", "+"));

                if (result.Succeeded)
                {
                    return Ok(new{
                        message = "Hesab??n??z Onayland??."
                    });
                }
                else
                {
                    return BadRequest("Ge??ersiz token");
                }

            }
            return NotFound("B??yle bir kullan??c?? yok.");
        }


        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPassword model)
        {
            if (string.IsNullOrEmpty(model.Email))
            {
                return BadRequest();
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null)
            {
                return BadRequest(new
                {
                    message = "Email adresine ait kullan??c?? bulunamad??."
                });
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var username = await _userManager.GetUserNameAsync(user);
            var url = "http://localhost:4200/reset-password?userId=" + user.Id + "&token=" + code;

            // email

            var htmlMess = $"<body style='background-color: #f4f4f4; markn: 0 !important; padding: 0 !important; height: 100% !important;margin: 0 !important;padding: 0 !important;width: 100% !important;'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse !important;'> <tr> <td bgcolor='#FFA73B' align='center'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px; border-collapse: collapse !important;'> <tr> <td align='center' valign='top' style='padding: 40px 10px 40px 10px;'> </td></tr></table> </td></tr><tr> <td bgcolor='#FFA73B' align='center' style='padding: 0px 10px 0px 10px;'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px; border-collapse: collapse !important;'> <tr> <td bgcolor='#ffffff' align='center' valign='top' style='padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;'> <h1 style='font-size: 48px; font-weight: 400; margin: 2;'>??ifremi Unuttum</h1> <img src=' https://img.icons8.com/clouds/100/000000/handshake.png' width='125' height='120' style='display: block; border: 0px; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;'/> </td></tr></table> </td></tr><tr> <td bgcolor='#f4f4f4' align='center' style='padding: 0px 10px 0px 10px;'> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px; border-collapse: collapse !important;'> <tr> <td bgcolor='#ffffff' align='left' style='padding: 20px 30px 40px 30px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'><b>{username}</b> kullan??c?? adl?? hesab??n??z??n parolas??n?? yenilemek i??in a????a??d??daki linke t??klayabilirsiniz...</p></td></tr><tr> <td bgcolor='#ffffff' align='left'> <table width='100%' border='0' cellspacing='0' cellpadding='0' style='border-collapse: collapse !important;'> <tr> <td bgcolor='#ffffff' align='center' style='padding: 20px 30px 60px 30px;'> <table border='0' cellspacing='0' cellpadding='0'> <tr> <td align='center' style='border-radius: 3px;' bgcolor='#FFA73B'> <a href='{url}' target='_blank' style='font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block; height:100%;'>??ifremi S??f??rla</a> </td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor='#ffffff' align='left' style='padding: 0px 30px 0px 30px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'>E??er link ??al????m??yorsa a????a????daki linki taray??c??n??za yap????t??r??n??z:</p></td></tr><tr> <td bgcolor='#ffffff' align='left' style='padding: 20px 30px 20px 30px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'><a href='{url}' target='_blank' style='color: #FFA73B;'>{url}</a></p></td></tr><tr> <td bgcolor='#ffffff' align='left' style='padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;'> <p style='margin: 0;'>Ogr Medya</p></td></tr></table> </td></tr></table></body>";
            await _emailSender.SendEmailAsync(model.Email, "Ogr Medya ??ifremi Unuttum", htmlMess);

            return Ok();
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPassword model)
        {
            System.Console.WriteLine(model.UserId);
            System.Console.WriteLine(model.Token);
            System.Console.WriteLine(model.Password);
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "model yanl????"
                });
            }

            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "sonu?? ba??ar??s??z"
                });
            }

            return Ok(new
            {
                username = user.UserName
            });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}