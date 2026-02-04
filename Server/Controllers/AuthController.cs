using Microsoft.AspNetCore.Mvc;
using MovieManager.Models;
using MovieManager.DTOs;
using Microsoft.EntityFrameworkCore;
using MovieManager.Utils;
using MovieManager.Services;

namespace MovieManager.Controllers;

[ApiController]
[Route("/api/auth/")]
public class AuthController : ControllerBase
{
    private readonly MovieAppDbContext _context;
    private readonly IUserService _userService;

    public AuthController(MovieAppDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    [HttpPost("sign-up")]
    public async Task<IActionResult> SignUp([FromBody] RegisterUserDto userDetails)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Email == userDetails.Email);
        if (userExists) return BadRequest("Email is already in use.");
        
        try
        {
            var user = await _userService.CreateUserAsync(userDetails);
            
            // TODO: Generate token that is to be sent
            return Ok(new { 
                Message = "User registered successfully.",
                // Token = token,
                UserId = user.Id
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto userDetails)
    {
        // Retrieve the user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDetails.Email);
        if (user == null) return Unauthorized("Invalid email or password.");

        // Verify the password
        if (!PasswordHasher.VerifyPasswordHash(userDetails.Password, user.PasswordHash, user.PasswordSalt))
            return Unauthorized("Invalid email or password.");
       
        // TODO: Generate JWT or other token as needed
        return Ok(new { Message = "User logged in successfully." });
    }
}