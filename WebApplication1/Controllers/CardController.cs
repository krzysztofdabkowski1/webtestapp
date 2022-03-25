using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestWebAPI.Model;

namespace TestWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly CardDetailsContext __context;
        private readonly BundleContext _context;

        public CardController(BundleContext context)
        {
            _context = context;
        }

        // GET: api/CardDeatils
        [HttpGet]
        public ActionResult<List<CardDetails>> GetBundles()
        {
            return _context.Card.ToList();
        }

        // GET: api/CardDeatils/5
        [HttpGet("{bundleId}/{id}")]
        public ActionResult<List<CardDetails>> GetCards(int id, int bundleId)
        {
            var cardDetails = _context.Card.ToList().Where(c => c.bundleId == bundleId && c.id == id).ToList();

            if (cardDetails == null)
            {
                return NotFound();
            }

            return cardDetails;
        }


    }
}
