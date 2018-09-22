require "../font"
require "kemal"

module Segokaro
  class WebServer
    def self.get_instance
      @@instance ||= new
    end

    def initialize
      @is_launched = false
      @sockets = [] of HTTP::WebSocket
      get("/") { |env| send_file env, "public/index.html" }
      get("/ops/heartbeat") { "heartbeat:ok" }
      get "/api/fonts" do
        {"fonts": Font.installed}.to_json
      end
      post "/api/fonts" do |env|
        path = env.params.json[:path].as(String)
        p path
        {"fontFamily": "dummy", "url": "/api/fonts/dummy.otf"}.to_json
      end
      get "/api/fonts/:font_family" do |env|
        font_family = env.params.url["font_family"].sub(/\..+$/, "")
        p font_family
      end
      ws "/" do |socket|
        @sockets << socket
        socket.on_ping { socket.pong }
        socket.on_close { @sockets.delete socket }
      end
    end

    def launched?
      @is_launched
    end

    def launch(port : Int32)
      @is_launched = true
      spawn do
        begin
          Kemal.run port
        rescue ex : Exception
          p ex
          shutdown
        end
      end
    end

    def shutdown
      Kemal.stop
      @is_launched = false
    end

    def publish(message : String)
      @sockets.each &.send(message)
    end
  end
end
