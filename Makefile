GIT_REF := $(shell git rev-parse --short=7 HEAD)
SERVICE_NAME := $(shell grep "^module" go.mod | rev | cut -d "/" -f1 | rev)
VERSION ?= $(GIT_REF)
VERSION_ADMIN ?= $(GIT_REF)
SERVICE_NAME_ADMIN := $(SERVICE_NAME)_admin
DOCKER_FILE_ADMIN := "docker/admin/Dockerfile"
ADMIN_REGISTRY := 083947760274.dkr.ecr.ap-south-1.amazonaws.com/density-admin
ADMIN_IMAGE := $(ADMIN_REGISTRY):$(VERSION)

.PHONY: admin-container
admin-container:
    @docker build --platform=linux/amd64 -t $(ADMIN_IMAGE) \
           --build-arg VERSION=$(VERSION_ADMIN) \
           --build-arg SERVICE_NAME=$(SERVICE_NAME_ADMIN) \
           -f $(DOCKER_FILE_ADMIN) \
           .