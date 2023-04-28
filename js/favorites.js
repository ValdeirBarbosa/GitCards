import { GithubUser } from "./githubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }
  load() {
    this.entries = JSON.parse(localStorage.getItem('@gitfav:')) || []    
}
  save() {
    localStorage.setItem('@gitfav:', JSON.stringify(this.entries))
  }
  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login.toLowerCase() === username.toLowerCase())

      if (userExists) {
        throw new Error(`Usuário ${username} já cadastrado!`)
      }
      const user = await GithubUser.search(username)
      if (user.login === undefined) {
        throw new Error(`Usuario ${username} não encontrado!`)
      }
      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }

  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry =>
      entry.login !== user.login)
    this.entries = filteredEntries
    this.update()
    this.save()
  }

}
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onadd()
  }
  onadd() {
    const addButton = document.querySelector('header .search button')
    addButton.onclick = () => {
      const { value } = document.querySelector('header .search input')
      this.add(value)
    }

  }
  update() {
    this.removeAllTr()
    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector('.card-body  img').src = `https://github.com/${user.login}.png`
      // row.querySelector('.card-title a').href = `https://github.com/${user.login}`
      // row.querySelector('.user img').alt = `Imagem do perfil do ${user.name}`
      row.querySelector('.card-title h3').textContent = user.name=== null?user.login:user.name
      row.querySelector('.card-title h4 a').textContent = `${user.login}`
      row.querySelector('.git-profile span a ').textContent = `${user.login}`
      row.querySelector('.git-profile span a ').href = `https://github.com/${user.login}`
      row.querySelector('.card-body p').textContent = `${user.bio !== null ? user.bio : "₢"}`
      row.querySelector('.repo span').textContent = user.public_repos
      row.querySelector('.followers span').textContent = user.followers
      row.querySelector('.card-title svg').onclick = () => {
        const profileToRemove = user.name === null ? user.login : user.name
        const isOk = confirm(`Deseja remover ${profileToRemove} da lista de favoritos?`)
        if (isOk) {
          this.delete(user)
        }
      }
      this.root.append(row)
    })
    this.updateFavs()

  }
updateFavs(){
  if (this.entries.length == 0) {
    document.querySelector('.no-fav').classList.remove('hide')
  }else{
    document.querySelector('.no-fav').classList.add('hide')

  }
}


  removeAllTr() {

    // this.tbody.querySelectorAll('tr').forEach((tr) => {

    this.root.querySelectorAll('.card').forEach((card) => {
      card.remove()

    })
  

  }

  createRow() {
    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `<div class="card-title">
          <h3>Mayk Brito</h3>
          <svg
            style="color: red"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              fill="red"
            ></path>
          </svg>
          <h4>
            <a href="http://github.com/maykbrito" target="_blank">maykbrito</a>
          </h4>
        </div>
        <div class="card-body">
          <img src="http://www.github.com/maykbrito.png" alt="Mayk Brito" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
            rem neque magni enim voluptate beatae aperiam ab eaque est quaerat
            dolore, nostrum sed! Repellat repudiandae perferendis nostrum natus,
            possimus ullam.
          </p>
        </div>
        <div class="card-footer">
          <div class="git-profile">
            <svg
              height="32"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="32"
              data-view-component="true"
            >
              <path
                d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
              ></path>
            </svg>
             <span> <a href="http://github.com/maykbrito" target="_blank">maykbrito</a></span>
          </div>
          <div class="repo">
            <svg height="32" viewBox="0 0 16 16" version="1.1" width="32">
              <path
                d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
              ></path>
            </svg>
            <span>99</span>
          </div>
          <div class="followers">
            <svg height="32" viewBox="0 0 16 16" version="1.1" width="32">
              <path
                d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"
              ></path>
            </svg>
            <span>90</span>
          </div>
      </div>`
    // return tr
    return card
  }

}

