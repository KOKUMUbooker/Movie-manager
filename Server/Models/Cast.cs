namespace MovieManager.Models;

class Cast : EntityBase {
    public int MovieId {get; private set;}
    public string Name {get; private set;}
    public string ImageUrl{get; private set;}
}