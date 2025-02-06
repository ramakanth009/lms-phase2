class BlogManager {
    constructor() {
        this.posts = [];
        this.initialize();
        this.setupClubEventListeners();
    }

    initialize() {
        this.loadPosts();
        this.setupEventListeners();
    }

    loadPosts() {
        const initialPosts = [
            {
                id: 1,
                author: "College Principal",
                avatar: "CP",
                content: "Proud to announce that our college has been ranked among the top 50 institutions in the country! 🏆",
                timestamp: "1 hour ago",
                likes: 156,
                comments: 23,
                image: "assets/images/proud.png"
            },
            {
                id: 2,
                author: "Examination Department",
                avatar: "ED",
                content: "Mid-semester examination schedule has been published. Students can check their respective time tables on the college portal.",
                timestamp: "3 hours ago",
                likes: 89,
                comments: 45,
                image: "assets/images/exam-schedule.png"
            },
            {
                id: 3,
                author: "Placement Cell",
                avatar: "PC",
                content: "🎉 Campus Placement Drive 2024! Major tech companies visiting next month.",
                timestamp: "5 hours ago",
                likes: 245,
                comments: 67,
                image: "assets/images/placement-stats.png"
            },
            {
                id: 4,
                author: "Sports Department",
                avatar: "SD",
                content: "Inter-college Sports Meet 2024 registrations are now open! Events include Cricket, Football, Basketball, and Athletics. Last date to register: March 10th, 2024",
                timestamp: "8 hours ago",
                likes: 122,
                comments: 18,
                image: null
            },
            {
                id: 5,
                author: "Library Department",
                avatar: "LD",
                content: "New arrivals in the library! We've added 500+ new books across various disciplines. Also introducing extended library hours during examination period.",
                timestamp: "12 hours ago",
                likes: 67,
                comments: 12,
                image: null
            },
            {
                id: 6,
                author: "College Admin",
                avatar: "CA",
                content: "📢 Important Notice: In view of the upcoming festivities, the college will remain closed from March 25th to March 27th, 2024. Classes will resume on March 28th.",
                timestamp: "1 day ago",
                likes: 198,
                comments: 34,
                image: null
            },
            {
                id: 7,
                author: "Research Department",
                avatar: "RD",
                content: "Congratulations to Dr. Sarah Miller and her team for securing a $500,000 research grant! This will boost our ongoing research in AI and Machine Learning.",
                timestamp: "1 day ago",
                likes: 145,
                comments: 28,
                image: null
            },
            {
                id: 8,
                author: "Cultural Committee",
                avatar: "CC",
                content: "🎭 Annual Cultural Fest 'Rhythms 2024' is coming! Theme: 'Digital Renaissance'. Mark your calendars for April 15-17, 2024. Guest performances by renowned artists!",
                timestamp: "2 days ago",
                likes: 334,
                comments: 89,
                image: null
            }
        ];

        this.posts = initialPosts;
        this.renderPosts();
    }

    setupEventListeners() {
        document.getElementById('imageUpload').addEventListener('change', this.handleImageUpload.bind(this));
        document.getElementById('fileUpload').addEventListener('change', this.handleFileUpload.bind(this));
    }

    renderPosts() {
        const container = document.querySelector('.posts-container');
        container.innerHTML = this.posts.map(post => this.createPostHTML(post)).join('');
        
        // Add event listeners to post actions
        this.addPostEventListeners();
    }

    createPostHTML(post) {
        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="user-avatar">${post.avatar}</div>
                    <div class="post-author-info">
                        <h6 class="post-author-name">${post.author}</h6>
                        <span class="post-timestamp">${post.timestamp}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.image ? `
                        <div class="post-image-container">
                            <img src="${post.image}" class="post-image" alt="Post image"
                                 onclick="openImageViewer('${post.image}')"
                                 loading="lazy">
                        </div>
                    ` : ''}
                </div>
                <div class="post-actions">
                    <button class="post-action-btn like-btn">
                        <i class="far fa-heart"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button class="post-action-btn comment-btn">
                        <i class="far fa-comment"></i>
                        <span>${post.comments}</span>
                    </button>
                    <button class="post-action-btn share-btn">
                        <i class="far fa-share-square"></i>
                        <span>Share</span>
                    </button>
                </div>
            </div>
        `;
    }

    addPostEventListeners() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLike(e));
        });

        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleComment(e));
        });

        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleShare(e));
        });
    }

    handleLike(e) {
        const postElement = e.currentTarget.closest('.post-card');
        const postId = parseInt(postElement.dataset.postId);
        const post = this.posts.find(p => p.id === postId);
        
        if (post) {
            post.likes++;
            e.currentTarget.querySelector('span').textContent = post.likes;
            e.currentTarget.querySelector('i').classList.replace('far', 'fas');
        }
    }

    handleComment(e) {
        const postElement = e.currentTarget.closest('.post-card');
        // Implement comment functionality
    }

    handleShare(e) {
        const postElement = e.currentTarget.closest('.post-card');
        // Implement share functionality
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            // Handle image upload
            console.log('Image selected:', file.name);
        }
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            // Handle file upload
            console.log('File selected:', file.name);
        }
    }

    openImageViewer(imageSrc) {
        const viewer = document.createElement('div');
        viewer.className = 'image-viewer';
        viewer.innerHTML = `
            <div class="image-viewer-content">
                <img src="${imageSrc}" alt="Full size image">
                <button class="close-viewer">&times;</button>
            </div>
        `;
        document.body.appendChild(viewer);
        viewer.onclick = (e) => {
            if (e.target.className === 'image-viewer' || e.target.className === 'close-viewer') {
                viewer.remove();
            }
        };
    }

    setupClubEventListeners() {
        document.querySelectorAll('.join-club-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleClubJoin(e));
        });
    }

    handleClubJoin(e) {
        const btn = e.currentTarget;
        const isJoined = btn.classList.contains('btn-primary');
        
        if (isJoined) {
            btn.classList.replace('btn-primary', 'btn-outline-primary');
            btn.textContent = 'Join';
        } else {
            btn.classList.replace('btn-outline-primary', 'btn-primary');
            btn.textContent = 'Joined';
        }
    }
}

// Initialize blog when the section is loaded
function initializeBlog() {
    const blogManager = new BlogManager();
}
