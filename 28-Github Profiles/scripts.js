const API_URL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser (username) {
	try {
		const { data } = await axios(API_URL + username)

		createUserCard(data)
		getRepos(username)
	} catch (e) {
		if (e.response.status === 404) {
			createErrorCard('No profile with this username')
		}
	}

}

async function getRepos (username) {
	try {
		const { data } = await axios(API_URL + username + '/repos?sort=created')
		addReposToCard(data)
	} catch (e) {
		createErrorCard('Problem fetching repos')
	}
}

function createUserCard (user) {
	const cardHTML = `
		<div class="card">
			<div>
				<img class="avatar" src="${user.avatar_url}" alt=${user.name}">
			</div>
			<div class="user-info">
				<h2>${user.name || ''}</h2>
				<p>${user.bio || ''}</p>
				
				<ul>
					<li>${user.followers} <strong>Followers</strong></li>
					<li>${user.following} <strong>Following</strong></li>
					<li>${user.public_repos} <strong>Repos</strong></li>
				</ul>
				
				<div id="repos"></div>
			</div>
		</div>
	`

	main.innerHTML = cardHTML
}

function createErrorCard (msg) {
	const cardHTML = `
		<div class="card">
			<h1>${msg}</h1>
		</div>
	`
	main.innerHTML = cardHTML
}

function addReposToCard (repos) {
	const reposEl = document.getElementById('repos')

	repos.slice(0, 5).forEach(repo => {
		const repoEL = document.createElement('a')
		repoEL.classList.add('repo')
		repoEL.href = repo.html_url
		repoEL.target = '_blank'
		repoEL.innerText = repo.name

		reposEl.appendChild(repoEL)
	})
}

form.addEventListener('submit', e => {
	e.preventDefault()

	const user = search.value
	if (user) {
		getUser(user)

		search.value = ''
	}
})
