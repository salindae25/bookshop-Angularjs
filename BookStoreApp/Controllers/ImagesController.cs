using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace BookStoreApp.Controllers
{
    public class Image
    {
         public System.Web.HttpPostedFileBase aFile { get; set; }
         public string id { get; set; }
    }
    public class ImagesController : Controller
    {

        [HttpPost]
        public ActionResult Upload(Image imgFile)
        {
            HttpPostedFileBase file = imgFile.aFile;
            string name = imgFile.id;
            if (file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                name +="."+ fileName.Split('.').Last();
                var path = Path.Combine(Server.MapPath("~/Content/img"), name);
                file.SaveAs(path);
            }
            return Json("Tutorial Saved", JsonRequestBehavior.AllowGet);
        }
    }
}