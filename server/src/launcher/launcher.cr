# coding: utf-8
require "libui/libui"
require "libui/cui"
require "../web_server/web_server"

module Segokaro
  class Launcher
    def initialize
      o = UI::InitOptions.new
      err = UI.init pointerof(o)
      unless ui_nil? err
        puts "Error initializing ui: #{err}"
        exit 1
      end
      CUI::Menu.new("Help").tap do |menu|
        menu.append "Help"
        menu.append "About", nil, nil, CUI::MenuDesc::About.value
      end
      mainwin = UI.new_window("segokáro", 320, 120, 1).tap do |mainwin|
        UI.window_set_margined mainwin, 1
        UI.window_on_closing mainwin, ->(w : UI::Window*, data : Void*) {
          UI.control_destroy ui_control CUI.get_mainwindow!
          UI.quit
          0
        }, nil
        UI.new_vertical_box.tap do |vbox|
          UI.box_set_padded vbox, 1
          UI.window_set_child mainwin, ui_control(vbox)
          entry = UI.new_entry.tap { |entry| UI.box_append vbox, ui_control(entry), 0 }
          UI.new_button("Launch").tap do |button|
            UI.box_append vbox, ui_control(button), 0
            UI.button_on_clicked button, ->(b, data) {
              data_ = Box({launcher: Segokaro::Launcher, entry: UI::Entry*}).unbox data
              data_[:launcher].on_click_button data_[:entry]
            }, Box.box({launcher: self, entry: entry})
          end
        end
      end
      CUI.attach_main_window mainwin
      UI.control_show ui_control mainwin
      at_exit { before_quit }
      ch = Channel(Int32).new
      spawn do
        UI.timer 1, ->(_data) { sleep Time::Span.new(nanoseconds: 1000) }, nil
        UI.main_steps
        while UI.main_step(1) != 0
          sleep Time::Span.new(nanoseconds: 1000)
        end
        # UI.main
        UI.uninit
        ch.send 0
      end
      ch.receive
      before_quit
    end

    def on_click_button(entry : UI::Entry*)
      port = String.new(UI.entry_text entry).to_i
      web_server = Segokaro::WebServer.get_instance
      web_server.shutdown if web_server.launched?
      web_server.launch port
      system "open http://localhost:#{port}/"
    rescue ex : ArgumentError
      p ex
    end

    def before_quit
      web_server = Segokaro::WebServer.get_instance
      web_server.shutdown if web_server.launched?
    end
  end
end
