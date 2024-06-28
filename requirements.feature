Feature: Register User - Frontend

  Scenario: User registration - view registration page
    Given I am a new user on the registration page
    Then I should see the registration which includes username and password fields

  Scenario: User registration - empty form
    Given I am a new user on the registration page
    When I fill in the registration form
    And I submit the registration form with empty fields
    Then I should see an error message

  Scenario: User registration - invalid username
    Given I am a new user on the registration page
    When I fill in the registration form
    And I submit the registration form with an invalid username
    Then I should see an error message

  Scenario: User registration - invalid password
    Given I am a new user on the registration page
    When I fill in the registration form
    And I submit the registration form with an invalid password
    Then I should see an error message

  Scenario: User registration - valid username and password
    Given I am a new user on the registration page
    When I fill in the registration form
    And I submit the registration form with a valid username and password
    Then I should be registered and logged in

Feature: Login - Frontend

  Scenario: User login - view login page
    Given I am a registered user on the login page
    Then I should see the login form

  Scenario: User login - empty form
    Given I am a registered user on the login page
    When I fill in the login form
    And I submit the login form with empty fields
    Then I should see an error message

  Scenario: User login - invalid username
    Given I am a registered user on the login page
    When I fill in the login form
    And I submit the login form with an invalid username
    Then I should see an error message

  Scenario: User login - invalid password
    Given I am a registered user on the login page
    When I fill in the login form
    And I submit the login form with an invalid password
    Then I should see an error message

  Scenario: User login - valid username and password
    Given I am a registered user on the login page
    When I fill in the login form
    And I submit the login form with a valid username and password
    Then I should be logged in

Feature: "App" Page - Frontend
  Scenario: User visits the "App" page
    Given I am a logged in user
    When I visit the "App" page
    Then I should see a search bar
    And I should see a logout button
    And I should see the most recent posts in all topics in most recent order
    And Each post should include the title, author, topic, timestamp, and aggregated vote score

  Scenario: User clicks on a post
    Given I am a logged in user
    When I click on a post
    Then I should be redirected to the page for that post

  Scenario: User clicks on the topic of a post
    Given I am a logged in user
    When I click on the topic of a post
    Then I should be redirected to the page for that topic

  Scenario: User searches for a topic
    Given I am a logged in user
    When I search for a topic
    Then I should see a list of topics that match my search query
    And when I click on a topic, I should be redirected to the page for that topic

  Scenario: User sorts posts
    Given I am a logged in user
    When I click the "Sort by Upvotes" button
    Then I should see the posts sorted by upvotes in descending order
    And Each post should include the title, author, topic, timestamp, and aggregated vote score

    Given I am a logged in user
    When I click the "Sort by Date" button
    Then I should see the posts sorted by date in descending order
    And Each post should include the title, author, topic, timestamp, and aggregated vote score

  Scenario: User upvotes a post
    Given I am a logged in user
    When I click the upvote button on a post
    Then the post's upvote count should increase by 1
    And the post's aggregated vote score should increase by 1
    And my upvote should be saved against my user account

  Scenario: User downvotes a post
    Given I am a logged in user
    When I click the downvote button on a post
    Then the post's downvote count should increase by 1
    And the post's aggregated vote score should decrease by 1
    And my downvote should be saved against my user account

  Scenario: User logs out
    Given I am a logged in user
    When I click the logout button
    Then I should be logged out and redirected to the home page

Feature: "App Page" API Endpoints:
  # These scenarios are for the backend API endpoints that the frontend will use to fetch data - we are not paginating the results here,
  # but we could add that as a future feature
  Scenario: GET /api/posts
    Given I am a logged in user
    When I make a GET request to /api/posts
    Then I should receive a list of the 50 most recent posts in all topics in most recent order
    And Each post should include the id, title, author, topic, timestamp, and aggregated vote score

  Scenario: GET /api/topics
    Given I am a logged in user
    When I make a GET request to /api/topics
    Then I should receive a list of all topics
    And Each topic should include the id, title, and description

  Scenario: GET /api/topics/:id
    Given I am a logged in user
    When I make a GET request to /api/topics/:id
    Then I should receive the topic with the specified id
    And the topic should include the id, title, and description

  Scenario: GET /api/topics/:id/posts
    Given I am a logged in user
    When I make a GET request to /api/topics/:id/posts
    Then I should receive a list of the most recent posts in the specified topic in most recent order

  Scenario: POST /api/topics/:id/posts
    Given I am a logged in user
    When I make a POST request to /api/posts
    Then I should be able to create a new post
    And the post should include the title, authorId, topicId, and text content

  Scenario: POST /api/search
    Given I am a logged in user
    When I make a POST request to /api/search with a search query
    Then I should receive a list of posts that match the search query
    And Each post should include the id, title, author, topic, timestamp, and aggregated vote score

