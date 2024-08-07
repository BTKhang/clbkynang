function fetchLeaders() {
    return fetch('leaders.json')
        .then(response => response.json())
        .catch(error => console.error('Error fetching leaders:', error));
}

function searchLeaders() {
    let filter = document.getElementById('searchBar').value.toUpperCase();
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    let count = 0;

    fetchLeaders().then(leaders => {
        for (let leader of leaders) {
            if (leader.name.toUpperCase().indexOf(filter) > -1) {
                let leaderDiv = document.createElement('div');
                leaderDiv.classList.add('leader');
                leaderDiv.innerHTML = `
                    <a href="leader-detail.html?id=${leader.id}">
                        <img src="${leader.img}" alt="${leader.name}">
                    </a>
                    <div>
                        <h2>${leader.name}</h2>
                        <p>Chức vụ: ${leader.title}</p>
                        <p>Email: ${leader.email}</p>
                        <p>Số điện thoại: ${leader.phone}</p>
                    </div>
                `;
                resultsDiv.appendChild(leaderDiv);
                count++;
            }
        }

        if (count === 0) {
            resultsDiv.innerHTML = '<p>Không tìm thấy kết quả phù hợp.</p>';
        }
    });
}

function getLeaderById(id) {
    return fetchLeaders().then(leaders => {
        return leaders.find(leader => leader.id === id);
    });
}

function displayLeaderDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const leaderId = parseInt(urlParams.get('id'), 10);

    getLeaderById(leaderId).then(leader => {
        if (leader) {
            const leaderDetailDiv = document.getElementById('leaderDetail');
            leaderDetailDiv.innerHTML = `
                <div class="leader">
                    <img src="${leader.img}" alt="${leader.name}">
                    <div>
                        <h2>${leader.name}</h2>
                        <p>Chức vụ: ${leader.title}</p>
                        <p>Email: ${leader.email}</p>
                        <p>Số điện thoại: ${leader.phone}</p>
                        <p>${leader.bio}</p>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('leaderDetail').innerHTML = '<p>Không tìm thấy thông tin lãnh đạo.</p>';
        }
    });
}
