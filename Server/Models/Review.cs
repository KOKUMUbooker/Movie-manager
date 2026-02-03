namespace MovieManager.Models;

class Review : EntityBase {
    public int UserId {get; private set;}
    public int MovieId {get; private set;}
    public string text {get; private set;}
}