Feature: Topic Page Frontend
  Scenario: User visits the topic page
    Given I am a logged in user
    When I visit the topic page
    Then I should see the title and description of the topic
    And I should see a list of the most recent posts in the topic in most recent order
    And Each post should include the title, author, topic, timestamp, and aggregated vote score

  Scenario: User sorts posts
    Given I am a logged in user
    When I click the "Sort by Upvotes" button
    Then I should see the posts sorted by upvotes in descending order
    And Each post should include the title, author, topic, timestamp, and aggregated vote score

    Given I am a logged in user
    When I click the "Sort by Date" button
    Then I should see the posts sorted by date in descending order
    And Each post should include the title, author, topic, timestamp, and aggregated vote score 

  Scenario: User clicks on a post
    Given I am a logged in user
    When I click on a post
    Then I should be redirected to the page for that post

  Scenario: User upvotes a post
    Given I am a logged in user
    When I click the upvote button on a post
    Then the post's upvote count should increase by 1
    And the post's aggregated vote score should increase by 1
    And my upvote should be saved against my user account
  
  Scenario: User downvotes a post
    Given I am a logged in user
    When I click the downvote button on a post
    Then the post's downvote count should increase by 1
    And the post's aggregated vote score should decrease by 1
    And my downvote should be saved against my user account

  Scenario: User creates a new post
    Given I am a logged in user
    When I click the "New Post" button
    And I fill in the new post form
    And I submit the new post form
    Then I should see the new post on the topic page
    And the post should include the title, author, topic, timestamp, and aggregated vote score
  
  Scenario: User logs out
    Given I am a logged in user
    When I click the logout button
    Then I should be logged out and redirected to the home page

Feature: Topic Page API Endpoints

  Scenario: GET /api/topics/:id
    Given I am a logged in user
    When I make a GET request to /api/topics/:id
    Then I should receive the topic with the specified id
    And the topic should include the id, title, and description

  Scenario: GET /api/topics/:id/posts
    Given I am a logged in user
    When I make a GET request to /api/topics/:id/posts
    Then I should receive a list of the most recent posts in the specified topic in most recent order
    And Each post should include the id, title, author, topic, timestamp, and aggregated vote score

  Scenario: POST /api/topics/:id/posts
    Given I am a logged in user
    When I make a POST request to /api/topics/:id/posts
    Then I should be able to create a new post in the specified topic
    And the post should include the title, authorId, topicId, and text content

  Scenario: POST /api/topics/:id/posts
    Given I am a logged in user
    When I make a POST request to /api/topics/:id/posts
    And I have not provided a title
    Then I should receive an error message

  Scenario: POST /api/topics/:id/posts
    Given I am a logged in user
    When I make a POST request to /api/topics/:id/posts
    And I have not provided text content
    Then I should receive an error message

  Scenario: POST /api/topics/:id/posts
    Given I am a logged in user
    When I make a POST request to /api/topics/:id/posts
    And I have not provided a topicId
    Then I should receive an error message

  Scenario: POST /api/topics/:id/posts
    Given I am a logged in user
    When I make a POST request to /api/topics/:id/posts
    And the topicId does not exist
    Then I should receive an error message

  Scenario: POST /api/topics/:id/posts
    Given I am a logged in user
    When I make a POST request to /api/topics/:id/posts
    And I am not logged in
    Then I should receive an error message

