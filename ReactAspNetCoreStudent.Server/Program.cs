using Microsoft.EntityFrameworkCore;
using AspNetCore.WebAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        // In development explicitly allow the frontend dev origins and allow credentials
        if (builder.Environment.IsDevelopment())
        {
            var devOrigins = new[]
            {
                "https://localhost:5000",
                "http://localhost:5000",
                "https://localhost:5001",
                "http://localhost:5001"
            };

            policy.WithOrigins(devOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
        else
        {
            // In production restrict origins as needed
            policy.WithOrigins("https://localhost:5000", "http://localhost:5000", "https://localhost:8000")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
    });
});

// Sessions removed: authentication and user state persisted in the database

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseCors("AllowReactApp");
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

// Ensure database is created and migrated
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Проверяем есть ли pending миграции
        var pendingMigrations = db.Database.GetPendingMigrations();
        if (pendingMigrations.Any())
        {
            Console.WriteLine($"Applying {pendingMigrations.Count()} pending migrations...");
            db.Database.Migrate();
            Console.WriteLine("Migrations applied successfully");
        }
        else
        {
            Console.WriteLine("No pending migrations");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during migration: {ex.Message}");
        // В development можно использовать EnsureCreated как fallback
        if (app.Environment.IsDevelopment())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();
        }
    }
}

app.Run();
//