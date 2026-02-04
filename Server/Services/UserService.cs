using Microsoft.EntityFrameworkCore;
using MovieManager.DTOs;
using MovieManager.Models;
using MovieManager.Utils;

namespace MovieManager.Services;

public class UserService : IUserService
{
    private readonly MovieAppDbContext _context;
    
    public UserService(MovieAppDbContext context)
    {
        _context = context;
    }
    
    public async Task<User> CreateUserAsync(RegisterUserDto userDto, Guid? roleId = null)
    {
        // Get role
        Guid finalRoleId;
        
        if (roleId.HasValue)
        {
            finalRoleId = roleId.Value;
        }
        else
        {
            var defaultRole = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleValue == RoleEnum.User);
            finalRoleId = defaultRole?.Id ?? throw new Exception("Default role not found");
        }
        
        // Create password hash
        PasswordHasher.CreatePasswordHash(userDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
        
        // Create user
        var user = new User
        {
            Email = userDto.Email,
            FullName = userDto.FullName,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            RoleId = finalRoleId
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        return user;
    }
}