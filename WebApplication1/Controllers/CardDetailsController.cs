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
    public class CardDetailsController : ControllerBase
    {
        private readonly CardDetailsContext _context;

        public CardDetailsController(CardDetailsContext context)
        {
            _context = context;
        }

        // GET: api/CardDeatils
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardDetails>>> GetCardDetails()
        {
            return await _context.CardDetails.ToListAsync();
        }

        // GET: api/CardDeatils/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardDetails>> GetCardDetails(int id)
        {
            var cardDetails = await _context.CardDetails.FindAsync(id);

            if (cardDetails == null)
            {
                return NotFound();
            }

            return cardDetails;
        }

        // PUT: api/CardDeatils/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCardDetails(int id, CardDetails cardDetails)
        {
            if (id != cardDetails.CardDetailsID)
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
            _context.CardDetails.Add(cardDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCardDeatils", new { id = cardDetails.CardDetailsID }, cardDetails);
        }

        // DELETE: api/CardDeatils/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCardDetails(int id)
        {
            var cardDetails = await _context.CardDetails.FindAsync(id);
            if (cardDetails == null)
            {
                return NotFound();
            }

            _context.CardDetails.Remove(cardDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardDetailsExists(int id)
        {
            return _context.CardDetails.Any(e => e.CardDetailsID == id);
        }
    }
}
