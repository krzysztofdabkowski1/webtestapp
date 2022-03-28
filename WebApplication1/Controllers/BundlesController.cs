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
    public class BundleController : ControllerBase
    {
        private readonly CardDetailsContext __context;
        private readonly BundleContext _context;

        public BundleController(BundleContext context)
        {
            _context = context;
        }

        // GET: api/CardDeatils
        [HttpGet]
        public ActionResult<List<Bundle>> GetBundles()
        {
            return _context.Bundle.ToList();
        }

        // GET: api/Bundle/5
        [HttpGet("{id}")]
        public ActionResult<Bundle> GetBundle(int bundleId)
        {
            Bundle bundle = (Bundle) _context.Bundle.ToList().Where(c => c.bundleID == bundleId);
    
            if (bundle == null)
            {
                return NotFound();
            }

            return bundle;
        }

        // PUT: api/CardDeatils/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCardDetails(int id, CardDetails cardDetails)
        {
            if (id != cardDetails.id)
            {
                return BadRequest();
            }

            _context.Entry(cardDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CardDeatils
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CardDetails>> PostCardDetails(CardDetails cardDetails)
        {
            __context.CardDetails.Add(cardDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCardDeatils", new { id = cardDetails.id }, cardDetails);
        }

        // DELETE: api/CardDeatils/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCardDetails(int id)
        {
            var cardDetails = await __context.CardDetails.FindAsync(id);
            if (cardDetails == null)
            {
                return NotFound();
            }

            __context.CardDetails.Remove(cardDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardDetailsExists(int id)
        {
            return __context.CardDetails.Any(e => e.id == id);
        }
    }
}
