#!/usr/bin/env bash

RFROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

konsole --separate -p tabtitle="Rostify Frontend" -e bash -c "
    cd "$RFROOT/frontend"
    bun run dev -l info --clearScreen false
    exec bash
" &

konsole --separate -p tabtitle="Rostify Backend" -e bash -c "
    cd "$RFROOT"
    cargo run --manifest-path backend/Cargo.toml --verbose
    exec bash
" &

wait