using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BoardGameNight.Models
{
    public partial class BoardGameNightDBContext : DbContext
    {
        public BoardGameNightDBContext()
        {
        }

        public BoardGameNightDBContext(DbContextOptions<BoardGameNightDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Event> Events { get; set; } = null!;
        public virtual DbSet<GameShelf> GameShelves { get; set; } = null!;
        public virtual DbSet<Preference> Preferences { get; set; } = null!;
        public virtual DbSet<Session> Sessions { get; set; } = null!;
        public virtual DbSet<SessionAttendee> SessionAttendees { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserStat> UserStats { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer($"Data Source=boardgamenight.database.windows.net;Initial Catalog=BoardGameNightDB; user id={Secret.userId}; password={Secret.password};");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("Event");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.SessionId).HasColumnName("SessionID");

                entity.HasOne(d => d.Session)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.SessionId)
                    .HasConstraintName("FK__Event__SessionID__74AE54BC");
            });

            modelBuilder.Entity<GameShelf>(entity =>
            {
                entity.ToTable("GameShelf");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ApigameId)
                    .HasMaxLength(255)
                    .HasColumnName("APIGameID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.GameShelves)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__OwnedGame__UserI__6754599E");
            });

            modelBuilder.Entity<Preference>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Categories).HasMaxLength(255);

                entity.Property(e => e.Mechanics).HasMaxLength(255);

                entity.Property(e => e.OwnedId).HasColumnName("OwnedID");

                entity.Property(e => e.Publisher).HasMaxLength(255);

                entity.HasOne(d => d.Owned)
                    .WithMany(p => p.Preferences)
                    .HasForeignKey(d => d.OwnedId)
                    .HasConstraintName("FK__Preferenc__Owned__6B24EA82");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Preferences)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Preferenc__UserI__6A30C649");
            });

            modelBuilder.Entity<Session>(entity =>
            {
                entity.ToTable("Session");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.EventId).HasColumnName("EventID");

                entity.Property(e => e.OwnedId).HasColumnName("OwnedID");

                entity.Property(e => e.Winner).HasMaxLength(50);

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Sessions)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK__Session__EventID__01142BA1");

                entity.HasOne(d => d.Owned)
                    .WithMany(p => p.Sessions)
                    .HasForeignKey(d => d.OwnedId)
                    .HasConstraintName("FK__Session__OwnedID__6E01572D");
            });

            modelBuilder.Entity<SessionAttendee>(entity =>
            {
                entity.ToTable("SessionAttendee");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.SessionId).HasColumnName("SessionID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Session)
                    .WithMany(p => p.SessionAttendees)
                    .HasForeignKey(d => d.SessionId)
                    .HasConstraintName("FK__SessionAt__Sessi__70DDC3D8");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SessionAttendees)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__SessionAt__UserI__71D1E811");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.LoginId)
                    .HasMaxLength(50)
                    .HasColumnName("LoginID");

                entity.Property(e => e.Summary)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.UserName).HasMaxLength(50);
            });

            modelBuilder.Entity<UserStat>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserStats)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserStats__UserI__6477ECF3");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
