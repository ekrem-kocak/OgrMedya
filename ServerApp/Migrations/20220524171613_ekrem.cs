using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServerApp.Migrations
{
    public partial class ekrem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosts_AspNetUsers_LikedPostId",
                table: "LikedPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosts_Posts_PostId",
                table: "LikedPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts");

            migrationBuilder.DropIndex(
                name: "IX_LikedPosts_LikedPostId",
                table: "LikedPosts");

            migrationBuilder.DropIndex(
                name: "IX_LikedPosts_PostId",
                table: "LikedPosts");

            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "LikedPosts",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "LikedPosts",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "LikedPosts",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_LikedPosts_UserId",
                table: "LikedPosts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosts_AspNetUsers_UserId",
                table: "LikedPosts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosts_AspNetUsers_UserId",
                table: "LikedPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts");

            migrationBuilder.DropIndex(
                name: "IX_LikedPosts_UserId",
                table: "LikedPosts");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "LikedPosts",
                newName: "PostId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "LikedPosts",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "LikedPosts",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LikedPosts_LikedPostId",
                table: "LikedPosts",
                column: "LikedPostId");

            migrationBuilder.CreateIndex(
                name: "IX_LikedPosts_PostId",
                table: "LikedPosts",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosts_AspNetUsers_LikedPostId",
                table: "LikedPosts",
                column: "LikedPostId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosts_Posts_PostId",
                table: "LikedPosts",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
