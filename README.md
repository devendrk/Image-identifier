[![React Version](https://img.shields.io/badge/React-16.12.0-61DAFB.svg?style=flat&logo=React)]() <br/>
[![Netlify Status](https://api.netlify.com/api/v1/badges/815e5eee-2e9d-42e5-a1e8-4f429ccb29da/deploy-status)](https://image-content-identifier.netlify.app/)

[Master branch live preview](https://image-content-identifier.netlify.app/) <br/>

## Image-identifier

This app analyzes image and display the contents of the image.

## 🚀 Quick start

1.  **To clone this Repo**

    ```shell
    # clone  with https
    https://github.com/devendrk/Image-identifier.git
     # clone with ssh
    git@github.com:devendrk/Image-identifier.git
    ```

2.  **To install packages**
    Using either yarn/npm install

    ```shell
    cd scoreboard
    yarn
    ```

    or

    ```shell
    npm start
    ```

## Problems I faced duirng this project.

- Got several errors while deploying the function, with reading the error, googling finally able to deploy.
- Used 2 different storage (fire base and Realtime database) for sake of learning, But had to spend a bit of time to read the docs and apply it to fetch the result of analyzed image.

## I would make following imporvement if I would have enough time.

- Would use O-auth and email authentication with proper statemanagement eg. redux or Context ApI.
- Would learn more about best practices of Google cloud functions, database security rules and apply them.
- Would make more nicer ui components and better error handling.
- Would add test
- Would make Native app
