document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const leftSidebar = document.querySelector(".left-sidebar");
  const stories = document.querySelectorAll(".story");
  const likeButtons = document.querySelectorAll(".fa-heart");
  const bookmarkButtons = document.querySelectorAll(".fa-bookmark");
  const followButtons = document.querySelectorAll(".follow");
  const postOptions = document.querySelectorAll(".post-options");
  const commentInputs = document.querySelectorAll(".comment-input");
  const commentButtons = document.querySelectorAll(".comment-btn");
  const createPostBtn = document.querySelector(".create-post-btn");
  const postModal = document.querySelector(".post-modal");
  const closeModal = document.querySelector(".close-modal");
  const themeToggle = document.querySelector(".theme-toggle");

  // Mobile Menu Toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      leftSidebar.classList.toggle("active");
    });
  }

  // Story Click Effect
  stories.forEach((story) => {
    story.addEventListener("click", () => {
      story.querySelector(".story-avatar").classList.add("viewed");
    });
  });

  // Like Button Functionality
  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const post = this.closest(".post");
      const likesCount = post.querySelector(".post-likes span");

      if (this.classList.contains("far")) {
        this.classList.remove("far");
        this.classList.add("fas", "liked");
        // Increment like count
        const currentLikes = parseInt(likesCount.textContent.replace(/,/g, ""));
        likesCount.textContent = (currentLikes + 1).toLocaleString() + " likes";
      } else {
        this.classList.remove("fas", "liked");
        this.classList.add("far");
        // Decrement like count
        const currentLikes = parseInt(likesCount.textContent.replace(/,/g, ""));
        likesCount.textContent = (currentLikes - 1).toLocaleString() + " likes";
      }
    });
  });

  // Bookmark Button Functionality
  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("far");
      this.classList.toggle("fas");
    });
  });

  // Follow Button Functionality
  followButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.textContent === "Follow") {
        this.textContent = "Following";
        this.style.color = "#a8a8a8";
      } else {
        this.textContent = "Follow";
        this.style.color = "#0095f6";
      }
    });
  });

  // Post Options Menu
  postOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      const menu = this.querySelector(".post-options-menu");
      menu.classList.toggle("active");
    });
  });

  // Close options menu when clicking elsewhere
  document.addEventListener("click", () => {
    document.querySelectorAll(".post-options-menu").forEach((menu) => {
      menu.classList.remove("active");
    });
  });

  // Comment Functionality
  commentButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const input = commentInputs[index];
      const commentSection = input.closest(".post").querySelector(".comments");

      if (input.value.trim() !== "") {
        const newComment = document.createElement("div");
        newComment.classList.add("comment");
        newComment.innerHTML = `
                    <strong>your_username</strong> ${input.value}
                `;
        commentSection.appendChild(newComment);
        input.value = "";
      }
    });
  });

  // Allow pressing Enter to post comment
  commentInputs.forEach((input, index) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        commentButtons[index].click();
      }
    });
  });

  // Create Post Modal
  if (createPostBtn) {
    createPostBtn.addEventListener("click", () => {
      postModal.style.display = "flex";
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      postModal.style.display = "none";
    });
  }

  // Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const icon = themeToggle.querySelector("i");
      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    });

    // Check for saved theme preference
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
      const icon = themeToggle.querySelector("i");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === postModal) {
      postModal.style.display = "none";
    }
  });
});
// Add this to your existing script.js, inside the DOMContentLoaded event listener

// Search Functionality
const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");

// Sample user data (in a real app, this would come from an API)
const users = [
  { username: "user1", name: "User One", image: "assets/images/user1.jpg" },
  { username: "user2", name: "User Two", image: "assets/images/user2.jpg" },
  { username: "user3", name: "User Three", image: "assets/images/user3.jpg" },
  { username: "user4", name: "User Four", image: "assets/images/user4.jpg" },
  { username: "user5", name: "User Five", image: "assets/images/user5.jpg" },
  {
    username: "webdev",
    name: "Web Developer",
    image: "assets/images/user6.jpg",
  },
  {
    username: "coder",
    name: "Professional Coder",
    image: "assets/images/user1.jpg",
  },
  {
    username: "designer",
    name: "UI/UX Designer",
    image: "assets/images/user2.jpg",
  },
];

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    searchResults.innerHTML = "";

    if (searchTerm.length > 0) {
      const filteredUsers = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm) ||
          user.name.toLowerCase().includes(searchTerm)
      );

      if (filteredUsers.length > 0) {
        filteredUsers.forEach((user) => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("search-result-item");
          resultItem.innerHTML = `
                        <img src="${user.image}" alt="${user.username}">
                        <div>
                            <span>${user.username}</span>
                            <div style="color: #a8a8a8; font-size: 12px;">${user.name}</div>
                        </div>
                    `;
          resultItem.addEventListener("click", () => {
            alert(`You clicked on ${user.username}'s profile`);
            searchInput.value = "";
            searchResults.style.display = "none";
          });
          searchResults.appendChild(resultItem);
        });
        searchResults.style.display = "block";
      } else {
        searchResults.innerHTML =
          '<div style="padding: 10px; color: #a8a8a8;">No results found</div>';
        searchResults.style.display = "block";
      }
    } else {
      searchResults.style.display = "none";
    }
  });

  // Close search results when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-container")) {
      searchResults.style.display = "none";
    }
  });
}

// Add this to your existing mobile nav event listeners
const mobileSearchIcon = document.querySelector(".mobile-nav .fa-search");
if (mobileSearchIcon) {
  mobileSearchIcon.addEventListener("click", function () {
    searchInput.focus();
  });
}
