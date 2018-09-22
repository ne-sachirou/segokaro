.PHONY: help
help:
	@awk -F':.*##' '/^[-_a-zA-Z0-9]+:.*##/{printf"%-12s\t%s\n",$$1,$$2}' $(MAKEFILE_LIST) | sort

.PHONY: build
build: ## Build a release binary
	$(MAKE) build_linux
ifeq ($(shell uname -s),Darwin)
	$(MAKE) build_darwin
endif
	crystal eval 'require "ecr/macros";io=IO::Memory.new;ECR.embed "src/README.md.ecr",io;File.open("README.md","w"){|f|f.print io.to_s}'

.PHONY: build_darwin
build_darwin:
	shards install --production
	crystal build.darwin-x86_64.cr
	otool -L bin/segokaro-darwin-x86_64
	sandbox-exec -f test.darwin-x86_64.sb bin/segokaro-darwin-x86_64 --help

.PHONY: build_linux
build_linux:
	docker build -f Dockerfile.build.linux-x86_64 -t segokaro.build.linux-x86_64 .
	docker run --rm -v $(shell pwd):/data segokaro.build.linux-x86_64 make build_linux_app
	docker build -f Dockerfile.test.linux-x86_64 -t segokaro.test.linux-x86_64 .
	docker run --rm segokaro.test.linux-x86_64 segokaro --help

.PHONY: build_linux_app
build_linux_app:
	shards install --production
	crystal build --release -o bin/segokaro-linux-x86_64 --link-flags '-static' bin/segokaro.cr

.PHONY: libui
libui:
	cd lib/libui \
	&& (ls libui || git clone --depth 1 https://github.com/andlabs/libui.git) \
	&& cd libui \
	&& git pull \
	&& mkdir -p build \
	&& cd build \
	&& cmake .. \
	&& make -j \
	&& cp out/*.dylib /usr/local/bin/

.PHONY: clean
clean: ## Clean
	rm -f bin/segokaro-darwin-x86_64.o bin/segokaro-darwin-x86_64 bin/segokaro-linux-x86_64

.PHONY: fix
fix: ## Fix lint automatically
	find bin src spec -type f -name '*.cr' -exec crystal tool format {} \;

.PHONY: install
install: ## cp the binary to PATH
ifeq ($(shell uname -s),Linux)
	cp bin/segokaro-linux-x86_64 /usr/local/bin/segokaro
endif
ifeq ($(shell uname -s),Darwin)
	cp bin/segokaro-darwin-x86_64 /usr/local/bin/segokaro
endif

.PHONY: test
test: ## Test
	find . -name '*.sh' -exec shellcheck -s sh {} \;
	crystal tool format -e lib
	crystal spec

.PHONY: uninstall
uninstall: ## rm the installed binary
	rm -f /usr/local/bin/segokaro
