using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServerApp.Migrations
{
    public partial class xckxc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts");

            migrationBuilder.AlterColumn<int>(
                name: "LikedPostId",
                table: "LikedPosts",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "LikedPosts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "LikedPosts");

            migrationBuilder.AlterColumn<int>(
                name: "LikedPostId",
                table: "LikedPosts",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts",
                column: "LikedPostId");
        }
    }
}
