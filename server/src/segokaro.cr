require "./launcher/launcher"

# TODO: Write documentation for `Segokaro`
module Segokaro
  VERSION = "0.1.0"

  class App
    def initialize(argv)
      Segokaro::Launcher.new
    end
  end
end
