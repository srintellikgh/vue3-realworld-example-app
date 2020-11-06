describe('test for register', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('POST', /users/, { fixture: 'register.json' }).as('register')
    cy.route2('GET', /articles\?tag=butt/, { fixture: 'article_of_tag' }).as('article_of_tag')
    cy.route2('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.route2('GET', /articles\//, { fixture: 'article.json' }).as('getArticle')
    cy.route2('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

    cy.visit('/')
  })

  it('ligin in home page', () => {
    // click logup button in home page
    cy.fixture('users.json').then(users => {
      cy.register(users.registered)
      cy.get('.navbar')
        .should('contain', 'plumrx')
    })
  })
})
