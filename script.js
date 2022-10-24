let allUsers = [];
let curUserPosts = [];
const userTableBody = document
  .getElementById('userTable')
  .getElementsByTagName('tbody')[0];
const userPostsTable = document.getElementById('userPostsTable');
const userPostsTableBody = document
  .getElementById('userPostsTable')
  .getElementsByTagName('tbody')[0];
const userPostsPlaceholder = document.getElementById('userPostsPlaceholder');
const postsHeading = document.getElementById('postsHeading');

const getAllUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
      allUsers = [...json];
      allUsers.forEach((user) => {
        let newRow = userTableBody.insertRow(-1);

        newRow.addEventListener('click', () => getUserPosts(user));

        newRow.innerHTML = `<td>${user.username}</td>
        <td>${user.email}</td>`;
      });
    });
};

const getUserPosts = (user) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
    .then((response) => response.json())
    .then((json) => {
      curUserPosts = [...json];
      updateUserPostsSection(curUserPosts, user.username);
    });
};

const updateUserPostsSection = (posts, username) => {
  // Clear the table body when a new user is selected
  userPostsTableBody.innerHTML = '';

  // Hide userPostsPlaceholder text when displaying posts
  userPostsPlaceholder.classList.add('hide');

  // Show userPostsTable
  userPostsTable.classList.add('show');

  //   Update Posts section heading to include username
  postsHeading.innerHTML = `Posts By ${username}`;

  posts.forEach((post) => {
    let newRow = userPostsTableBody.insertRow(-1);
    newRow.innerHTML = `<td>${post.title}</td>
    <td>${post.body}</td>
    `;
  });
};

getAllUsers();
