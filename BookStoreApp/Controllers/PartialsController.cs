using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BookStoreApp.Controllers
{
    public class PartialsController : Controller
    {
        // GET: Partials
        public ActionResult BookDetail()
        {
            return View();
        }
        public ActionResult BookList()
        {
            return View();
        }
        public ActionResult BookCart()
        {
            return View();
        }
        public ActionResult BookAdd()
        {
            return View();
        }
        public ActionResult BookEdit()
        {
            return View();
        }
    }
}