{
  description = "A simply python flake";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };
  outputs = inputs @ {
    self,
    nixpkgs,
    flake-parts,
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux"];
      perSystem = {
        pkgs,
        self',
        ...
      }: let
        cyberfood = pkgs.python3Packages.buildPythonPackage {
          name = "cyberfood";
          version = "0.1.0";
          pyproject = true;
          src = ./backend;

          dependencies = with pkgs.python3Packages; [
            flask
            openai
            flit
          ];

          nativeCheckInputs = with pkgs.python3Packages; [
            pytest
          ];
        };
      in {
        # Usually these are not needed for my most basic projects
        # packages.default = pkgs.hello;
        # apps.default = {
        #   type = "app";
        #   program = "${self'.packages.default}/bin/hello";
        # };
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            pyright # language server
            (python3.withPackages (ps:
              with ps; [
                isort # sort imports
                flake8 # formatting
                black # formatting
                # Dev Packages
                pytest
                flask
                requests
                openai
              ]))
          ];
          shellHook = ''
            set -a
            source .env
            set +a
          '';
        };
      };
    };
}
