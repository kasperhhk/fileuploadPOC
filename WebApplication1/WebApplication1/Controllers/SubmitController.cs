using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class SubmitController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public SubmitController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [Route("submit")]
        public ActionResult Post(PostDto data)
        {
            var file = data.File;
            var text = data.Nested1.Nested2.Text;

            var filename = string.IsNullOrWhiteSpace(text) ? file.FileName : text;
            var path = Path.Combine(_hostingEnvironment.WebRootPath, "Files", filename);
            using (var fs = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(fs);
            }

            return Redirect("/");
        }

        public class PostDto
        {
            public IFormFile File { get; set; }
            public Nested1 Nested1 { get; set; }
        }

        public class Nested1
        {
            public Nested2 Nested2 { get; set; }
        }

        public class Nested2
        {
            public string Text { get; set; }
        }
    }
}