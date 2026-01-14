{
  description = "Blogupdate Astro dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
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
            uv
            ghc
            sbcl
            ormolu
            biome
            hlint
            ruff
          ];
          shellHook = ''
            export NODE_OPTIONS="--enable-source-maps --trace-warnings"
            export PATH="$PWD/node_modules/.bin:$PATH"

            if command -v uv >/dev/null 2>&1 && [ -f pyproject.toml ]; then
              export UV_CACHE_DIR="''${UV_CACHE_DIR:-$PWD/.uv-cache}"
              mkdir -p "$UV_CACHE_DIR"

              if [ ! -f uv.lock ]; then
                echo "uv.lock missing; generating with 'uv lock'..." >&2
                uv lock || echo "uv lock failed; rerun manually to inspect the error." >&2
              fi

              if [ ! -d .venv ] || [ uv.lock -nt .venv ]; then
                echo "Syncing Python environment via uv..." >&2
                if [ -f uv.lock ]; then
                  uv sync || echo "uv sync failed; rerun manually to inspect the error." >&2
                fi
              fi

              if [ -d .venv ]; then
                export PATH="$PWD/.venv/bin:$PATH"
                if [ -z "$REMARK_RUN_CODE_PYTHON" ]; then
                  export REMARK_RUN_CODE_PYTHON="$PWD/.venv/bin/python"
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
