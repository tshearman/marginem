{
  description = "Blogupdate Astro dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
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
          ];
          shellHook = ''
            export NODE_OPTIONS="--enable-source-maps --trace-warnings"
            export PATH="$PWD/node_modules/.bin:$PATH"
            if command -v direnv >/dev/null 2>&1; then
              echo "direnv detected. Run 'direnv allow' to auto-load this shell." >&2
            fi
            echo "blogupdate dev shell ready (Node $(node -v), npm $(npm -v))"
          '';
        };

        formatter = pkgs.alejandra;
      }
    );
}