Feature: Post Page Frontend

  Scenario: User visits the post page
    Given I am a logged in user
    When I visit the post page
    Then I should see the title, author, topic, timestamp, text content, and aggregated vote score of the post
    And I should see a list of the most recent comments on the post in most recent order
    And Each comment should include the author, timestamp, and text content
  
  Scenario: User Sorts Comments
    Given I am a logged in user
    When I click the "Sort by Upvotes" button
    Then I should see the comments sorted by upvotes in descending order
    And Each comment should include the author, timestamp, and text content

    Given I am a logged in user
    When I click the "Sort by Date" button
    Then I should see the comments sorted by date in descending order
    And Each comment should include the author, timestamp, and text content

  Scenario: User upvotes a post
    Given I am a logged in user
    When I click the upvote button on a post
    Then the post's upvote count should increase by 1
    And the post's aggregated vote score should increase by 1
    And my upvote should be saved against my user account

  Scenario: User downvotes a post
    Given I am a logged in user
    When I click the downvote button on a post
    Then the post's downvote count should increase by 1
    And the post's aggregated vote score should decrease by 1
    And my downvote should be saved against my user account

  Scenario: User creates a new comment
    Given I am a logged in user
    When I fill in the new comment form
    And I submit the new comment form
    Then I should see the new comment on the post page
    And the comment should include the author, timestamp, and text content
  
  Scenario: User replies to a comment
    Given I am a logged in user
    When I click the "Reply" button on a comment
    And I fill in the reply form
    And I submit the reply form
    Then I should see the reply on the post page
    And the reply should include the author, timestamp, and text content
    And the reply should be nested under the parent comment

  Scenario: User upvotes a comment
    Given I am a logged in user
    When I click the upvote button on a comment
    Then the comment's upvote count should increase by 1
    And the comment's aggregated vote score should increase by 1
    And my upvote should be saved against my user account

  Scenario: User downvotes a comment
    Given I am a logged in user
    When I click the downvote button on a comment
    Then the comment's downvote count should increase by 1
    And the comment's aggregated vote score should decrease by 1
    And my downvote should be saved against my user account

  Scenario: User logs out
    Given I am a logged in user
    When I click the logout button
    Then I should be logged out and redirected to the home page

Feature: Post Page API Endpoints

  Scenario: GET /api/posts/:id
    Given I am a logged in user
    When I make a GET request to /api/posts/:id
    Then I should receive the post with the specified id
    And the post should include the id, title, author, topic, timestamp, text content, and aggregated vote score
    And the post should include whether the current user has upvoted or downvoted the post

  Scenario: GET /api/posts/:id/comments
    Given I am a logged in user
    When I make a GET request to /api/posts/:id/comments
    Then I should receive a list of the most recent comments on the specified post in most recent order
    And Each comment should include the id, author, timestamp, and text content
    And The comments should be in a nested structure, with replies to comments included in the comment object
    And the comment should include whether the current user has upvoted or downvoted the comment

  Scenario: POST /api/posts/:id/comments
    Given I am a logged in user
    When I make a POST request to /api/posts/:id/comments
    Then I should be able to create a new comment on the specified post
    And the comment should include the authorId, postId, and text content
    And the commendId of the parent comment should be included if it is a reply to another comment

  Scenario: POST /api/posts/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/posts/:id/vote with a vote value of 1
    Then the post's upvote count should increase by 1
    And the post's aggregated vote score should increase by 1
    And my upvote should be saved against my user account

  Scenario: POST /api/posts/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/posts/:id/vote with a vote value of -1
    Then the post's downvote count should increase by 1
    And the post's aggregated vote score should decrease by 1
    And my downvote should be saved against my user account

  Scenario: POST /api/posts/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/posts/:id/vote with a vote value of 0
    And I have previously upvoted the post
    Then the post's upvote count should decrease by 1
    And the post's aggregated vote score should decrease by 1
    And my upvote should be removed from my user account

  Scenario: POST /api/posts/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/posts/:id/vote with a vote value of 0
    And I have previously downvoted the post
    Then the post's downvote count should decrease by 1
    And the post's aggregated vote score should increase by 1
    And my downvote should be removed from my user account

  Scenario: POST /api/posts/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/posts/:id/vote with a vote value of 2
    Then I should receive an error message

  Scenario: POST /api/comments/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/comments/:id/vote with a vote value of 1
    Then the comment's upvote count should increase by 1
    And the comment's aggregated vote score should increase by 1
    And my upvote should be saved against my user account

  Scenario: POST /api/comments/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/comments/:id/vote with a vote value of -1
    Then the comment's downvote count should increase by 1
    And the comment's aggregated vote score should decrease by 1
    And my downvote should be saved against my user account

  Scenario: POST /api/comments/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/comments/:id/vote with a vote value of 0
    And I have previously upvoted the comment
    Then the comment's upvote count should decrease by 1
    And the comment's aggregated vote score should decrease by 1
    And my upvote should be removed from my user account

  Scenario: POST /api/comments/:id/vote
    Given I am a logged in user
    When I make a POST request to /api/comments/:id/vote with a vote value of 0
    And I have previously downvoted the comment
    Then the comment's downvote count should decrease by 1
    And the comment's aggregated vote score should increase by 1
    And my downvote should be removed from my user account