using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookStoreApp.DTOs
{
    public class BookDetailDto
    {
        public string Name { get; set; }
        public string Genre { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string Author { get; set; }
    }
}