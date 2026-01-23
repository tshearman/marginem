{
  description = "Blogupdate Astro dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    nixpkgs-unstable,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
        };
        pkgsUnstable = import nixpkgs-unstable { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          name = "blogupdate";
          packages = with pkgs; [
            nodejs_22
            corepack
            git
            watchman
            nil
            alejandra
            python312
            pkgsUnstable.uv
            ghc
            sbcl
            ormolu
            biome
            hlint
            ruff
            gitleaks
          ];
          shellHook = ''
            export NODE_OPTIONS="--enable-source-maps --trace-warnings"
            export PATH="$PWD/node_modules/.bin:$PATH"

            if [ -f .dev.vars ]; then
              set -a
              . ./.dev.vars
              set +a
            fi

            if [ -f package-lock.json ]; then
              if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
                echo "Installing npm dependencies..." >&2
                npm install || echo "npm install failed; rerun manually to inspect the error." >&2
              fi
            fi

            PYTHON_PROJECT_DIR="$PWD/tools/python"
            if command -v uv >/dev/null 2>&1 && [ -f "$PYTHON_PROJECT_DIR/pyproject.toml" ]; then
              export UV_CACHE_DIR="''${UV_CACHE_DIR:-$PWD/.uv-cache}"
              mkdir -p "$UV_CACHE_DIR"

              if [ ! -f "$PYTHON_PROJECT_DIR/uv.lock" ]; then
                echo "uv.lock missing; generating with 'uv lock'..." >&2
                (cd "$PYTHON_PROJECT_DIR" && uv lock) || echo "uv lock failed; rerun manually to inspect the error." >&2
              fi

              if [ ! -d "$PYTHON_PROJECT_DIR/.venv" ] || [ "$PYTHON_PROJECT_DIR/uv.lock" -nt "$PYTHON_PROJECT_DIR/.venv" ]; then
                echo "Syncing Python environment via uv..." >&2
                if [ -f "$PYTHON_PROJECT_DIR/uv.lock" ]; then
                  (cd "$PYTHON_PROJECT_DIR" && uv sync) || echo "uv sync failed; rerun manually to inspect the error." >&2
                fi
              fi

              if [ -d "$PYTHON_PROJECT_DIR/.venv" ]; then
                export PATH="$PYTHON_PROJECT_DIR/.venv/bin:$PATH"
                if [ -z "$REMARK_RUN_CODE_PYTHON" ]; then
                  export REMARK_RUN_CODE_PYTHON="$PYTHON_PROJECT_DIR/.venv/bin/python"
                fi
              fi
            fi

            echo "blogupdate dev shell ready (Node $(node -v), npm $(npm -v))"
          '';
        };

        formatter = pkgs.alejandra;
      }
    );
}
