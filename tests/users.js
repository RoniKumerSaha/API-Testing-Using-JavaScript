import supertest from "supertest";
import { expect } from "chai";
import * as user_data from "./data/user.json";
import * as comments_data from "./data/comments.json";
import * as post_data from "./data/post.json";

const request = supertest("https://gorest.co.in/public-api/");

// getting api key from system env for https://gorest.co.in/
const API_KEY = process.env.TOKEN;

// Modify json data using faker
var faker = require("faker");
user_data.email = faker.internet.email();
user_data.name = faker.name.findName();
comments_data.name = faker.name.findName();
comments_data.email = faker.internet.email();
post_data.title = faker.name.jobTitle();

// variables to track user and post
let user_id = 0;
let post_id = 0;

describe("Users", () => {
  it("Create a user with custom user data", (done) => {
    console.log("Create a user with custom user data");

    request
      .post(`users`)
      .set("Authorization", `Bearer ${API_KEY}`)
      .send(user_data)
      .set("Accept", "application/json")
      .end((err, res) => {
        user_id = res.body.data.id;
        expect(res.body.code).to.eql(201);
        done();
      });
  });

  it("Get user details with user ID", (done) => {
    console.log("Get user details with user ID");

    request
      .get(`users/${user_id}`)
      .set("Authorization", `Bearer ${API_KEY}`)
      .end((err, res) => {
        expect(res.body.data.name).to.eql(user_data.name);
        expect(res.body.code).to.eql(200);
        done();
      });
  });

  it("Create a Post", (done) => {
    console.log("Create a Post");

    request
      .post(`users/${user_id}/posts`)
      .set("Authorization", `Bearer ${API_KEY}`)
      .send(post_data)
      .end((err, res) => {
        post_id = res.body.data.id;
        expect(res.body.data.title).to.eql(post_data.title);
        expect(res.body.code).to.eql(201);
        done();
      });
  });

  it("Get saved posts", (done) => {
    console.log("Get saved posts");

    request.get(`users/${user_id}/posts`).end((err, res) => {
      expect(res.body.data[0].title).to.eql(post_data.title);
      expect(res.body.code).to.eql(200);
      done();
    });
  });

  it("Create Comment", (done) => {
    console.log("Create Comment");

    request
      .post(`posts/${post_id}/comments`)
      .set("Authorization", `Bearer ${API_KEY}`)
      .send(comments_data)
      .end((err, res) => {
        expect(res.body.code).to.eql(201);
        done();
      });
  });

  it("Get Comments", (done) => {
    console.log("Get Comments");

    request.get(`posts/${post_id}/comments`).end((err, res) => {
      expect(res.body.data[0].email).to.eql(comments_data.email);
      expect(res.body.code).to.eql(200);
      done();
    });
  });

  it("Delete User", (done) => {
    console.log("Delete User");

    request
      .delete(`users/${user_id}`)
      .set("Authorization", `Bearer ${API_KEY}`)
      .end((err, res) => {
        expect(res.body.code).to.eql(204);
        done();
      });
  });
});
