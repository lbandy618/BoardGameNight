using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BoardGameNight.Migrations
{
    public partial class boardGame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LoginID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Summary = table.Column<string>(type: "varchar(1000)", unicode: false, maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "OwnedGame",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    APIGameID = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnedGame", x => x.ID);
                    table.ForeignKey(
                        name: "FK__OwnedGame__UserI__6754599E",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "UserStats",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Wins = table.Column<int>(type: "int", nullable: true),
                    TimesGamePlayed = table.Column<int>(type: "int", nullable: true),
                    TotalTimePlayed = table.Column<double>(type: "float", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStats", x => x.ID);
                    table.ForeignKey(
                        name: "FK__UserStats__UserI__6477ECF3",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Preferences",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Categories = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Mechanics = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MaxTime = table.Column<double>(type: "float", nullable: true),
                    Publisher = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: true),
                    YearPublished = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    OwnedID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferences", x => x.ID);
                    table.ForeignKey(
                        name: "FK__Preferenc__Owned__6B24EA82",
                        column: x => x.OwnedID,
                        principalTable: "OwnedGame",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK__Preferenc__UserI__6A30C649",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Session",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimePlayed = table.Column<double>(type: "float", nullable: true),
                    Winner = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Enjoyment = table.Column<int>(type: "int", nullable: true),
                    OwnedID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Session", x => x.ID);
                    table.ForeignKey(
                        name: "FK__Session__OwnedID__6E01572D",
                        column: x => x.OwnedID,
                        principalTable: "OwnedGame",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "date", nullable: true),
                    SessionID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Event", x => x.ID);
                    table.ForeignKey(
                        name: "FK__Event__SessionID__74AE54BC",
                        column: x => x.SessionID,
                        principalTable: "Session",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "SessionAttendee",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SessionID = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionAttendee", x => x.ID);
                    table.ForeignKey(
                        name: "FK__SessionAt__Sessi__70DDC3D8",
                        column: x => x.SessionID,
                        principalTable: "Session",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK__SessionAt__UserI__71D1E811",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Event_SessionID",
                table: "Event",
                column: "SessionID");

            migrationBuilder.CreateIndex(
                name: "IX_OwnedGame_UserID",
                table: "OwnedGame",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Preferences_OwnedID",
                table: "Preferences",
                column: "OwnedID");

            migrationBuilder.CreateIndex(
                name: "IX_Preferences_UserId",
                table: "Preferences",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Session_OwnedID",
                table: "Session",
                column: "OwnedID");

            migrationBuilder.CreateIndex(
                name: "IX_SessionAttendee_SessionID",
                table: "SessionAttendee",
                column: "SessionID");

            migrationBuilder.CreateIndex(
                name: "IX_SessionAttendee_UserID",
                table: "SessionAttendee",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserStats_UserID",
                table: "UserStats",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "Preferences");

            migrationBuilder.DropTable(
                name: "SessionAttendee");

            migrationBuilder.DropTable(
                name: "UserStats");

            migrationBuilder.DropTable(
                name: "Session");

            migrationBuilder.DropTable(
                name: "OwnedGame");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
