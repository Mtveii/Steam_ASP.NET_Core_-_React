using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactAspNetCoreStudent.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixedInitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Screenshots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screenshots", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    GPA = table.Column<double>(type: "float", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ScreenshotId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Screenshots_ScreenshotId",
                        column: x => x.ScreenshotId,
                        principalTable: "Screenshots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Age", "GPA", "Name", "Photo", "Surname" },
                values: new object[,]
                {
                    { 1, 52, 10.5, "Elden Ring", "eldenring.png", "FromSoftware" },
                    { 2, 70, 9.8000000000000007, "Cyberpunk 2077", "cyberpunk2077.png", "CD Projekt" },
                    { 3, 15, 9.5, "Dota 2", "dota2.png", "Valve" },
                    { 4, 20, 9.6999999999999993, "Counter-Strike: Global Offensive", "csgo.png", "Valve" },
                    { 5, 50, 9.9000000000000004, "The Witcher 3: Wild Hunt", "witcher3.png", "CD Projekt" },
                    { 6, 15, 9.5999999999999996, "Hades", "hades.png", "Supergiant Games" },
                    { 7, 1, 9.4000000000000004, "Stardew Valley", "stardew.png", "ConcernedApe" },
                    { 8, 0, 9.3000000000000007, "Terraria", "terraria.png", "Re-Logic" },
                    { 9, 95, 10.300000000000001, "Red Dead Redemption 2", "rdr2.png", "Rockstar Games" },
                    { 10, 99, 10.4, "The Legend of Zelda: BoTW", "zelda_botw.png", "Nintendo" },
                    { 11, 93, 9.1999999999999993, "Grand Theft Auto V", "gtav.png", "Rockstar Games" },
                    { 12, 100, 9.0, "Minecraft", "minecraft.png", "Mojang" },
                    { 13, 94, 10.0, "Half-Life 2", "half_life2.png", "Valve" },
                    { 14, 90, 9.8000000000000007, "Portal 2", "portal2.png", "Valve" },
                    { 15, 96, 9.5999999999999996, "The Elder Scrolls V: Skyrim", "skyrim.png", "Bethesda Game Studios" },
                    { 16, 88, 9.9000000000000004, "Mass Effect 2", "masseffect2.png", "BioWare" },
                    { 17, 82, 9.4000000000000004, "Diablo II", "diablo2.png", "Blizzard Entertainment" },
                    { 18, 85, 9.0999999999999996, "Doom (1993)", "doom93.png", "id Software" },
                    { 19, 87, 9.6999999999999993, "Resident Evil 4", "re4.png", "Capcom" },
                    { 20, 97, 10.1, "Super Mario World", "smw.png", "Nintendo EAD" },
                    { 21, 100, 8.9000000000000004, "Tetris", "tetris.png", "Alexey Pajitnov" },
                    { 22, 95, 9.5, "Final Fantasy VII", "ff7.png", "Square" },
                    { 23, 89, 9.6999999999999993, "Metal Gear Solid", "mgs.png", "Konami" },
                    { 24, 94, 9.3000000000000007, "World of Warcraft", "wow.png", "Blizzard Entertainment" },
                    { 25, 86, 9.5999999999999996, "BioShock", "bioshock.png", "Irrational Games" },
                    { 26, 81, 9.0, "StarCraft", "starcraft.png", "Blizzard Entertainment" },
                    { 27, 78, 8.8000000000000007, "SimCity 2000", "simcity2000.png", "Maxis" },
                    { 28, 97, 10.4, "Baldur's Gate 3", "bg3.png", "Larian Studios" },
                    { 29, 84, 9.5, "Hollow Knight", "hollow_knight.png", "Team Cherry" },
                    { 30, 88, 9.6999999999999993, "Shadow of the Colossus", "sotc.png", "Team Ico" },
                    { 31, 91, 9.0999999999999996, "Pokemon Red/Blue", "pokemon_rb.png", "Game Freak" },
                    { 32, 93, 10.0, "Super Metroid", "super_metroid.png", "Nintendo R&D1" },
                    { 33, 95, 9.9000000000000004, "The Last of Us", "tlou.png", "Naughty Dog" },
                    { 34, 87, 9.5, "Castlevania: SotN", "sotn.png", "Konami" },
                    { 35, 80, 9.3000000000000007, "Monkey Island 2", "mi2.png", "LucasArts" },
                    { 36, 86, 9.5999999999999996, "Uncharted 2: Among Thieves", "uncharted2.png", "Naughty Dog" },
                    { 37, 79, 9.4000000000000004, "Dishonored", "dishonored.png", "Arkane Studios" },
                    { 38, 91, 10.1, "Disco Elysium", "disco_elysium.png", "ZA/UM" },
                    { 39, 83, 9.1999999999999993, "Fallout: New Vegas", "new_vegas.png", "Obsidian Entertainment" },
                    { 40, 85, 9.5, "Deus Ex", "deus_ex.png", "Ion Storm" },
                    { 41, 70, 9.0, "Civilization VI", "civ6.png", "Firaxis Games" },
                    { 42, 68, 8.9000000000000004, "Rocket League", "rocket_league.png", "Psyonix" },
                    { 43, 75, 9.3000000000000007, "Inside", "inside.png", "Playdead" },
                    { 44, 90, 9.5999999999999996, "Street Fighter II", "sf2.png", "Capcom" },
                    { 45, 72, 8.6999999999999993, "The Sims", "the_sims.png", "Maxis" },
                    { 46, 78, 9.8000000000000007, "Doom Eternal", "doom_eternal.png", "id Software" },
                    { 47, 76, 9.4000000000000004, "Journey", "journey.png", "Thatgamecompany" },
                    { 48, 89, 9.9000000000000004, "Outer Wilds", "outer_wilds.png", "Mobius Digital" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ScreenshotId",
                table: "Comments",
                column: "ScreenshotId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Screenshots");
        }
    }
}
