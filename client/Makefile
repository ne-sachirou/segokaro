.PHONY: help
help:
	@awk -F':.*##' '/^[-_a-zA-Z0-9]+:.*##/{printf"%-12s\t%s\n",$$1,$$2}' $(MAKEFILE_LIST) | sort

.PHONY: build
build: ## Build for prod.
	rm -rf src/**/**.json dist
	node_modules/.bin/parcel build src/index.html

.PHONY: clean
clean: ## Clean built files.
	rm -rf src/**/**.json .cache dist

.PHONY: fmt
fmt: ## Format codes.
	prettier --write ./*.js ./*.json .babelrc
	find src \( -name '*.css' -or -name '*.js' \) -exec prettier --write {} +

.PHONY: test
test: ## Test.
	node_modules/.bin/flow || true
	node_modules/.bin/jest || true

.PHONY: watch
watch: ## Watch file changes & do tasks.
	node_modules/.bin/babel-node watch
	node_modules/.bin/parcel index.html
