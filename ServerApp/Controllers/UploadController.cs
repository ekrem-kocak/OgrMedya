using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ", "-").ToLower();
                    var extension = Path.GetExtension(fileName);
                    var randomName = string.Format($"{DateTime.Now.Ticks}{extension}");


                    System.Console.WriteLine(fileName);
                    System.Console.WriteLine(randomName);

                    var fullPath = Path.Combine(pathToSave, randomName);
                    var dbPath = Path.Combine(folderName, randomName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost("uploadPhotoForPost"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadPhotoForPost()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                System.Console.WriteLine("**************");
                System.Console.WriteLine(file);
                var folderName = Path.Combine("Resources", "Posts");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ", "-").ToLower();
                    var extension = Path.GetExtension(fileName);
                    var randomName = string.Format($"{DateTime.Now.Ticks}{extension}");


                    System.Console.WriteLine(fileName);
                    System.Console.WriteLine(randomName);

                    var fullPath = Path.Combine(pathToSave, randomName);
                    var dbPath = Path.Combine(folderName, randomName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}