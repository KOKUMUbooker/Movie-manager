namespace MovieManager.Models;

class User : EntityBase
{
    public string Email {get; private set;}
    public string Password {get; private set;}
    public string FullName {get; private set;}
    public int RoleId {get; private set;}
}