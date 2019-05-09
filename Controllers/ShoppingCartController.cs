using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Cart.API.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    // Per https://andrewlock.net/model-binding-json-posts-in-asp-net-core/, [ApiController] in ASP.NET Core 2.1
    // causes MVC to infer that all complex parameters are [FromBody].
    [ApiController]
    //    [Authorize]
    public class ShoppingCartController : ControllerBase
    {

        #region Properties
        private IList<string> ExtraGetParams { get; set; } = new List<string>();

        protected ILogger Logger { get; set; }
        private IConfiguration Configuration { get; set; }

        #endregion

        public ShoppingCartController()
        {

            Console.Out.WriteLine("Launching ShoppingCartController");

        }

        [HttpGet, Route("product")]
        public IActionResult Product()
        {
            // product list
            Console.Out.WriteLine("Ping!");
            var lst = new List<Product>();
            for (var index = 0; index < 5; index++)
            {
                lst.Add(new Product()
                {
                    Name = $"product { index }",
                    Description = $"description {index}",
                    Price = 1,
                    Id = index
                });
            }
            var resp =
                   new BaseResponse<IList<Product>>(200, "Success")
                   {
                       Content = lst.ToArray()
                   };
            return new JsonResult(resp);

        }

        [HttpPost, Route("order")]
        public async Task<IActionResult> Order(Order order)
        {
            Console.Out.WriteLine("Creating order.");
            // validations.
            // save order. (the async op)
            // return order with ID
            order.Id = 999;

            var resp =
                   new BaseResponse<Order>(200, "Success")
                   {
                       Content = order
                   };
            Console.Out.WriteLine($"Faking an Order save,and returning a response.");
            return new JsonResult(resp);
        }


    }
    /// <summary>
    /// All responses from this microservice should extend this class.
    /// </summary>
    public class BaseResponse<T>
    {
        public BaseResponse() { }

        public BaseResponse(int status, string message, T content = default(T))
        {
            Content = content;
            StatusCode = status;
            Message = message;
        }

        public T Content { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public Dictionary<string, string> Details { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class Order
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("cart")] 
        IList<CartItem> cart;
        [JsonProperty("shippingInfo")] 
        ShippingInfo shippingInfo;
        [JsonProperty("paymentInfo")] 
        PaymentInfo PaymentInfo;

    }
    public class CartItem
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("product")]
        public Product Product { get; set; }
        [JsonProperty("quantity")]
        private int Quantity { get; set; }



    }
    public class Product
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        
        [JsonProperty("price")]
        public decimal Price { get; set; }
    }
    public class ShippingInfo
    {

        [JsonProperty("name")]
        string Name;
        [JsonProperty("address1")]
        string Address1;
        [JsonProperty("address2")]
        string Address2;
        [JsonProperty("city")]
        string City;
        [JsonProperty("state")]
        string State;
        [JsonProperty("zip")]
        string zip;

    }
    public class PaymentInfo
    {

        [JsonProperty("cardNumber")]
        string CardNumber;

    }
}