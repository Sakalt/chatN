// scripts.js

// プロフィール更新
document.getElementById('update-profile-button').addEventListener('click', function() {
    const username = document.getElementById('profile-username').value;
    const email = document.getElementById('profile-email').value;
    const bio = document.getElementById('profile-bio').value;
    const image = document.getElementById('profile-image').files[0];

    // サーバーにプロフィール情報を送信
    fetch('/api/updateProfile', {
        method: 'POST',
        body: JSON.stringify({ username, email, bio, image }),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => console.log(data));
});

// 投稿作成
document.getElementById('post-button').addEventListener('click', function() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').files[0];
    const link = document.getElementById('post-link').value;
    const tags = document.getElementById('post-tags').value.split(',').map(tag => tag.trim());

    if (content || image || link || tags.length > 0) {
        // サーバーに投稿データを送信
        fetch('/api/createPost', {
            method: 'POST',
            body: JSON.stringify({ title, content, image, link, tags }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
          .then(data => {
              const postSection = document.getElementById('feed');
              const newPost = document.createElement('div');
              newPost.innerHTML = `
                  <h3>${title}</h3>
                  <p>${content}</p>
                  ${image ? `<img src="${URL.createObjectURL(image)}" alt="Post Image">` : ''}
                  ${link ? `<a href="${link}" target="_blank">${link}</a>` : ''}
                  ${tags.length > 0 ? `<p>Tags: ${tags.join(', ')}</p>` : ''}
              `;
              postSection.appendChild(newPost);
          });
    }
});

// 利用規約同意
document.getElementById('accept-terms-button').addEventListener('click', function() {
    const accepted = document.getElementById('accept-terms').checked;

    if (accepted) {
        fetch('/api/acceptTerms', {
            method: 'POST',
            body: JSON.stringify({ accepted: true }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
          .then(data => console.log(data));
    } else {
        alert('You must accept the terms to continue.');
    }
});

// メッセージ返信
document.getElementById('send-reply-button').addEventListener('click', function() {
    const replyContent = document.getElementById('reply-content').value;

    if (replyContent) {
        fetch('/api/sendReply', {
            method: 'POST',
            body: JSON.stringify({ replyContent }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
          .then(data => console.log(data));
    }
});

// 検索機能
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-query').value;

    fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => console.log(data));
});
