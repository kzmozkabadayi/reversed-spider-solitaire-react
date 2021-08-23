/*
-I wanted to write a test that I did not run in this way because there were various problems while installing cypress in the project.
*/
    <references types = "cypress"/>

    const SOLITAIRE_HOMEPAGE_URL = 'http://localhost:3000/';
    const SOLITAIRE_GAMERULES_URL = 'http://localhost:3000/game-rules';
    const SOLITAIRE_GAME_URL = 'http://localhost:3000/one-suite';


    describe('homepage-tests', () =>{

        beforeEach(() =>{
            cy.visit(SOLITAIRE_HOMEPAGE_URL);
        })

        it('should open solitaire homepage',() =>{

            const currentUrl = cy.Url();

            currentUrl.should('equal', SOLITAIRE_HOMEPAGE_URL);
        });

        it('should have title on solitaire homepage',() =>{

            const title = cy.title();
            title.should('not.be.empty');
            title.should('equal',"Reversed Solitaire")
            .and('have.lenght.greaterThan',5);
        });

        it('should have "Time to play game" text in card on homepage',()=>{

            cy.get('.card-header').contains('Time to play game');

        });

        it('should click the lets play button ',() =>{
            cy.get('.letsplay-button').should('exist')
            cy.get('.letsplay-button').click();
             
        });

        it('should have some messages for users in second card on homepage',() =>{
            cy.get('.card-body').contains('If you want to learn how to play game, you can visit the game rules section.');
        });

        it('should click the game rule button',() =>{
            cy.get('.gamerules-button').should('exist');
            cy.get('.gamerules-button').click();
        });


    })

    describe('gamerules page tests',()=>{

        beforeEach(() =>{
            cy.visit(SOLITAIRE_GAMERULES_URL);
        })

        it('should have "GAME RULES" header on gamerules page',()=>{

            cy.get('.game-rules-header').contains('Game Rules');

        });

        it('should have some messages for game features on gamerules page',() =>{

            cy.get('.rules-information').contains('The cards must always be arranged in order A, 2, 3, 4, 5, 6, 7, 8 ,9 , 10, J, Q, K.');

        });

    })

    describe('game page tests',() =>{

        beforeEach(() =>{
            cy.visit(SOLITAIRE_GAME_URL);
        })

        it('should click the home button for back to homepage',() =>{

            cy.get('.home-button').click();
        });

        it('should click the restart game button for reload the game',() =>{

            cy.get('.restart-button').click();
        });
        
    })














