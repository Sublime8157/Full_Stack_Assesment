using Microsoft.EntityFrameworkCore;
using TaskManager.Data;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);
var host = Environment.GetEnvironmentVariable("DB_HOST");
var database = Environment.GetEnvironmentVariable("DB_NAME");
var username = Environment.GetEnvironmentVariable("DB_USER");
var password = Environment.GetEnvironmentVariable("DB_PASS");

if (string.IsNullOrEmpty(host) ||
    string.IsNullOrEmpty(username) ||
    string.IsNullOrEmpty(password) ||
    string.IsNullOrEmpty(database))
{
    throw new Exception("Some database environments are empty.");
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = $"Host={host};Database={database};Username={username};Password={password};";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();

