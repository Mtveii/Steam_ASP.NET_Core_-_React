// Data/AppDbContext.cs
using AspNetCore.WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using ReactAspNetCoreStudent.Server.Models;

namespace AspNetCore.WebAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Screenshot> Screenshots { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data for Students
            modelBuilder.Entity<Student>().HasData(
                new Student { Id = 1, Name = "Elden Ring", Surname = "FromSoftware", Age = 52, GPA = 10.5, Photo = "eldenring.png" },
                new Student { Id = 2, Name = "Cyberpunk 2077", Surname = "CD Projekt", Age = 70, GPA = 9.8, Photo = "cyberpunk2077.png" },
                new Student { Id = 3, Name = "Dota 2", Surname = "Valve", Age = 15, GPA = 9.5, Photo = "dota2.png" },
                new Student { Id = 4, Name = "Counter-Strike: Global Offensive", Surname = "Valve", Age = 20, GPA = 9.7, Photo = "csgo.png" },
                new Student { Id = 5, Name = "The Witcher 3: Wild Hunt", Surname = "CD Projekt", Age = 50, GPA = 9.9, Photo = "witcher3.png" },
                new Student { Id = 6, Name = "Hades", Surname = "Supergiant Games", Age = 15, GPA = 9.6, Photo = "hades.png" },
                new Student { Id = 7, Name = "Stardew Valley", Surname = "ConcernedApe", Age = 1, GPA = 9.4, Photo = "stardew.png" },
                new Student { Id = 8, Name = "Terraria", Surname = "Re-Logic", Age = 0, GPA = 9.3, Photo = "terraria.png" },
                new Student { Id = 9, Name = "Red Dead Redemption 2", Surname = "Rockstar Games", Age = 95, GPA = 10.3, Photo = "rdr2.png" },
                new Student { Id = 10, Name = "The Legend of Zelda: BoTW", Surname = "Nintendo", Age = 99, GPA = 10.4, Photo = "zelda_botw.png" },
                new Student { Id = 11, Name = "Grand Theft Auto V", Surname = "Rockstar Games", Age = 93, GPA = 9.2, Photo = "gtav.png" },
                new Student { Id = 12, Name = "Minecraft", Surname = "Mojang", Age = 100, GPA = 9.0, Photo = "minecraft.png" },
                new Student { Id = 13, Name = "Half-Life 2", Surname = "Valve", Age = 94, GPA = 10.0, Photo = "half_life2.png" },
                new Student { Id = 14, Name = "Portal 2", Surname = "Valve", Age = 90, GPA = 9.8, Photo = "portal2.png" },
                new Student { Id = 15, Name = "The Elder Scrolls V: Skyrim", Surname = "Bethesda Game Studios", Age = 96, GPA = 9.6, Photo = "skyrim.png" },
                new Student { Id = 16, Name = "Mass Effect 2", Surname = "BioWare", Age = 88, GPA = 9.9, Photo = "masseffect2.png" },
                new Student { Id = 17, Name = "Diablo II", Surname = "Blizzard Entertainment", Age = 82, GPA = 9.4, Photo = "diablo2.png" },
                new Student { Id = 18, Name = "Doom (1993)", Surname = "id Software", Age = 85, GPA = 9.1, Photo = "doom93.png" },
                new Student { Id = 19, Name = "Resident Evil 4", Surname = "Capcom", Age = 87, GPA = 9.7, Photo = "re4.png" },
                new Student { Id = 20, Name = "Super Mario World", Surname = "Nintendo EAD", Age = 97, GPA = 10.1, Photo = "smw.png" },
                new Student { Id = 21, Name = "Tetris", Surname = "Alexey Pajitnov", Age = 100, GPA = 8.9, Photo = "tetris.png" },
                new Student { Id = 22, Name = "Final Fantasy VII", Surname = "Square", Age = 95, GPA = 9.5, Photo = "ff7.png" },
                new Student { Id = 23, Name = "Metal Gear Solid", Surname = "Konami", Age = 89, GPA = 9.7, Photo = "mgs.png" },
                new Student { Id = 24, Name = "World of Warcraft", Surname = "Blizzard Entertainment", Age = 94, GPA = 9.3, Photo = "wow.png" },
                new Student { Id = 25, Name = "BioShock", Surname = "Irrational Games", Age = 86, GPA = 9.6, Photo = "bioshock.png" },
                new Student { Id = 26, Name = "StarCraft", Surname = "Blizzard Entertainment", Age = 81, GPA = 9.0, Photo = "starcraft.png" },
                new Student { Id = 27, Name = "SimCity 2000", Surname = "Maxis", Age = 78, GPA = 8.8, Photo = "simcity2000.png" },
                new Student { Id = 28, Name = "Baldur's Gate 3", Surname = "Larian Studios", Age = 97, GPA = 10.4, Photo = "bg3.png" },
                new Student { Id = 29, Name = "Hollow Knight", Surname = "Team Cherry", Age = 84, GPA = 9.5, Photo = "hollow_knight.png" },
                new Student { Id = 30, Name = "Shadow of the Colossus", Surname = "Team Ico", Age = 88, GPA = 9.7, Photo = "sotc.png" },
                new Student { Id = 31, Name = "Pokemon Red/Blue", Surname = "Game Freak", Age = 91, GPA = 9.1, Photo = "pokemon_rb.png" },
                new Student { Id = 32, Name = "Super Metroid", Surname = "Nintendo R&D1", Age = 93, GPA = 10.0, Photo = "super_metroid.png" },
                new Student { Id = 33, Name = "The Last of Us", Surname = "Naughty Dog", Age = 95, GPA = 9.9, Photo = "tlou.png" },
                new Student { Id = 34, Name = "Castlevania: SotN", Surname = "Konami", Age = 87, GPA = 9.5, Photo = "sotn.png" },
                new Student { Id = 35, Name = "Monkey Island 2", Surname = "LucasArts", Age = 80, GPA = 9.3, Photo = "mi2.png" },
                new Student { Id = 36, Name = "Uncharted 2: Among Thieves", Surname = "Naughty Dog", Age = 86, GPA = 9.6, Photo = "uncharted2.png" },
                new Student { Id = 37, Name = "Dishonored", Surname = "Arkane Studios", Age = 79, GPA = 9.4, Photo = "dishonored.png" },
                new Student { Id = 38, Name = "Disco Elysium", Surname = "ZA/UM", Age = 91, GPA = 10.1, Photo = "disco_elysium.png" },
                new Student { Id = 39, Name = "Fallout: New Vegas", Surname = "Obsidian Entertainment", Age = 83, GPA = 9.2, Photo = "new_vegas.png" },
                new Student { Id = 40, Name = "Deus Ex", Surname = "Ion Storm", Age = 85, GPA = 9.5, Photo = "deus_ex.png" },
                new Student { Id = 41, Name = "Civilization VI", Surname = "Firaxis Games", Age = 70, GPA = 9.0, Photo = "civ6.png" },
                new Student { Id = 42, Name = "Rocket League", Surname = "Psyonix", Age = 68, GPA = 8.9, Photo = "rocket_league.png" },
                new Student { Id = 43, Name = "Inside", Surname = "Playdead", Age = 75, GPA = 9.3, Photo = "inside.png" },
                new Student { Id = 44, Name = "Street Fighter II", Surname = "Capcom", Age = 90, GPA = 9.6, Photo = "sf2.png" },
                new Student { Id = 45, Name = "The Sims", Surname = "Maxis", Age = 72, GPA = 8.7, Photo = "the_sims.png" },
                new Student { Id = 46, Name = "Doom Eternal", Surname = "id Software", Age = 78, GPA = 9.8, Photo = "doom_eternal.png" },
                new Student { Id = 47, Name = "Journey", Surname = "Thatgamecompany", Age = 76, GPA = 9.4, Photo = "journey.png" },
                new Student { Id = 48, Name = "Outer Wilds", Surname = "Mobius Digital", Age = 89, GPA = 9.9, Photo = "outer_wilds.png" }
            );
        }
    }
}