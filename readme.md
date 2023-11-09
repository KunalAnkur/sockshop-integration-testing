# Sock Shop Integration Test

This is integration testing for sock shop application with using docker and docker-compose


## Documentation

Explore the documentation to understand methodology and challenges which I faced during the delopement. [click here](https://docs.google.com/document/d/1hhrsXitaizi6HHXqlF4GIUsdeEEGGuQQl3QqnAj46Ok/edit?usp=sharing).


## Pre-requisite

- **Docker**: Docker should be installed on local machine.
- **NodeJS**: Node JS should be installed for running test locally (Not neccessary for running test/deploy in docker container).

## Local Setup

Follow these steps to run the server locally:

1. **Clone the Repository**: 
```
git clone https://github.com/KunalAnkur/sockshop-integration-testing.git
```
```
cd sockshop-integration-testing
```
2. **Change Owner**: 

```
chmod +x test.sh && chmod +x deploy.sh
```
2. **Running Test**: 

```
./test.sh
```


3. **Deploy the sock shop**:

```
./deploy.sh
```
