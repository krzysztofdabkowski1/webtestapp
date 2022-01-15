﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TestWebAPI.Model;

namespace TestWebAPI.Migrations
{
    [DbContext(typeof(CardDetailsContext))]
    [Migration("20211215181951_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TestWebAPI.Model.CardDeatils", b =>
                {
                    b.Property<int>("CardDetailsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ForeignExpression")
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("ForeignLangID")
                        .HasColumnType("int");

                    b.Property<string>("NativeExpression")
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("NativeLangID")
                        .HasColumnType("int");

                    b.HasKey("CardDetailsID");

                    b.ToTable("CardDetails");
                });
#pragma warning restore 612, 618
        }
    }
}