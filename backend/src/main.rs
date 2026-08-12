mod state;
mod models;
mod routes;

use axum::{extract::State, routing::get, Router};
use sqlx::postgres::PgPoolOptions;
use state::AppState;

async fn health(
    State(state): State<AppState>,
) -> &'static str {
    match sqlx::query("SELECT 1")
        .execute(&state.db)
        .await
    {
        Ok(_) => "OK",
        Err(_) => "DATABASE ERROR",
    }
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set");

    let db = PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await
        .expect("Failed to connect to PostgreSQL");

    println!("Connected to PostgreSQL");

    let state = AppState {
        db: db.clone(),
    };

    let app = Router::new()
        .route("/api/health", get(health))
        .route(
            "/api/users",
            get(routes::users::get_users)
                .post(routes::users::create_user),
        )
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000")
        .await
        .unwrap();

    println!("Server running on http://localhost:3000");

    axum::serve(listener, app)
        .await
        .unwrap();
}