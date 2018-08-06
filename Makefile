.PHONY: help
help:
	@awk -F':.*##' '/^[-_a-zA-Z0-9]+:.*##/{printf"%-12s\t%s\n",$$1,$$2}' $(MAKEFILE_LIST) | sort

CSS_SRC=$(shell find src -name '*.css' -not -name '_*')
CSS_LIB=$(CSS_SRC:src/%.css=lib/%.css)
JS_SRC=$(filter-out %.test.js,$(shell find src -name '*.js'))
JS_LIB=$(JS_SRC:src/%.js=lib/%.js)

.PHONY: build
build: lib ## Build for prod.
	node_modules/.bin/electron-builder

.PHONY: build-dev
build-dev: lib ## Build for dev.

.PHONY: clean
clean: ## Clean built files.
	rm -f $(CSS_LIB) $(JS_LIB)

.PHONY: fmt
fmt: ## Format codes.
	prettier --write ./*.js ./*.json .babelrc
	find src \( -name '*.css' -or -name '*.js' \) -exec prettier --write {} +

lib: $(CSS_LIB) $(JS_LIB)
lib/%.css: src/%.css postcss.config.js
	mkdir -p $(@D)
	node_modules/.bin/postcss $< -o $@
lib/%.js: src/%.js .babelrc
	mkdir -p $(@D)
	node_modules/.bin/babel $< -o $@

.PHONY: srart
start: build-dev ## Start app.
	node_modules/.bin/electron .
	# open dist/mac/segokaro.app

.PHONY: test
test: ## Test.
	node_modules/.bin/flow || true
	node_modules/.bin/jest || true

.PHONY: watch
watch: ## Watch file changes & do tasks.
	node_modules/.bin/babel-node watch
